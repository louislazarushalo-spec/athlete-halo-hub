
-- Add athlete and agent roles to the app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'athlete';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'agent';
