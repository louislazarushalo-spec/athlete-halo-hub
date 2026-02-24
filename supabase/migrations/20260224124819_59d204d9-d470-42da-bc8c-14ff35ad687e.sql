
-- Sources table
CREATE TABLE public.athlete_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id text NOT NULL,
  user_id uuid NOT NULL,
  category text NOT NULL CHECK (category IN ('social','owned','earned')),
  subtype text NOT NULL,
  url text,
  handle text,
  channel_id text,
  status text NOT NULL DEFAULT 'disconnected',
  last_synced_at timestamptz,
  metadata_json jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.athlete_sources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Athletes manage own sources" ON public.athlete_sources FOR ALL
  USING (has_role(auth.uid(), 'athlete'::app_role) AND auth.uid() = user_id);
CREATE POLICY "Agents manage sources" ON public.athlete_sources FOR ALL
  USING (has_role(auth.uid(), 'agent'::app_role));

-- Content items table
CREATE TABLE public.athlete_content_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id text NOT NULL,
  source_id uuid REFERENCES public.athlete_sources(id) ON DELETE SET NULL,
  type text NOT NULL DEFAULT 'article',
  title text,
  text_snippet text,
  media_urls text[] DEFAULT '{}'::text[],
  external_url text,
  published_at timestamptz,
  raw_json jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.athlete_content_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Athletes view own content items" ON public.athlete_content_items FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.athlete_sources s WHERE s.id = source_id AND s.user_id = auth.uid()));
CREATE POLICY "Athletes manage own content items" ON public.athlete_content_items FOR ALL
  USING (EXISTS (SELECT 1 FROM public.athlete_profiles ap WHERE ap.athlete_slug = athlete_id AND ap.user_id = auth.uid()));
CREATE POLICY "Agents manage content items" ON public.athlete_content_items FOR ALL
  USING (has_role(auth.uid(), 'agent'::app_role));

-- Content metrics table
CREATE TABLE public.athlete_content_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_item_id uuid NOT NULL REFERENCES public.athlete_content_items(id) ON DELETE CASCADE,
  pulled_at timestamptz NOT NULL DEFAULT now(),
  views bigint DEFAULT 0,
  impressions bigint DEFAULT 0,
  likes bigint DEFAULT 0,
  comments bigint DEFAULT 0,
  shares bigint DEFAULT 0,
  saves bigint DEFAULT 0,
  watch_time bigint DEFAULT 0
);

ALTER TABLE public.athlete_content_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Athletes view own metrics" ON public.athlete_content_metrics FOR ALL
  USING (EXISTS (SELECT 1 FROM public.athlete_content_items ci JOIN public.athlete_profiles ap ON ap.athlete_slug = ci.athlete_id WHERE ci.id = content_item_id AND ap.user_id = auth.uid()));
CREATE POLICY "Agents manage metrics" ON public.athlete_content_metrics FOR ALL
  USING (has_role(auth.uid(), 'agent'::app_role));

-- Brand profile table
CREATE TABLE public.athlete_brand_profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id text NOT NULL UNIQUE,
  user_id uuid NOT NULL,
  answers_json jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.athlete_brand_profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Athletes manage own brand profile" ON public.athlete_brand_profile FOR ALL
  USING (has_role(auth.uid(), 'athlete'::app_role) AND auth.uid() = user_id);
CREATE POLICY "Agents manage brand profiles" ON public.athlete_brand_profile FOR ALL
  USING (has_role(auth.uid(), 'agent'::app_role));

-- Strategy pack table
CREATE TABLE public.athlete_strategy_pack (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id text NOT NULL UNIQUE,
  user_id uuid NOT NULL,
  pack_json jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.athlete_strategy_pack ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Athletes manage own strategy pack" ON public.athlete_strategy_pack FOR ALL
  USING (has_role(auth.uid(), 'athlete'::app_role) AND auth.uid() = user_id);
CREATE POLICY "Agents manage strategy packs" ON public.athlete_strategy_pack FOR ALL
  USING (has_role(auth.uid(), 'agent'::app_role));

-- Weekly packs table
CREATE TABLE public.athlete_weekly_packs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id text NOT NULL,
  user_id uuid NOT NULL,
  week_start_date date NOT NULL,
  context text NOT NULL DEFAULT 'training',
  pack_json jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.athlete_weekly_packs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Athletes manage own weekly packs" ON public.athlete_weekly_packs FOR ALL
  USING (has_role(auth.uid(), 'athlete'::app_role) AND auth.uid() = user_id);
CREATE POLICY "Agents manage weekly packs" ON public.athlete_weekly_packs FOR ALL
  USING (has_role(auth.uid(), 'agent'::app_role));

-- Updated_at triggers
CREATE TRIGGER update_athlete_sources_updated_at BEFORE UPDATE ON public.athlete_sources
  FOR EACH ROW EXECUTE FUNCTION public.studio_update_updated_at();
CREATE TRIGGER update_athlete_brand_profile_updated_at BEFORE UPDATE ON public.athlete_brand_profile
  FOR EACH ROW EXECUTE FUNCTION public.studio_update_updated_at();
CREATE TRIGGER update_athlete_strategy_pack_updated_at BEFORE UPDATE ON public.athlete_strategy_pack
  FOR EACH ROW EXECUTE FUNCTION public.studio_update_updated_at();
