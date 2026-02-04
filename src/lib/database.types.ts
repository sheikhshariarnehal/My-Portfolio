export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      skills: {
        Row: {
          id: string
          name: string
          icon: string
          category: string | null
          sort_order: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          icon: string
          category?: string | null
          sort_order?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          icon?: string
          category?: string | null
          sort_order?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          image: string
          category: string
          tags: string[] | null
          live_url: string | null
          github_url: string | null
          featured: boolean | null
          sort_order: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image: string
          category: string
          tags?: string[] | null
          live_url?: string | null
          github_url?: string | null
          featured?: boolean | null
          sort_order?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image?: string
          category?: string
          tags?: string[] | null
          live_url?: string | null
          github_url?: string | null
          featured?: boolean | null
          sort_order?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      experience: {
        Row: {
          id: string
          title: string
          company: string
          location: string | null
          description: string
          start_date: string
          end_date: string | null
          is_current: boolean | null
          sort_order: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          company: string
          location?: string | null
          description: string
          start_date: string
          end_date?: string | null
          is_current?: boolean | null
          sort_order?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          company?: string
          location?: string | null
          description?: string
          start_date?: string
          end_date?: string | null
          is_current?: boolean | null
          sort_order?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      education: {
        Row: {
          id: string
          degree: string
          institution: string
          image: string | null
          start_year: number
          end_year: number | null
          status: string | null
          sort_order: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          degree: string
          institution: string
          image?: string | null
          start_year: number
          end_year?: number | null
          status?: string | null
          sort_order?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          degree?: string
          institution?: string
          image?: string | null
          start_year?: number
          end_year?: number | null
          status?: string | null
          sort_order?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: Json
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: Json
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          updated_at?: string
        }
      }
    }
  }
}
