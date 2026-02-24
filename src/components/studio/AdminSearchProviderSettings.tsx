import { useState } from "react";
import { StudioCard } from "./StudioCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, XCircle, Settings2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const AdminSearchProviderSettings = () => {
  const { toast } = useToast();
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<{
    configured: boolean;
    connection_ok?: boolean;
    has_api_key?: boolean;
    has_cx_id?: boolean;
    error?: string;
  } | null>(null);

  const testConnection = async () => {
    setTesting(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("media-radar-test-connection");
      if (error) throw error;
      setResult(data);
      if (data?.connection_ok) {
        toast({ title: "Connection successful", description: "Google CSE is configured and working." });
      } else if (data?.configured === false) {
        toast({ title: "Not configured", description: data.error || "Missing server secrets.", variant: "destructive" });
      } else {
        toast({ title: "Connection failed", description: data?.error || "Unknown error.", variant: "destructive" });
      }
    } catch (err: any) {
      toast({ title: "Test failed", description: err.message, variant: "destructive" });
    } finally {
      setTesting(false);
    }
  };

  return (
    <StudioCard title="Search Provider Settings" subtitle="Configure Google Custom Search Engine for Media Radar.">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Settings2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Google Custom Search Engine (CSE)</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 rounded bg-muted/30">
            <span className="text-sm">GOOGLE_CSE_API_KEY</span>
            {result ? (
              <Badge variant={result.has_api_key ? "secondary" : "destructive"} className="text-[10px]">
                {result.has_api_key ? "Configured" : "Missing"}
              </Badge>
            ) : (
              <Badge variant="outline" className="text-[10px]">Unknown</Badge>
            )}
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-muted/30">
            <span className="text-sm">GOOGLE_CSE_CX_ID</span>
            {result ? (
              <Badge variant={result.has_cx_id ? "secondary" : "destructive"} className="text-[10px]">
                {result.has_cx_id ? "Configured" : "Missing"}
              </Badge>
            ) : (
              <Badge variant="outline" className="text-[10px]">Unknown</Badge>
            )}
          </div>
        </div>

        {result && (
          <div className={`flex items-center gap-2 p-3 rounded-lg ${result.connection_ok ? "bg-primary/10 border border-primary/20" : "bg-destructive/5 border border-destructive/20"}`}>
            {result.connection_ok ? (
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
            ) : (
              <XCircle className="h-4 w-4 text-destructive shrink-0" />
            )}
            <p className="text-sm">
              {result.connection_ok
                ? "Connection OK — Google CSE is working."
                : result.error || "Connection failed."}
            </p>
          </div>
        )}

        <div className="flex justify-end">
          <Button size="sm" onClick={testConnection} disabled={testing}>
            {testing ? <><Loader2 className="h-4 w-4 animate-spin mr-1" /> Testing...</> : "Test connection"}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          These secrets are managed server-side and are never exposed to athletes. Update them in your backend secrets configuration.
        </p>
      </div>
    </StudioCard>
  );
};
