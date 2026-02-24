
-- Drop the old unique constraint on user_id only
ALTER TABLE public.athlete_profiles DROP CONSTRAINT IF EXISTS athlete_profiles_user_id_key;

-- Add a new unique constraint on (user_id, athlete_slug) to allow one user to manage multiple athletes
ALTER TABLE public.athlete_profiles ADD CONSTRAINT athlete_profiles_user_id_athlete_slug_key UNIQUE (user_id, athlete_slug);
