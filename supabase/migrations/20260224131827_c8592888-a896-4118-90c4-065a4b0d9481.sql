
-- Drop the unique constraint on athlete_slug alone (allows multiple users to manage same athlete)
ALTER TABLE public.athlete_profiles DROP CONSTRAINT IF EXISTS athlete_profiles_athlete_slug_key;
