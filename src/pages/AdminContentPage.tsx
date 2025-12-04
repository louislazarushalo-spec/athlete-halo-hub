import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Shield, Image, Plus, Trash2, Filter, Database, FileImage } from "lucide-react";
import { toast } from "sonner";
import { athletes } from "@/data/athletes";

interface AthleteContent {
  id: string;
  athlete_id: string;
  image_url: string;
  title: string | null;
  content_type: string;
  created_at: string;
  source: "uploaded" | "platform";
}

interface PlatformImage {
  id: string;
  athlete_id: string;
  image_url: string;
  title: string;
  category: string;
}

const AdminContentPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [uploadedContent, setUploadedContent] = useState<AthleteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("platform");
  
  // Form state
  const [newAthleteId, setNewAthleteId] = useState("");
  const [newFiles, setNewFiles] = useState<File[]>([]);

  // Extract all platform images from athletes data
  const platformImages = useMemo(() => {
    const images: PlatformImage[] = [];
    
    athletes.forEach((athlete) => {
      // Avatar
      if (athlete.avatar) {
        images.push({
          id: `${athlete.id}-avatar`,
          athlete_id: athlete.id,
          image_url: athlete.avatar,
          title: "Profile Avatar",
          category: "avatar",
        });
      }
      
      // Banner
      if (athlete.banner) {
        images.push({
          id: `${athlete.id}-banner`,
          athlete_id: athlete.id,
          image_url: athlete.banner,
          title: "Profile Banner",
          category: "banner",
        });
      }
      
      // Products
      athlete.products?.forEach((product, idx) => {
        if (product.image) {
          images.push({
            id: `${athlete.id}-product-${idx}`,
            athlete_id: athlete.id,
            image_url: product.image,
            title: product.name,
            category: "product",
          });
        }
      });
      
      // Gear Collections
      athlete.gearCollections?.forEach((collection, cIdx) => {
        if (collection.actionImage) {
          images.push({
            id: `${athlete.id}-gear-${cIdx}`,
            athlete_id: athlete.id,
            image_url: collection.actionImage,
            title: collection.name,
            category: "gear",
          });
        }
        collection.products?.forEach((product, pIdx) => {
          if (product.image) {
            images.push({
              id: `${athlete.id}-gear-${cIdx}-product-${pIdx}`,
              athlete_id: athlete.id,
              image_url: product.image,
              title: product.name,
              category: "gear-product",
            });
          }
        });
      });
      
      // Training posts
      athlete.training?.forEach((post, idx) => {
        if (post.image) {
          images.push({
            id: `${athlete.id}-training-${idx}`,
            athlete_id: athlete.id,
            image_url: post.image,
            title: post.title,
            category: "training",
          });
        }
      });
      
      // Life posts
      athlete.life?.forEach((post, idx) => {
        if (post.image) {
          images.push({
            id: `${athlete.id}-life-${idx}`,
            athlete_id: athlete.id,
            image_url: post.image,
            title: post.title,
            category: "life",
          });
        }
      });
      
      // Media Feed
      athlete.mediaFeed?.forEach((item, idx) => {
        if (item.image) {
          images.push({
            id: `${athlete.id}-media-${idx}`,
            athlete_id: athlete.id,
            image_url: item.image,
            title: item.title || item.content?.substring(0, 50) || "Media",
            category: "media",
          });
        }
      });
      
      // Cause
      if (athlete.cause?.image) {
        images.push({
          id: `${athlete.id}-cause`,
          athlete_id: athlete.id,
          image_url: athlete.cause.image,
          title: athlete.cause.title,
          category: "cause",
        });
      }
    });
    
    return images;
  }, []);

  // Filter platform images
  const filteredPlatformImages = useMemo(() => {
    if (selectedAthlete === "all") return platformImages;
    return platformImages.filter((img) => img.athlete_id === selectedAthlete);
  }, [platformImages, selectedAthlete]);

  // Filter uploaded content
  const filteredUploadedContent = useMemo(() => {
    if (selectedAthlete === "all") return uploadedContent;
    return uploadedContent.filter((item) => item.athlete_id === selectedAthlete);
  }, [uploadedContent, selectedAthlete]);

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from("athlete_content")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error("Error fetching content:", error);
      toast.error("Failed to fetch content");
    } else {
      setUploadedContent((data || []).map(item => ({ ...item, source: "uploaded" as const })));
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
      fetchContent();
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Failed to upload content");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    try {
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
      fetchContent();
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete content");
    }
  };

  const getAthleteName = (athleteId: string) => {
    const athlete = athletes.find(a => a.id === athleteId);
    return athlete?.name || athleteId;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      avatar: "bg-blue-500/20 text-blue-400",
      banner: "bg-purple-500/20 text-purple-400",
      product: "bg-green-500/20 text-green-400",
      gear: "bg-orange-500/20 text-orange-400",
      "gear-product": "bg-orange-500/20 text-orange-400",
      training: "bg-red-500/20 text-red-400",
      life: "bg-pink-500/20 text-pink-400",
      media: "bg-cyan-500/20 text-cyan-400",
      cause: "bg-yellow-500/20 text-yellow-400",
    };
    return colors[category] || "bg-muted text-muted-foreground";
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
              <p className="text-muted-foreground">View and manage athlete images</p>
            </div>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Upload New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload New Content</DialogTitle>
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

        {/* Filter */}
        <div className="flex items-center gap-2 mb-6">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedAthlete} onValueChange={setSelectedAthlete}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Filter by athlete" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              <SelectItem value="all">All Athletes ({athletes.length})</SelectItem>
              {athletes.map((athlete) => (
                <SelectItem key={athlete.id} value={athlete.id}>
                  {athlete.name} ({athlete.sport})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="platform" className="gap-2">
              <FileImage className="h-4 w-4" />
              Platform Images ({filteredPlatformImages.length})
            </TabsTrigger>
            <TabsTrigger value="uploaded" className="gap-2">
              <Database className="h-4 w-4" />
              Uploaded ({filteredUploadedContent.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="platform">
            <div className="bg-card rounded-xl border border-border p-6">
              <p className="text-sm text-muted-foreground mb-4">
                These images are hardcoded in the platform and used across athlete profiles.
              </p>
              
              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {[...Array(10)].map((_, i) => (
                    <Skeleton key={i} className="aspect-square rounded-lg" />
                  ))}
                </div>
              ) : filteredPlatformImages.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Image className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No images found for this filter.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredPlatformImages.map((img) => (
                    <div key={img.id} className="group relative">
                      <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                        <img 
                          src={img.image_url} 
                          alt={img.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                      </div>
                      <div className="mt-2">
                        <p className="text-xs font-medium truncate">{img.title}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getCategoryColor(img.category)}`}>
                            {img.category}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground truncate">
                            {getAthleteName(img.athlete_id)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="uploaded">
            <div className="bg-card rounded-xl border border-border p-6">
              <p className="text-sm text-muted-foreground mb-4">
                Images uploaded through the content manager and stored in the database.
              </p>
              
              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="aspect-square rounded-lg" />
                  ))}
                </div>
              ) : filteredUploadedContent.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Database className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No uploaded content yet. Click "Upload New" to add images.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredUploadedContent.map((item) => (
                    <div key={item.id} className="group relative">
                      <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                        <img 
                          src={item.image_url} 
                          alt={item.title || "Content"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDelete(item.id, item.image_url)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                      <div className="mt-2">
                        <p className="text-xs font-medium truncate">{item.title || "Untitled"}</p>
                        <p className="text-[10px] text-muted-foreground truncate">
                          {getAthleteName(item.athlete_id)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminContentPage;
