
-- Drop the existing restrictive public SELECT policy
DROP POLICY IF EXISTS "Public can view athlete profiles" ON public.athlete_profiles;

-- Recreate as PERMISSIVE so public reads work
CREATE POLICY "Public can view athlete profiles"
  ON public.athlete_profiles
  FOR SELECT
  USING (true);
