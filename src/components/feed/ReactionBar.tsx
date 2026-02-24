import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { triggerEmojiAnimation } from "./FallingEmojiOverlay";
import { toast } from "@/hooks/use-toast";

const EMOJIS = ["❤️", "🔥", "😂", "😮", "💪"] as const;

interface ReactionBarProps {
  postId: string;
  onCommentClick: () => void;
}

export const ReactionBar = ({ postId, onCommentClick }: ReactionBarProps) => {
  const [activeEmoji, setActiveEmoji] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [pressing, setPressing] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, []);

  // Load existing reaction
  useEffect(() => {
    if (!userId) return;
    supabase
      .from("post_reactions")
      .select("emoji")
      .eq("post_id", postId)
      .eq("user_id", userId)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setActiveEmoji(data.emoji);
      });
  }, [userId, postId]);

  const handleReaction = async (emoji: string) => {
    if (!userId) {
      toast({ title: "Log in to react", description: "Create an account to interact with posts." });
      return;
    }

    triggerEmojiAnimation(emoji);

    if (activeEmoji === emoji) {
      // Remove reaction
      setActiveEmoji(null);
      await supabase.from("post_reactions").delete().eq("post_id", postId).eq("user_id", userId);
    } else {
      setActiveEmoji(emoji);
      await supabase.from("post_reactions").upsert(
        { post_id: postId, user_id: userId, emoji },
        { onConflict: "post_id,user_id" }
      );
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-2.5 border-t border-border/30">
      <div className="flex items-center gap-1.5">
        {EMOJIS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleReaction(emoji)}
            onPointerDown={() => setPressing(emoji)}
            onPointerUp={() => setPressing(null)}
            onPointerLeave={() => setPressing(null)}
            className={cn(
              "w-11 h-11 rounded-full flex items-center justify-center text-lg transition-all duration-150",
              activeEmoji === emoji
                ? "bg-primary/20 scale-110 shadow-[0_0_12px_hsl(var(--primary)/0.4)]"
                : "bg-muted/40 hover:bg-muted/70",
              pressing === emoji && "scale-95"
            )}
            aria-label={`React with ${emoji}`}
          >
            {emoji}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          if (!userId) {
            toast({ title: "Log in to comment", description: "Create an account to join the conversation." });
            return;
          }
          onCommentClick();
        }}
        className="h-11 px-4 rounded-full bg-muted/40 hover:bg-muted/70 flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors"
      >
        <MessageCircle className="h-4 w-4" />
        Comment
      </button>
    </div>
  );
};
