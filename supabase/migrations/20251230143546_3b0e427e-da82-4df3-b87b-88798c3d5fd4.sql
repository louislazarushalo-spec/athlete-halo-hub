-- Add SELECT policy for subscribers to view athlete content
CREATE POLICY "Subscribers can view athlete content"
ON public.athlete_content
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.subscriptions
    WHERE subscriptions.user_id = auth.uid()
      AND subscriptions.athlete_id = athlete_content.athlete_id
      AND subscriptions.status = 'active'
  )
);