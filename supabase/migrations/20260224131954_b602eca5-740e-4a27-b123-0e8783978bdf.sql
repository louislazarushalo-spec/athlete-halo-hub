
-- Allow admins full access to athlete_profiles (so admin users like louis.lazarus can manage all athletes)
CREATE POLICY "Admins can manage all athlete profiles"
ON public.athlete_profiles
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));
