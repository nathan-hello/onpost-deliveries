export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      opd_base_gates: {
        Row: {
          base_id: number
          created_at: string
          hours: number | null
          id: number
          is_24_hour: boolean
          is_visitor_gate: boolean
          location: string
          signup_instructions: string | null
        }
        Insert: {
          base_id: number
          created_at?: string
          hours?: number | null
          id?: number
          is_24_hour: boolean
          is_visitor_gate: boolean
          location: string
          signup_instructions?: string | null
        }
        Update: {
          base_id?: number
          created_at?: string
          hours?: number | null
          id?: number
          is_24_hour?: boolean
          is_visitor_gate?: boolean
          location?: string
          signup_instructions?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "opd_base_gates_base_id_fkey"
            columns: ["base_id"]
            isOneToOne: false
            referencedRelation: "opd_bases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opd_base_gates_hours_fkey"
            columns: ["hours"]
            isOneToOne: false
            referencedRelation: "opd_hours"
            referencedColumns: ["id"]
          },
        ]
      }
      opd_bases: {
        Row: {
          created_at: string
          gates: number[] | null
          href: string
          id: number
          name: string
          restaurants: number[] | null
          state: string
        }
        Insert: {
          created_at?: string
          gates?: number[] | null
          href: string
          id?: number
          name: string
          restaurants?: number[] | null
          state: string
        }
        Update: {
          created_at?: string
          gates?: number[] | null
          href?: string
          id?: number
          name?: string
          restaurants?: number[] | null
          state?: string
        }
        Relationships: []
      }
      opd_drivers: {
        Row: {
          created_at: string
          currently_working: boolean | null
          id: number
          name: string
          restaurant_id: number
        }
        Insert: {
          created_at?: string
          currently_working?: boolean | null
          id?: number
          name: string
          restaurant_id: number
        }
        Update: {
          created_at?: string
          currently_working?: boolean | null
          id?: number
          name?: string
          restaurant_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "opd_drivers_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "opd_restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      opd_hours: {
        Row: {
          always_open: boolean
          begin_time: string
          created_at: string
          day_of_week: string
          end_time: string
          entity_id: number
          entity_type: string
          id: number
        }
        Insert: {
          always_open: boolean
          begin_time: string
          created_at?: string
          day_of_week: string
          end_time: string
          entity_id: number
          entity_type: string
          id?: number
        }
        Update: {
          always_open?: boolean
          begin_time?: string
          created_at?: string
          day_of_week?: string
          end_time?: string
          entity_id?: number
          entity_type?: string
          id?: number
        }
        Relationships: []
      }
      opd_profiles: {
        Row: {
          favorite_bases: number[] | null
          favorite_restaurants: number[] | null
          id: string
          is_restaurant: number | null
          name: string
        }
        Insert: {
          favorite_bases?: number[] | null
          favorite_restaurants?: number[] | null
          id: string
          is_restaurant?: number | null
          name: string
        }
        Update: {
          favorite_bases?: number[] | null
          favorite_restaurants?: number[] | null
          id?: string
          is_restaurant?: number | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "opd_profiles_is_restaurant_fkey"
            columns: ["is_restaurant"]
            isOneToOne: false
            referencedRelation: "opd_restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      opd_restaurants: {
        Row: {
          address: string
          created_at: string
          delivery_hours: number | null
          id: number
          name: string
          working_hours: number | null
        }
        Insert: {
          address: string
          created_at?: string
          delivery_hours?: number | null
          id?: number
          name: string
          working_hours?: number | null
        }
        Update: {
          address?: string
          created_at?: string
          delivery_hours?: number | null
          id?: number
          name?: string
          working_hours?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "opd_restaurants_delivery_hours_fkey"
            columns: ["delivery_hours"]
            isOneToOne: false
            referencedRelation: "opd_hours"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opd_restaurants_working_hours_fkey"
            columns: ["working_hours"]
            isOneToOne: false
            referencedRelation: "opd_hours"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_random_string: {
        Args: {
          md5_seed: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
