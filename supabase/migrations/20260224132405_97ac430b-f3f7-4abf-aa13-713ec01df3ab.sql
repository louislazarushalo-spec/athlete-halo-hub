
-- Media Radar Config: per-athlete configuration
CREATE TABLE public.media_radar_config (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  athlete_id text NOT NULL,
  user_id uuid NOT NULL,
  provider text NOT NULL DEFAULT 'google_cse',
  language text NOT NULL DEFAULT 'all',
  region text,
  is_daily_scan_enabled boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(athlete_id)
);

ALTER TABLE public.media_radar_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Agents manage media radar config" ON public.media_radar_config FOR ALL USING (has_role(auth.uid(), 'agent'::app_role));
CREATE POLICY "Admins manage media radar config" ON public.media_radar_config FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Athletes manage own config" ON public.media_radar_config FOR ALL USING (has_role(auth.uid(), 'athlete'::app_role) AND auth.uid() = user_id);

-- Media Radar Queries: search queries per athlete
CREATE TABLE public.media_radar_queries (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  athlete_id text NOT NULL,
  query_text text NOT NULL,
  is_enabled boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.media_radar_queries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Agents manage radar queries" ON public.media_radar_queries FOR ALL USING (has_role(auth.uid(), 'agent'::app_role));
CREATE POLICY "Admins manage radar queries" ON public.media_radar_queries FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Athletes manage own queries" ON public.media_radar_queries FOR ALL USING (
  has_role(auth.uid(), 'athlete'::app_role) AND EXISTS (
    SELECT 1 FROM media_radar_config c WHERE c.athlete_id = media_radar_queries.athlete_id AND c.user_id = auth.uid()
  )
);

-- Media Mentions: individual articles/mentions found
CREATE TABLE public.media_mentions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  athlete_id text NOT NULL,
  query_id uuid REFERENCES public.media_radar_queries(id) ON DELETE SET NULL,
  title text NOT NULL,
  publisher text,
  url text NOT NULL,
  published_at timestamp with time zone,
  snippet text,
  image_url text,
  relevance_status text NOT NULL DEFAULT 'unknown',
  raw_json jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(athlete_id, url)
);

ALTER TABLE public.media_mentions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Agents manage mentions" ON public.media_mentions FOR ALL USING (has_role(auth.uid(), 'agent'::app_role));
CREATE POLICY "Admins manage mentions" ON public.media_mentions FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Athletes manage own mentions" ON public.media_mentions FOR ALL USING (
  has_role(auth.uid(), 'athlete'::app_role) AND EXISTS (
    SELECT 1 FROM media_radar_config c WHERE c.athlete_id = media_mentions.athlete_id AND c.user_id = auth.uid()
  )
);

-- Media Scans: scan execution log
CREATE TABLE public.media_scans (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  athlete_id text NOT NULL,
  started_at timestamp with time zone NOT NULL DEFAULT now(),
  finished_at timestamp with time zone,
  status text NOT NULL DEFAULT 'running',
  error_message text,
  mention_count integer DEFAULT 0,
  narratives jsonb DEFAULT '[]'::jsonb
);

ALTER TABLE public.media_scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Agents manage scans" ON public.media_scans FOR ALL USING (has_role(auth.uid(), 'agent'::app_role));
CREATE POLICY "Admins manage scans" ON public.media_scans FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Athletes manage own scans" ON public.media_scans FOR ALL USING (
  has_role(auth.uid(), 'athlete'::app_role) AND EXISTS (
    SELECT 1 FROM media_radar_config c WHERE c.athlete_id = media_scans.athlete_id AND c.user_id = auth.uid()
  )
);

-- Indexes
CREATE INDEX idx_media_mentions_athlete ON public.media_mentions(athlete_id);
CREATE INDEX idx_media_mentions_relevance ON public.media_mentions(athlete_id, relevance_status);
CREATE INDEX idx_media_scans_athlete ON public.media_scans(athlete_id);
CREATE INDEX idx_media_radar_queries_athlete ON public.media_radar_queries(athlete_id);
