import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { athletes } from "@/data/athletes";
import { User, Loader2, X, Search, Check } from "lucide-react";
import { z } from "zod";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const SPORTS_OPTIONS = [
  "Triathlon",
  "Tennis",
  "Rugby",
  "Football",
  "Formula 1",
  "Cycling",
  "Basketball",
  "Running",
  "Swimming",
];

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  age: z.number().min(13, "Must be at least 13").max(120, "Invalid age").nullable().optional(),
  street: z.string().max(200).optional(),
  city: z.string().max(100).optional(),
  postcode: z.string().max(20).optional(),
  country: z.string().max(100).optional(),
});

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  age: number | null;
  street: string;
  city: string;
  postcode: string;
  country: string;
  sportsPreferences: string[];
  followedAthletesPreferences: string[];
  notificationEmailUpdates: boolean;
  notificationNewPrograms: boolean;
  notificationProductDrops: boolean;
  notificationPartnerOffers: boolean;
}

const AccountPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [athleteSearchOpen, setAthleteSearchOpen] = useState(false);

  const [profile, setProfile] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    age: null,
    street: "",
    city: "",
    postcode: "",
    country: "",
    sportsPreferences: [],
    followedAthletesPreferences: [],
    notificationEmailUpdates: false,
    notificationNewPrograms: false,
    notificationProductDrops: false,
    notificationPartnerOffers: false,
  });

  // Redirect if not authenticated
  useEffect(() => {
    // Give a brief moment for auth to initialize
    const timer = setTimeout(() => {
      setAuthChecked(true);
      if (!isAuthenticated) {
        navigate("/login", { state: { from: "/account" } });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setProfile({
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            email: data.email || user.email || "",
            age: data.age || null,
            street: data.street || "",
            city: data.city || "",
            postcode: data.postcode || "",
            country: data.country || "",
            sportsPreferences: data.sports_preferences || [],
            followedAthletesPreferences: data.followed_athletes_preferences || [],
            notificationEmailUpdates: data.notification_email_updates || false,
            notificationNewPrograms: data.notification_new_programs || false,
            notificationProductDrops: data.notification_product_drops || false,
            notificationPartnerOffers: data.notification_partner_offers || false,
          });
        } else {
          setProfile((prev) => ({
            ...prev,
            email: user.email || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error",
          description: "Failed to load profile data.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user, toast]);

  const handleInputChange = (field: keyof ProfileData, value: string | number | null) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const toggleSport = (sport: string) => {
    setProfile((prev) => ({
      ...prev,
      sportsPreferences: prev.sportsPreferences.includes(sport)
        ? prev.sportsPreferences.filter((s) => s !== sport)
        : [...prev.sportsPreferences, sport],
    }));
  };

  const toggleAthlete = (athleteId: string) => {
    setProfile((prev) => ({
      ...prev,
      followedAthletesPreferences: prev.followedAthletesPreferences.includes(athleteId)
        ? prev.followedAthletesPreferences.filter((id) => id !== athleteId)
        : [...prev.followedAthletesPreferences, athleteId],
    }));
  };

  const removeAthlete = (athleteId: string) => {
    setProfile((prev) => ({
      ...prev,
      followedAthletesPreferences: prev.followedAthletesPreferences.filter((id) => id !== athleteId),
    }));
  };

  const handleToggleNotification = (field: keyof ProfileData) => {
    setProfile((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validateForm = (): boolean => {
    const result = profileSchema.safeParse({
      firstName: profile.firstName,
      lastName: profile.lastName,
      age: profile.age,
      street: profile.street,
      city: profile.city,
      postcode: profile.postcode,
      country: profile.country,
    });

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        newErrors[field] = err.message;
      });
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSave = async () => {
    if (!user) return;
    if (!validateForm()) return;

    setIsSaving(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: profile.firstName.trim(),
          last_name: profile.lastName.trim(),
          age: profile.age ? Number(profile.age) : null,
          street: profile.street.trim() || null,
          city: profile.city.trim() || null,
          postcode: profile.postcode.trim() || null,
          country: profile.country.trim() || null,
          sports_preferences: profile.sportsPreferences,
          followed_athletes_preferences: profile.followedAthletesPreferences,
          notification_email_updates: profile.notificationEmailUpdates,
          notification_new_programs: profile.notificationNewPrograms,
          notification_product_drops: profile.notificationProductDrops,
          notification_partner_offers: profile.notificationPartnerOffers,
        })
        .eq("id", user.id);

      if (error) throw error;

      // Sync followed athletes to the followed_athletes table
      await syncFollowedAthletes();

      toast({
        title: "Saved",
        description: "Your profile has been updated.",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const syncFollowedAthletes = async () => {
    if (!user) return;

    try {
      // Get current followed athletes from the table
      const { data: currentFollowed } = await supabase
        .from("followed_athletes")
        .select("athlete_id")
        .eq("user_id", user.id);

      const currentIds = currentFollowed?.map((f) => f.athlete_id) || [];
      const newIds = profile.followedAthletesPreferences;

      // Add new follows
      const toAdd = newIds.filter((id) => !currentIds.includes(id));
      if (toAdd.length > 0) {
        await supabase.from("followed_athletes").insert(
          toAdd.map((athlete_id) => ({
            user_id: user.id,
            athlete_id,
          }))
        );
      }

      // Remove unfollowed
      const toRemove = currentIds.filter((id) => !newIds.includes(id));
      if (toRemove.length > 0) {
        await supabase
          .from("followed_athletes")
          .delete()
          .eq("user_id", user.id)
          .in("athlete_id", toRemove);
      }
    } catch (error) {
      console.error("Error syncing followed athletes:", error);
    }
  };

  const getAthleteById = (id: string) => athletes.find((a) => a.id === id);

  const isFormValid = profile.firstName.trim() !== "" && profile.lastName.trim() !== "";

  if (!authChecked || isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">My Account</h1>
            <p className="text-muted-foreground text-sm">Manage your profile and preferences</p>
            <Link to="/studio" className="inline-block mt-3">
              <Button variant="outline" size="sm">Open Studio</Button>
            </Link>
          </div>

          <div className="space-y-8">
            {/* Profile Section */}
            <section className="glass-card p-6">
              <h2 className="font-display text-lg font-semibold mb-4">Profile</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      First name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Enter first name"
                      className={errors.firstName ? "border-destructive" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive">{errors.firstName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Last name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Enter last name"
                      className={errors.lastName ? "border-destructive" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    disabled
                    className="bg-muted/50"
                  />
                  <p className="text-xs text-muted-foreground">Managed by login</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    min={13}
                    max={120}
                    value={profile.age ?? ""}
                    onChange={(e) =>
                      handleInputChange("age", e.target.value ? Number(e.target.value) : null)
                    }
                    placeholder="Enter your age"
                    className={errors.age ? "border-destructive" : ""}
                  />
                  {errors.age && <p className="text-sm text-destructive">{errors.age}</p>}
                </div>

                <Separator className="my-4" />

                <h3 className="text-sm font-medium text-muted-foreground">Address (optional)</h3>

                <div className="space-y-2">
                  <Label htmlFor="street">Street</Label>
                  <Input
                    id="street"
                    value={profile.street}
                    onChange={(e) => handleInputChange("street", e.target.value)}
                    placeholder="Enter street address"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={profile.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Enter city"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postcode">Postcode</Label>
                    <Input
                      id="postcode"
                      value={profile.postcode}
                      onChange={(e) => handleInputChange("postcode", e.target.value)}
                      placeholder="Enter postcode"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={profile.country}
                    onChange={(e) => handleInputChange("country", e.target.value)}
                    placeholder="Enter country"
                  />
                </div>
              </div>
            </section>

            {/* Preferences Section */}
            <section className="glass-card p-6">
              <h2 className="font-display text-lg font-semibold mb-4">Preferences</h2>

              {/* Sports I Follow */}
              <div className="space-y-3 mb-6">
                <Label>Sports I follow</Label>
                <div className="flex flex-wrap gap-2">
                  {SPORTS_OPTIONS.map((sport) => (
                    <Badge
                      key={sport}
                      variant={profile.sportsPreferences.includes(sport) ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        profile.sportsPreferences.includes(sport)
                          ? "bg-primary hover:bg-primary/80"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => toggleSport(sport)}
                    >
                      {profile.sportsPreferences.includes(sport) && (
                        <Check className="h-3 w-3 mr-1" />
                      )}
                      {sport}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator className="my-6" />

              {/* Athletes I Follow */}
              <div className="space-y-3 mb-6">
                <Label>Athletes I follow</Label>

                {/* Selected athletes as chips */}
                {profile.followedAthletesPreferences.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {profile.followedAthletesPreferences.map((id) => {
                      const athlete = getAthleteById(id);
                      return athlete ? (
                        <Badge
                          key={id}
                          variant="secondary"
                          className="flex items-center gap-1.5 pr-1"
                        >
                          <img
                            src={athlete.avatar}
                            alt={athlete.name}
                            className="w-5 h-5 rounded-full object-cover object-top"
                          />
                          {athlete.name}
                          <button
                            type="button"
                            onClick={() => removeAthlete(id)}
                            className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ) : null;
                    })}
                  </div>
                )}

                {/* Athlete search dropdown */}
                <Popover open={athleteSearchOpen} onOpenChange={setAthleteSearchOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Search athletes...</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search athletes..." />
                      <CommandList>
                        <CommandEmpty>No athletes found.</CommandEmpty>
                        <CommandGroup>
                          {athletes.map((athlete) => (
                            <CommandItem
                              key={athlete.id}
                              value={athlete.name}
                              onSelect={() => {
                                toggleAthlete(athlete.id);
                              }}
                              className="flex items-center gap-3 cursor-pointer"
                            >
                              <img
                                src={athlete.avatar}
                                alt={athlete.name}
                                className="w-8 h-8 rounded-full object-cover object-top"
                              />
                              <div className="flex-1">
                                <p className="font-medium">{athlete.name}</p>
                                <p className="text-xs text-muted-foreground">{athlete.sport}</p>
                              </div>
                              {profile.followedAthletesPreferences.includes(athlete.id) && (
                                <Check className="h-4 w-4 text-primary" />
                              )}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {profile.followedAthletesPreferences.length === 0 && (
                  <p className="text-sm text-muted-foreground">No athletes selected yet.</p>
                )}
              </div>

              <Separator className="my-6" />

              {/* Notifications */}
              <div className="space-y-4">
                <Label>Notifications</Label>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Email updates</p>
                      <p className="text-xs text-muted-foreground">
                        General news and announcements
                      </p>
                    </div>
                    <Switch
                      checked={profile.notificationEmailUpdates}
                      onCheckedChange={() => handleToggleNotification("notificationEmailUpdates")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">New programs</p>
                      <p className="text-xs text-muted-foreground">
                        When athletes release new training content
                      </p>
                    </div>
                    <Switch
                      checked={profile.notificationNewPrograms}
                      onCheckedChange={() => handleToggleNotification("notificationNewPrograms")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Product drops</p>
                      <p className="text-xs text-muted-foreground">
                        New gear and merchandise
                      </p>
                    </div>
                    <Switch
                      checked={profile.notificationProductDrops}
                      onCheckedChange={() => handleToggleNotification("notificationProductDrops")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Partner offers</p>
                      <p className="text-xs text-muted-foreground">
                        Exclusive deals from sponsors
                      </p>
                    </div>
                    <Switch
                      checked={profile.notificationPartnerOffers}
                      onCheckedChange={() => handleToggleNotification("notificationPartnerOffers")}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Save Button - Sticky on mobile */}
            <div className="sticky bottom-4 z-10">
              <Button
                onClick={handleSave}
                disabled={isSaving || !isFormValid}
                className="w-full h-12 text-base font-medium shadow-lg"
                variant="default"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AccountPage;