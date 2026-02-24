import { useState, useEffect, useRef } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Comment {
  id: string;
  body: string;
  created_at: string;
  user_id: string;
  profile?: { first_name: string | null; last_name: string | null } | null;
}

interface CommentsSheetProps {
  postId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CommentsSheet = ({ postId, open, onOpenChange }: CommentsSheetProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, []);

  const loadComments = async () => {
    const { data } = await supabase
      .from("post_comments")
      .select("id, body, created_at, user_id")
      .eq("post_id", postId)
      .order("created_at", { ascending: true })
      .limit(100);

    if (data) {
      // Load profile names
      const userIds = [...new Set(data.map((c) => c.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, first_name, last_name")
        .in("id", userIds);

      const profileMap = new Map(profiles?.map((p) => [p.id, p]) ?? []);
      setComments(
        data.map((c) => ({
          ...c,
          profile: profileMap.get(c.user_id) ?? null,
        }))
      );
    }
  };

  useEffect(() => {
    if (open) loadComments();
  }, [open, postId]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [comments]);

  const handleSend = async () => {
    const trimmed = body.trim();
    if (!trimmed || !userId) return;
    if (trimmed.length > 500) {
      toast({ title: "Comment too long", description: "Max 500 characters." });
      return;
    }
    setSending(true);
    const { error } = await supabase.from("post_comments").insert({
      post_id: postId,
      user_id: userId,
      body: trimmed,
    });
    setSending(false);
    if (error) {
      toast({ title: "Error", description: "Could not post comment." });
    } else {
      setBody("");
      loadComments();
    }
  };

  const getDisplayName = (c: Comment) => {
    if (c.profile?.first_name) return `${c.profile.first_name} ${c.profile.last_name ?? ""}`.trim();
    return "Fan";
  };

  const getInitials = (c: Comment) => {
    if (c.profile?.first_name) {
      return `${c.profile.first_name[0]}${c.profile.last_name?.[0] ?? ""}`.toUpperCase();
    }
    return "F";
  };

  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "now";
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    return `${Math.floor(hrs / 24)}d`;
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader className="pb-2">
          <DrawerTitle className="text-[16px]">Comments</DrawerTitle>
        </DrawerHeader>

        <div ref={listRef} className="flex-1 overflow-y-auto px-4 pb-2 space-y-3 min-h-[120px] max-h-[50vh]">
          {comments.length === 0 ? (
            <p className="text-center text-muted-foreground text-[13px] py-8">No comments yet. Be the first!</p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="flex gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[11px] font-bold text-primary shrink-0">
                  {getInitials(c)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[13px] font-semibold text-foreground">{getDisplayName(c)}</span>
                    <span className="text-[11px] text-muted-foreground">{timeAgo(c.created_at)}</span>
                  </div>
                  <p className="text-[13px] text-foreground/80 leading-snug mt-0.5 break-words">{c.body}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-border/40 px-4 py-3 flex items-center gap-2">
          <input
            value={body}
            onChange={(e) => setBody(e.target.value.slice(0, 500))}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Add a comment…"
            className="flex-1 h-11 rounded-full bg-muted/50 px-4 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/40"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!body.trim() || sending}
            className={cn("h-11 w-11 rounded-full", !body.trim() && "opacity-40")}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
