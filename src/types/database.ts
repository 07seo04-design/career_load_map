export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          school_name: string | null;
          major: string | null;
          bio: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          school_name?: string | null;
          major?: string | null;
          bio?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          school_name?: string | null;
          major?: string | null;
          bio?: string | null;
        };
      };
      roadmaps: {
        Row: {
          id: string;
          user_id: string;
          grade: number;
          title: string;
          description: string | null;
          status: "not_started" | "in_progress" | "completed";
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          grade: number;
          title: string;
          description?: string | null;
          status?: "not_started" | "in_progress" | "completed";
        };
        Update: {
          id?: string;
          user_id?: string;
          grade?: number;
          title?: string;
          description?: string | null;
          status?: "not_started" | "in_progress" | "completed";
        };
      };
      daily_goals: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          is_completed: boolean;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content: string;
          is_completed?: boolean;
          date: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          content?: string;
          is_completed?: boolean;
          date?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          tech_stack: string[];
          image_url: string | null;
          link_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          tech_stack?: string[];
          image_url?: string | null;
          link_url?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          tech_stack?: string[];
          image_url?: string | null;
          link_url?: string | null;
        };
      };
    };
  };
}
