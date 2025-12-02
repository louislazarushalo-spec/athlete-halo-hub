-- Create table for storing followed athletes
CREATE TABLE public.followed_athletes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  athlete_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, athlete_id)
);

-- Enable Row Level Security
ALTER TABLE public.followed_athletes ENABLE ROW LEVEL SECURITY;

-- Users can view their own followed athletes
CREATE POLICY "Users can view their own followed athletes"
ON public.followed_athletes
FOR SELECT
USING (auth.uid() = user_id);

-- Users can follow athletes
CREATE POLICY "Users can follow athletes"
ON public.followed_athletes
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can unfollow athletes
CREATE POLICY "Users can unfollow athletes"
ON public.followed_athletes
FOR DELETE
USING (auth.uid() = user_id);