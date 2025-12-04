-- Create athlete_content table for managing athlete images/content
CREATE TABLE public.athlete_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  athlete_id TEXT NOT NULL,
  image_url TEXT NOT NULL,
  title TEXT,
  content_type TEXT NOT NULL DEFAULT 'image',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.athlete_content ENABLE ROW LEVEL SECURITY;

-- Admins can view all content
CREATE POLICY "Admins can view all athlete content"
ON public.athlete_content
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can insert content
CREATE POLICY "Admins can insert athlete content"
ON public.athlete_content
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins can update content
CREATE POLICY "Admins can update athlete content"
ON public.athlete_content
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete content
CREATE POLICY "Admins can delete athlete content"
ON public.athlete_content
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for athlete content
INSERT INTO storage.buckets (id, name, public) VALUES ('athlete-content', 'athlete-content', true);

-- Storage policies for athlete content bucket
CREATE POLICY "Anyone can view athlete content images"
ON storage.objects FOR SELECT
USING (bucket_id = 'athlete-content');

CREATE POLICY "Admins can upload athlete content images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'athlete-content' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update athlete content images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'athlete-content' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete athlete content images"
ON storage.objects FOR DELETE
USING (bucket_id = 'athlete-content' AND public.has_role(auth.uid(), 'admin'));