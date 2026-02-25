
-- Fan engagement weekly leaderboard table
CREATE TABLE public.fan_engagement_weekly (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  athlete_id TEXT NOT NULL,
  user_id UUID NOT NULL,
  week_start_date DATE NOT NULL,
  reactions_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  participation_count INTEGER NOT NULL DEFAULT 0,
  score INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(athlete_id, user_id, week_start_date)
);

-- Enable RLS
ALTER TABLE public.fan_engagement_weekly ENABLE ROW LEVEL SECURITY;

-- Anyone can view the leaderboard
CREATE POLICY "Anyone can view leaderboard"
  ON public.fan_engagement_weekly
  FOR SELECT
  USING (true);

-- System/service role inserts (no user-facing insert needed)
-- Users can view but only service role updates scores

-- Index for fast leaderboard queries
CREATE INDEX idx_fan_engagement_weekly_athlete_week_score
  ON public.fan_engagement_weekly (athlete_id, week_start_date, score DESC);
