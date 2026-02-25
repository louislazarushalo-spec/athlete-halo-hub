import { useState, useRef, useCallback, useEffect } from "react";
import { StudioCard } from "../StudioCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mic } from "lucide-react";
import { PublishStepper } from "../publish/PublishStepper";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const STEPS = ["Context", "Build", "Save"];

const WEEK_TYPES = [
  { id: "competition", label: "Competition week" },
  { id: "training", label: "Training block" },
  { id: "rest", label: "Rest / off-season" },
  { id: "travel", label: "Travel week" },
  { id: "recovery", label: "Recovery" },
  { id: "mixed", label: "Mixed" },
];

const POST_COUNT_OPTIONS = [3, 5, 7];
const FORMAT_OPTIONS = ["Photo", "Video", "Text", "Audio"];

type RecordingState = "idle" | "recording" | "recorded" | "transcribing";

interface WeeklyPackFlowProps {
  onBack: () => void;
  generating: boolean;
  onGenerate: (context: string, strategyPackData: Record<string, any>) => Promise<void>;
  strategyPackData: Record<string, any>;
  onNavigatePublish: (draft?: { title: string; body: string; type: string }) => void;
}

export const WeeklyPackFlow = ({
  onBack,
  generating,
  onGenerate,
  strategyPackData,
  onNavigatePublish,
}: WeeklyPackFlowProps) => {
  const [step, setStep] = useState(0);
  const [weekType, setWeekType] = useState("training");
  const [postCount, setPostCount] = useState(5);
  const [formats, setFormats] = useState<string[]>(["Photo", "Video", "Text"]);
  const [includeEngagement, setIncludeEngagement] = useState(true);
  const [generatedPosts, setGeneratedPosts] = useState<any[]>([]);

  // Voice note state
  const [recState, setRecState] = useState<RecordingState>("idle");
  const [seconds, setSeconds] = useState(0);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [voiceError, setVoiceError] = useState("");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [keyMoments, setKeyMoments] = useState<string[]>([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const audioBlobRef = useRef<Blob | null>(null);

  // Timer
  useEffect(() => {
    if (recState === "recording") {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [recState]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const startRecording = useCallback(async () => {
    try {
      setVoiceError("");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream, { mimeType: "audio/webm" });
      chunksRef.current = [];
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        audioBlobRef.current = new Blob(chunksRef.current, { type: "audio/webm" });
        stream.getTracks().forEach((t) => t.stop());
        setRecState("recorded");
      };
      mr.start();
      mediaRecorderRef.current = mr;
      setSeconds(0);
      setRecState("recording");
    } catch {
      setVoiceError("Microphone access required.");
    }
  }, []);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
  }, []);

  const reRecord = () => {
    audioBlobRef.current = null;
    setVoiceTranscript("");
    setKeyMoments([]);
    setRecState("idle");
    setSeconds(0);
  };

  const transcribeAndUse = async () => {
    setRecState("transcribing");
    setVoiceError("");
    try {
      const blob = audioBlobRef.current;
      if (!blob) throw new Error("No recording");
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve((reader.result as string).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      const { data, error } = await supabase.functions.invoke("studio-voice-note", {
        body: { audio_base64: base64 },
      });
      if (error) throw error;
      setVoiceTranscript(data?.transcript || "");
      setKeyMoments(data?.key_moments || []);
      if (data?.suggested_context) setWeekType(data.suggested_context);
      setRecState("idle");
    } catch {
      setVoiceError("Couldn't transcribe. Select context manually.");
      setRecState("idle");
    }
  };

  const toggleFormat = (f: string) => {
    setFormats((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));
  };

  const handleGenerate = async () => {
    await onGenerate(weekType, strategyPackData);
    setStep(2);
  };

  return (
    <div className="space-y-3">
      <PublishStepper steps={STEPS} currentStep={step} onBack={onBack} confirmLeave={step > 0} />

      {/* Step 0 — Context (with inline voice recorder) */}
      {step === 0 && (
        <StudioCard title="What kind of week?" subtitle="Record a voice note or select the context for your weekly pack.">
          {/* Voice recorder section */}
          <div className="rounded-xl border border-border/40 bg-background/5 p-3 mb-4">
            <p className="text-[11px] font-medium text-muted-foreground mb-2">Tell us about your week (optional)</p>

            <div className="flex flex-col items-center gap-3">
              {/* Circle indicator */}
              {recState === "recording" ? (
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-16 h-16 rounded-full bg-primary/20 animate-ping" />
                  <span className="relative w-14 h-14 rounded-full bg-primary/30 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">{formatTime(seconds)}</span>
                  </span>
                </div>
              ) : recState === "transcribing" ? (
                <span className="w-14 h-14 rounded-full bg-muted/40 flex items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                </span>
              ) : null}

              {/* Actions */}
              <div className="flex gap-2 w-full">
                {recState === "idle" && !voiceTranscript && (
                  <Button variant="outline" className="flex-1 h-10 text-xs gap-1.5" onClick={startRecording}>
                    <Mic className="h-3.5 w-3.5" /> Tap to record
                  </Button>
                )}
                {recState === "recording" && (
                  <Button variant="destructive" className="flex-1 h-10 text-xs" onClick={stopRecording}>
                    Stop recording
                  </Button>
                )}
                {recState === "recorded" && (
                  <>
                    <Button variant="outline" className="flex-1 h-10 text-xs" onClick={reRecord}>Re-record</Button>
                    <Button className="flex-1 h-10 text-xs" onClick={transcribeAndUse}>Use this</Button>
                  </>
                )}
                {recState === "transcribing" && (
                  <Button className="flex-1 h-10 text-xs" disabled>
                    <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" /> Transcribing…
                  </Button>
                )}
              </div>

              {voiceError && <p className="text-[11px] text-destructive text-center">{voiceError}</p>}
            </div>

            {/* Transcript preview */}
            {voiceTranscript && (
              <Collapsible open={summaryOpen} onOpenChange={setSummaryOpen} className="mt-3">
                <CollapsibleTrigger className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg bg-primary/5 border border-primary/20 text-[11px]">
                  <span className="font-medium text-primary">Your week summary</span>
                  <ChevronDown className={`h-3 w-3 text-primary transition-transform ${summaryOpen ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-2 pt-1.5 pb-1">
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{voiceTranscript}</p>
                  {keyMoments.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {keyMoments.map((m, i) => (
                        <Badge key={i} variant="secondary" className="text-[10px] font-normal">{m}</Badge>
                      ))}
                    </div>
                  )}
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>

          {/* Week type selection */}
          <div className="space-y-2">
            {WEEK_TYPES.map((wt) => (
              <button
                key={wt.id}
                onClick={() => setWeekType(wt.id)}
                className={`w-full text-left p-3 rounded-xl border transition-colors min-h-[44px] text-sm font-medium ${
                  weekType === wt.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/40 hover:border-primary/30"
                }`}
              >
                {wt.label}
              </button>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <Button size="sm" className="h-11 text-sm" onClick={() => setStep(1)}>Next</Button>
          </div>
        </StudioCard>
      )}

      {/* Step 1 — Build */}
      {step === 1 && (
        <StudioCard title="Configure your pack" subtitle="Set preferences for AI-generated post ideas.">
          <div className="space-y-4 mt-1">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">How many posts?</p>
              <div className="flex gap-2">
                {POST_COUNT_OPTIONS.map((n) => (
                  <button
                    key={n}
                    onClick={() => setPostCount(n)}
                    className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors min-h-[44px] ${
                      postCount === n ? "border-primary bg-primary/10 text-primary" : "border-border/40 hover:border-primary/30"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Formats</p>
              <div className="flex flex-wrap gap-2">
                {FORMAT_OPTIONS.map((f) => (
                  <button
                    key={f}
                    onClick={() => toggleFormat(f)}
                    className={`px-3 py-2 rounded-lg border text-xs font-medium transition-colors min-h-[36px] ${
                      formats.includes(f) ? "border-primary bg-primary/10 text-primary" : "border-border/40 hover:border-primary/30 text-muted-foreground"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setIncludeEngagement(!includeEngagement)}
              className={`w-full text-left p-3 rounded-xl border transition-colors min-h-[44px] ${
                includeEngagement ? "border-primary bg-primary/10" : "border-border/40"
              }`}
            >
              <p className="text-sm font-medium">Include an engagement prompt?</p>
              <p className="text-xs text-muted-foreground">{includeEngagement ? "Yes — poll, Q&A, or challenge" : "No"}</p>
            </button>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" size="sm" className="h-11 text-sm" onClick={() => setStep(0)}>Back</Button>
            <Button size="sm" className="h-11 text-sm" onClick={handleGenerate} disabled={generating}>
              {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Generate"}
            </Button>
          </div>
        </StudioCard>
      )}

      {/* Step 2 — Save */}
      {step === 2 && (
        <StudioCard title="Your weekly pack" subtitle="AI-suggested posts for this week. Tap Create to start drafting.">
          {generating ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
              <span className="text-sm text-muted-foreground">Generating ideas…</span>
            </div>
          ) : generatedPosts.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-6">
              Pack generated! Check Copilot for your suggested posts.
            </p>
          ) : (
            <div className="space-y-2 mt-1">
              {generatedPosts.map((item: any, i: number) => (
                <div key={i} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-background/10 border border-border/20">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Badge variant="secondary" className="text-[10px] font-normal px-1.5 py-0 shrink-0">{item.type}</Badge>
                      <span className="text-[13px] md:text-sm font-medium truncate">{item.title}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground line-clamp-1">{item.why}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0 h-8 text-[12px]"
                    onClick={() => onNavigatePublish({ title: item.title, body: item.body_draft || "", type: item.type?.toLowerCase() || "bts" })}
                  >
                    Create
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" size="sm" className="h-11 text-sm" onClick={() => setStep(1)}>Back</Button>
            <Button size="sm" className="h-11 text-sm" onClick={onBack}>Save pack</Button>
          </div>
        </StudioCard>
      )}
    </div>
  );
};
