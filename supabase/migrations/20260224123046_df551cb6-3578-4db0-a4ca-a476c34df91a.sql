
-- Studio posts table
CREATE TABLE public.studio_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id text NOT NULL,
  user_id uuid NOT NULL,
  type text NOT NULL DEFAULT 'bts',
  title text NOT NULL DEFAULT '',
  body text DEFAULT '',
  media text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  scheduled_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.studio_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Athletes can manage own posts" ON public.studio_posts
  FOR ALL USING (public.has_role(auth.uid(), 'athlete') AND auth.uid() = user_id);

CREATE POLICY "Agents can manage posts" ON public.studio_posts
  FOR ALL USING (public.has_role(auth.uid(), 'agent'));

CREATE POLICY "Published posts are public" ON public.studio_posts
  FOR SELECT USING (status = 'published');

-- Studio engagements table
CREATE TABLE public.studio_engagements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id text NOT NULL,
  user_id uuid NOT NULL,
  type text NOT NULL,
  title text NOT NULL DEFAULT '',
  description text DEFAULT '',
  payload jsonb DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.studio_engagements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Athletes can manage own engagements" ON public.studio_engagements
  FOR ALL USING (public.has_role(auth.uid(), 'athlete') AND auth.uid() = user_id);

CREATE POLICY "Agents can manage engagements" ON public.studio_engagements
  FOR ALL USING (public.has_role(auth.uid(), 'agent'));

-- Studio monetization configs table
CREATE TABLE public.studio_monetization (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id text NOT NULL,
  user_id uuid NOT NULL,
  type text NOT NULL,
  config jsonb DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.studio_monetization ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Athletes can manage own monetization" ON public.studio_monetization
  FOR ALL USING (public.has_role(auth.uid(), 'athlete') AND auth.uid() = user_id);

CREATE POLICY "Agents can manage monetization" ON public.studio_monetization
  FOR ALL USING (public.has_role(auth.uid(), 'agent'));

-- Athlete profile extensions for Studio
CREATE TABLE public.athlete_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  athlete_slug text NOT NULL UNIQUE,
  display_name text NOT NULL DEFAULT '',
  bio text DEFAULT '',
  avatar_url text DEFAULT '',
  banner_url text DEFAULT '',
  sport text DEFAULT '',
  social_sources jsonb DEFAULT '{}',
  owned_channels jsonb DEFAULT '{}',
  earned_channels jsonb DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.athlete_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Athletes can manage own athlete profile" ON public.athlete_profiles
  FOR ALL USING (public.has_role(auth.uid(), 'athlete') AND auth.uid() = user_id);

CREATE POLICY "Agents can manage athlete profiles" ON public.athlete_profiles
  FOR ALL USING (public.has_role(auth.uid(), 'agent'));

CREATE POLICY "Public can view athlete profiles" ON public.athlete_profiles
  FOR SELECT USING (true);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION public.studio_update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_studio_posts_updated_at
  BEFORE UPDATE ON public.studio_posts FOR EACH ROW EXECUTE FUNCTION public.studio_update_updated_at();

CREATE TRIGGER update_studio_engagements_updated_at
  BEFORE UPDATE ON public.studio_engagements FOR EACH ROW EXECUTE FUNCTION public.studio_update_updated_at();

CREATE TRIGGER update_studio_monetization_updated_at
  BEFORE UPDATE ON public.studio_monetization FOR EACH ROW EXECUTE FUNCTION public.studio_update_updated_at();

CREATE TRIGGER update_athlete_profiles_updated_at
  BEFORE UPDATE ON public.athlete_profiles FOR EACH ROW EXECUTE FUNCTION public.studio_update_updated_at();
