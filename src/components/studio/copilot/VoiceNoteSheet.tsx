import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";

interface VoiceNoteSheetProps {
  open: boolean;
  onClose: () => void;
  onComplete: (transcript: string, suggestedContext: string, keyMoments: string[]) => void;
}

type RecordingState = "idle" | "recording" | "recorded" | "transcribing";

export const VoiceNoteSheet = ({ open, onClose, onComplete }: VoiceNoteSheetProps) => {
  const [state, setState] = useState<RecordingState>("idle");
  const [seconds, setSeconds] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const audioBlobRef = useRef<Blob | null>(null);

  // Reset on open
  useEffect(() => {
    if (open) {
      setState("idle");
      setSeconds(0);
      setTranscript("");
      setError("");
      audioBlobRef.current = null;
    }
  }, [open]);

  // Timer
  useEffect(() => {
    if (state === "recording") {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [state]);

  const startRecording = useCallback(async () => {
    try {
      setError("");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream, { mimeType: "audio/webm" });
      chunksRef.current = [];

      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        audioBlobRef.current = blob;
        stream.getTracks().forEach((t) => t.stop());
        setState("recorded");
      };

      mr.start();
      mediaRecorderRef.current = mr;
      setSeconds(0);
      setState("recording");
    } catch {
      setError("Microphone access is required. Please allow it and try again.");
    }
  }, []);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
  }, []);

  const reRecord = () => {
    audioBlobRef.current = null;
    setTranscript("");
    setState("idle");
    setSeconds(0);
  };

  const transcribeAndUse = async () => {
    setState("transcribing");
    setError("");

    try {
      // Convert blob to base64
      const blob = audioBlobRef.current;
      if (!blob) throw new Error("No recording found");

      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve((reader.result as string).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      // Call edge function to transcribe + extract context
      const { data, error: fnError } = await supabase.functions.invoke("studio-voice-note", {
        body: { audio_base64: base64 },
      });

      if (fnError) throw fnError;

      const t = data?.transcript || "";
      const suggestedContext = data?.suggested_context || "training";
      const keyMoments = data?.key_moments || [];

      setTranscript(t);
      onComplete(t, suggestedContext, keyMoments);
    } catch (err: any) {
      console.error("Transcription error:", err);
      // Fallback: let user type manually
      setTranscript("");
      setError("Couldn't transcribe. You can type your week summary instead.");
      setState("recorded");
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="bottom" className="rounded-t-2xl pb-8 px-5 max-h-[70vh]">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-base">Tell us about your week</SheetTitle>
          <SheetDescription className="text-xs">
            Record a quick voice note — we'll turn it into your weekly pack.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col items-center gap-4">
          {/* Recording circle / timer */}
          <div className="flex flex-col items-center gap-2">
            {state === "recording" && (
              <div className="relative flex items-center justify-center">
                <span className="absolute w-24 h-24 rounded-full bg-primary/20 animate-ping" />
                <span className="relative w-20 h-20 rounded-full bg-primary/30 flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary">{formatTime(seconds)}</span>
                </span>
              </div>
            )}

            {state === "idle" && (
              <span className="w-20 h-20 rounded-full bg-muted/40 border-2 border-dashed border-border flex items-center justify-center text-xs text-muted-foreground">
                {formatTime(0)}
              </span>
            )}

            {state === "recorded" && (
              <span className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-sm font-medium text-primary">
                {formatTime(seconds)}
              </span>
            )}

            {state === "transcribing" && (
              <span className="w-20 h-20 rounded-full bg-muted/40 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </span>
            )}
          </div>

          {error && <p className="text-xs text-destructive text-center">{error}</p>}

          {/* Actions */}
          <div className="flex gap-2 w-full">
            {state === "idle" && (
              <Button className="flex-1 h-12 text-sm" onClick={startRecording}>
                Tap to record
              </Button>
            )}

            {state === "recording" && (
              <Button className="flex-1 h-12 text-sm" variant="destructive" onClick={stopRecording}>
                Stop recording
              </Button>
            )}

            {state === "recorded" && (
              <>
                <Button variant="outline" className="flex-1 h-11 text-sm" onClick={reRecord}>
                  Re-record
                </Button>
                <Button className="flex-1 h-11 text-sm" onClick={transcribeAndUse}>
                  Use this
                </Button>
              </>
            )}

            {state === "transcribing" && (
              <Button className="flex-1 h-11 text-sm" disabled>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Transcribing…
              </Button>
            )}
          </div>

          {state !== "transcribing" && (
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={onClose}>
              Cancel
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
