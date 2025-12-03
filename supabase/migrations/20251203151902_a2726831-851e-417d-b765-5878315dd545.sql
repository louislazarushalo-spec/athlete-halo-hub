-- Create table for contest entries
CREATE TABLE public.contest_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  contest_type TEXT NOT NULL, -- 'wristband', 'training_session', 'meet_greet', 'video_call'
  athlete_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for match predictions
CREATE TABLE public.match_predictions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  athlete_id TEXT NOT NULL,
  prediction_score TEXT NOT NULL, -- e.g., "6-4, 7-5"
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for fan questions
CREATE TABLE public.fan_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  athlete_id TEXT NOT NULL,
  question TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'answered', 'rejected'
  answer TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.contest_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fan_questions ENABLE ROW LEVEL SECURITY;

-- Contest entries policies
CREATE POLICY "Users can view their own contest entries"
  ON public.contest_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can enter contests"
  ON public.contest_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Match predictions policies
CREATE POLICY "Users can view their own predictions"
  ON public.match_predictions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can submit predictions"
  ON public.match_predictions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Fan questions policies
CREATE POLICY "Users can view their own questions"
  ON public.fan_questions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can submit questions"
  ON public.fan_questions FOR INSERT
  WITH CHECK (auth.uid() = user_id);