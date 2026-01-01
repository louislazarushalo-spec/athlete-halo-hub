-- Add new profile fields for user preferences
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS age integer,
ADD COLUMN IF NOT EXISTS street text,
ADD COLUMN IF NOT EXISTS city text,
ADD COLUMN IF NOT EXISTS postcode text,
ADD COLUMN IF NOT EXISTS country text,
ADD COLUMN IF NOT EXISTS sports_preferences text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS followed_athletes_preferences text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS notification_email_updates boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS notification_new_programs boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS notification_product_drops boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS notification_partner_offers boolean DEFAULT false;

-- Add age constraint (must be reasonable)
ALTER TABLE public.profiles
ADD CONSTRAINT age_check CHECK (age IS NULL OR (age >= 13 AND age <= 120));