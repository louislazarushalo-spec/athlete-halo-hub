export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      athlete_brand_profile: {
        Row: {
          answers_json: Json | null
          athlete_id: string
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          answers_json?: Json | null
          athlete_id: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          answers_json?: Json | null
          athlete_id?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      athlete_content: {
        Row: {
          athlete_id: string
          content_type: string
          created_at: string
          created_by: string | null
          id: string
          image_url: string
          title: string | null
        }
        Insert: {
          athlete_id: string
          content_type?: string
          created_at?: string
          created_by?: string | null
          id?: string
          image_url: string
          title?: string | null
        }
        Update: {
          athlete_id?: string
          content_type?: string
          created_at?: string
          created_by?: string | null
          id?: string
          image_url?: string
          title?: string | null
        }
        Relationships: []
      }
      athlete_content_items: {
        Row: {
          athlete_id: string
          created_at: string
          external_url: string | null
          id: string
          media_urls: string[] | null
          published_at: string | null
          raw_json: Json | null
          source_id: string | null
          text_snippet: string | null
          title: string | null
          type: string
        }
        Insert: {
          athlete_id: string
          created_at?: string
          external_url?: string | null
          id?: string
          media_urls?: string[] | null
          published_at?: string | null
          raw_json?: Json | null
          source_id?: string | null
          text_snippet?: string | null
          title?: string | null
          type?: string
        }
        Update: {
          athlete_id?: string
          created_at?: string
          external_url?: string | null
          id?: string
          media_urls?: string[] | null
          published_at?: string | null
          raw_json?: Json | null
          source_id?: string | null
          text_snippet?: string | null
          title?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "athlete_content_items_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "athlete_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      athlete_content_metrics: {
        Row: {
          comments: number | null
          content_item_id: string
          id: string
          impressions: number | null
          likes: number | null
          pulled_at: string
          saves: number | null
          shares: number | null
          views: number | null
          watch_time: number | null
        }
        Insert: {
          comments?: number | null
          content_item_id: string
          id?: string
          impressions?: number | null
          likes?: number | null
          pulled_at?: string
          saves?: number | null
          shares?: number | null
          views?: number | null
          watch_time?: number | null
        }
        Update: {
          comments?: number | null
          content_item_id?: string
          id?: string
          impressions?: number | null
          likes?: number | null
          pulled_at?: string
          saves?: number | null
          shares?: number | null
          views?: number | null
          watch_time?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "athlete_content_metrics_content_item_id_fkey"
            columns: ["content_item_id"]
            isOneToOne: false
            referencedRelation: "athlete_content_items"
            referencedColumns: ["id"]
          },
        ]
      }
      athlete_profiles: {
        Row: {
          athlete_slug: string
          avatar_url: string | null
          banner_url: string | null
          bio: string | null
          created_at: string
          display_name: string
          earned_channels: Json | null
          id: string
          owned_channels: Json | null
          social_sources: Json | null
          sport: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          athlete_slug: string
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string
          earned_channels?: Json | null
          id?: string
          owned_channels?: Json | null
          social_sources?: Json | null
          sport?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          athlete_slug?: string
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string
          earned_channels?: Json | null
          id?: string
          owned_channels?: Json | null
          social_sources?: Json | null
          sport?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      athlete_sources: {
        Row: {
          athlete_id: string
          category: string
          channel_id: string | null
          created_at: string
          handle: string | null
          id: string
          last_synced_at: string | null
          metadata_json: Json | null
          status: string
          subtype: string
          updated_at: string
          url: string | null
          user_id: string
        }
        Insert: {
          athlete_id: string
          category: string
          channel_id?: string | null
          created_at?: string
          handle?: string | null
          id?: string
          last_synced_at?: string | null
          metadata_json?: Json | null
          status?: string
          subtype: string
          updated_at?: string
          url?: string | null
          user_id: string
        }
        Update: {
          athlete_id?: string
          category?: string
          channel_id?: string | null
          created_at?: string
          handle?: string | null
          id?: string
          last_synced_at?: string | null
          metadata_json?: Json | null
          status?: string
          subtype?: string
          updated_at?: string
          url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      athlete_strategy_pack: {
        Row: {
          athlete_id: string
          created_at: string
          id: string
          pack_json: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          athlete_id: string
          created_at?: string
          id?: string
          pack_json?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          athlete_id?: string
          created_at?: string
          id?: string
          pack_json?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      athlete_weekly_packs: {
        Row: {
          athlete_id: string
          context: string
          created_at: string
          id: string
          pack_json: Json | null
          user_id: string
          week_start_date: string
        }
        Insert: {
          athlete_id: string
          context?: string
          created_at?: string
          id?: string
          pack_json?: Json | null
          user_id: string
          week_start_date: string
        }
        Update: {
          athlete_id?: string
          context?: string
          created_at?: string
          id?: string
          pack_json?: Json | null
          user_id?: string
          week_start_date?: string
        }
        Relationships: []
      }
      contest_entries: {
        Row: {
          athlete_id: string
          contest_type: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          athlete_id: string
          contest_type: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          athlete_id?: string
          contest_type?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      fan_questions: {
        Row: {
          answer: string | null
          athlete_id: string
          created_at: string
          id: string
          question: string
          status: string
          user_id: string
        }
        Insert: {
          answer?: string | null
          athlete_id: string
          created_at?: string
          id?: string
          question: string
          status?: string
          user_id: string
        }
        Update: {
          answer?: string | null
          athlete_id?: string
          created_at?: string
          id?: string
          question?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      followed_athletes: {
        Row: {
          athlete_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          athlete_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          athlete_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      match_predictions: {
        Row: {
          athlete_id: string
          created_at: string
          id: string
          prediction_score: string
          user_id: string
        }
        Insert: {
          athlete_id: string
          created_at?: string
          id?: string
          prediction_score: string
          user_id: string
        }
        Update: {
          athlete_id?: string
          created_at?: string
          id?: string
          prediction_score?: string
          user_id?: string
        }
        Relationships: []
      }
      media_mentions: {
        Row: {
          athlete_id: string
          created_at: string
          id: string
          image_url: string | null
          published_at: string | null
          publisher: string | null
          query_id: string | null
          raw_json: Json | null
          relevance_status: string
          snippet: string | null
          title: string
          url: string
        }
        Insert: {
          athlete_id: string
          created_at?: string
          id?: string
          image_url?: string | null
          published_at?: string | null
          publisher?: string | null
          query_id?: string | null
          raw_json?: Json | null
          relevance_status?: string
          snippet?: string | null
          title: string
          url: string
        }
        Update: {
          athlete_id?: string
          created_at?: string
          id?: string
          image_url?: string | null
          published_at?: string | null
          publisher?: string | null
          query_id?: string | null
          raw_json?: Json | null
          relevance_status?: string
          snippet?: string | null
          title?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_mentions_query_id_fkey"
            columns: ["query_id"]
            isOneToOne: false
            referencedRelation: "media_radar_queries"
            referencedColumns: ["id"]
          },
        ]
      }
      media_radar_config: {
        Row: {
          athlete_id: string
          created_at: string
          id: string
          is_daily_scan_enabled: boolean
          language: string
          provider: string
          region: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          athlete_id: string
          created_at?: string
          id?: string
          is_daily_scan_enabled?: boolean
          language?: string
          provider?: string
          region?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          athlete_id?: string
          created_at?: string
          id?: string
          is_daily_scan_enabled?: boolean
          language?: string
          provider?: string
          region?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      media_radar_queries: {
        Row: {
          athlete_id: string
          created_at: string
          id: string
          is_enabled: boolean
          query_text: string
        }
        Insert: {
          athlete_id: string
          created_at?: string
          id?: string
          is_enabled?: boolean
          query_text: string
        }
        Update: {
          athlete_id?: string
          created_at?: string
          id?: string
          is_enabled?: boolean
          query_text?: string
        }
        Relationships: []
      }
      media_scans: {
        Row: {
          athlete_id: string
          error_message: string | null
          finished_at: string | null
          id: string
          mention_count: number | null
          narratives: Json | null
          started_at: string
          status: string
        }
        Insert: {
          athlete_id: string
          error_message?: string | null
          finished_at?: string | null
          id?: string
          mention_count?: number | null
          narratives?: Json | null
          started_at?: string
          status?: string
        }
        Update: {
          athlete_id?: string
          error_message?: string | null
          finished_at?: string | null
          id?: string
          mention_count?: number | null
          narratives?: Json | null
          started_at?: string
          status?: string
        }
        Relationships: []
      }
      post_comments: {
        Row: {
          body: string
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: []
      }
      post_reactions: {
        Row: {
          created_at: string
          emoji: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          emoji: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          emoji?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          city: string | null
          country: string | null
          created_at: string
          email: string | null
          first_name: string | null
          followed_athletes_preferences: string[] | null
          id: string
          last_name: string | null
          last_sign_in: string | null
          notification_email_updates: boolean | null
          notification_new_programs: boolean | null
          notification_partner_offers: boolean | null
          notification_product_drops: boolean | null
          postcode: string | null
          sports_preferences: string[] | null
          street: string | null
        }
        Insert: {
          age?: number | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          followed_athletes_preferences?: string[] | null
          id: string
          last_name?: string | null
          last_sign_in?: string | null
          notification_email_updates?: boolean | null
          notification_new_programs?: boolean | null
          notification_partner_offers?: boolean | null
          notification_product_drops?: boolean | null
          postcode?: string | null
          sports_preferences?: string[] | null
          street?: string | null
        }
        Update: {
          age?: number | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          followed_athletes_preferences?: string[] | null
          id?: string
          last_name?: string | null
          last_sign_in?: string | null
          notification_email_updates?: boolean | null
          notification_new_programs?: boolean | null
          notification_partner_offers?: boolean | null
          notification_product_drops?: boolean | null
          postcode?: string | null
          sports_preferences?: string[] | null
          street?: string | null
        }
        Relationships: []
      }
      studio_engagements: {
        Row: {
          athlete_id: string
          created_at: string
          description: string | null
          id: string
          payload: Json | null
          status: string
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          athlete_id: string
          created_at?: string
          description?: string | null
          id?: string
          payload?: Json | null
          status?: string
          title?: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          athlete_id?: string
          created_at?: string
          description?: string | null
          id?: string
          payload?: Json | null
          status?: string
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      studio_monetization: {
        Row: {
          athlete_id: string
          config: Json | null
          created_at: string
          id: string
          status: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          athlete_id: string
          config?: Json | null
          created_at?: string
          id?: string
          status?: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          athlete_id?: string
          config?: Json | null
          created_at?: string
          id?: string
          status?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      studio_posts: {
        Row: {
          athlete_id: string
          body: string | null
          created_at: string
          id: string
          media: string[] | null
          published_at: string | null
          scheduled_at: string | null
          status: string
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          athlete_id: string
          body?: string | null
          created_at?: string
          id?: string
          media?: string[] | null
          published_at?: string | null
          scheduled_at?: string | null
          status?: string
          title?: string
          type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          athlete_id?: string
          body?: string | null
          created_at?: string
          id?: string
          media?: string[] | null
          published_at?: string | null
          scheduled_at?: string | null
          status?: string
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          athlete_id: string
          created_at: string
          expires_at: string | null
          id: string
          status: string
          user_id: string
        }
        Insert: {
          athlete_id: string
          created_at?: string
          expires_at?: string | null
          id?: string
          status?: string
          user_id: string
        }
        Update: {
          athlete_id?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user" | "athlete" | "agent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user", "athlete", "agent"],
    },
  },
} as const
