-- Add last_sign_in column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN last_sign_in timestamp with time zone;

-- Create function to update last sign-in on login
CREATE OR REPLACE FUNCTION public.update_last_sign_in()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET last_sign_in = now()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$;

-- Create trigger that fires when user signs in (updates last_sign_in_at in auth.users)
CREATE OR REPLACE TRIGGER on_auth_user_sign_in
  AFTER UPDATE OF last_sign_in_at ON auth.users
  FOR EACH ROW
  WHEN (OLD.last_sign_in_at IS DISTINCT FROM NEW.last_sign_in_at)
  EXECUTE FUNCTION public.update_last_sign_in();