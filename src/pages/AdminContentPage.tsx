import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Shield, Image, Plus, Trash2, Filter } from "lucide-react";
import { toast } from "sonner";
import { athletes } from "@/data/athletes";

interface AthleteContent {
  id: string;
  athlete_id: string;
  image_url: string;
  title: string | null;
  content_type: string;
  created_at: string;
}

const AdminContentPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [content, setContent] = useState<AthleteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Form state
  const [newAthleteId, setNewAthleteId] = useState("");
  const [newFiles, setNewFiles] = useState<File[]>([]);

  const fetchContent = async (athleteFilter?: string) => {
    let query = supabase
      .from("athlete_content")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (athleteFilter && athleteFilter !== "all") {
      query = query.eq("athlete_id", athleteFilter);
    }

    const { data, error } = await query;
    
    if (error) {
      console.error("Error fetching content:", error);
      toast.error("Failed to fetch content");
    } else {
      setContent(data || []);
    }
  };

  useEffect(() => {
    const checkAdminAndFetch = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!roleData) {
        navigate("/home");
        return;
      }

      setIsAdmin(true);
      await fetchContent();
      setLoading(false);
    };

    checkAdminAndFetch();
  }, [user, navigate]);

  const handleFilterChange = (value: string) => {
    setSelectedAthlete(value);
    fetchContent(value);
  };

  const handleUpload = async () => {
    if (newFiles.length === 0 || !newAthleteId) {
      toast.error("Please select an athlete and at least one file");
      return;
    }

    setUploading(true);
    let successCount = 0;
    let failCount = 0;
    
    try {
      for (const file of newFiles) {
        try {
          const fileExt = file.name.split(".").pop();
          const fileName = `${newAthleteId}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from("athlete-content")
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          const { data: urlData } = supabase.storage
            .from("athlete-content")
            .getPublicUrl(fileName);

          const { error: insertError } = await supabase
            .from("athlete_content")
            .insert({
              athlete_id: newAthleteId,
              image_url: urlData.publicUrl,
              title: null,
              content_type: "image",
              created_by: user?.id,
            });

          if (insertError) throw insertError;
          successCount++;
        } catch (err) {
          console.error("Failed to upload:", file.name, err);
          failCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`${successCount} image(s) uploaded successfully${failCount > 0 ? `, ${failCount} failed` : ""}`);
      } else {
        toast.error("All uploads failed");
      }
      
      setDialogOpen(false);
      setNewAthleteId("");
      setNewFiles([]);
      fetchContent(selectedAthlete);
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Failed to upload content");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    try {
      // Extract file path from URL
      const urlParts = imageUrl.split("/athlete-content/");
      if (urlParts[1]) {
        await supabase.storage
          .from("athlete-content")
          .remove([urlParts[1]]);
      }

      const { error } = await supabase
        .from("athlete_content")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Content deleted");
      fetchContent(selectedAthlete);
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete content");
    }
  };

  const getAthleteName = (athleteId: string) => {
    const athlete = athletes.find(a => a.id === athleteId);
    return athlete?.name || athleteId;
  };

  if (!isAdmin && !loading) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Content Manager</h1>
              <p className="text-muted-foreground">Manage athlete images and content</p>
            </div>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Content
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Content</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Athlete</Label>
                  <Select value={newAthleteId} onValueChange={setNewAthleteId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select athlete" />
                    </SelectTrigger>
                    <SelectContent className="max-h-64">
                      {athletes.map((athlete) => (
                        <SelectItem key={athlete.id} value={athlete.id}>
                          {athlete.name} ({athlete.sport})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Images (select multiple)</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setNewFiles(Array.from(e.target.files || []))}
                  />
                  {newFiles.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {newFiles.length} file(s) selected
                    </p>
                  )}
                </div>
                <Button 
                  className="w-full" 
                  onClick={handleUpload}
                  disabled={uploading || newFiles.length === 0 || !newAthleteId}
                >
                  {uploading ? "Uploading..." : `Upload ${newFiles.length || ""} Image${newFiles.length !== 1 ? "s" : ""}`}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Image className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-semibold">Athlete Content ({content.length})</h2>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedAthlete} onValueChange={handleFilterChange}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by athlete" />
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  <SelectItem value="all">All Athletes</SelectItem>
                  {athletes.map((athlete) => (
                    <SelectItem key={athlete.id} value={athlete.id}>
                      {athlete.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : content.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Image className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No content found. Add your first image above.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Preview</TableHead>
                  <TableHead>Athlete</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Added</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {content.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <img 
                        src={item.image_url} 
                        alt={item.title || "Content"} 
                        className="w-16 h-12 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {getAthleteName(item.athlete_id)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.title || "-"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(item.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id, item.image_url)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminContentPage;
