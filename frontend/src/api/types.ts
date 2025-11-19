// ========================================
// USER & AUTH
// ========================================

export interface User {
  id: number | string;
  email: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  token_type?: string;
  user?: Partial<User>;
}

// ========================================
// ARCHER
// ========================================

export type Gender = "Male" | "Female" | "Other" | null;

export interface Archer {
  archer_id?: number;
  class_id?: number | null;
  default_division_id?: number | null;
  name: string;
  date_of_birth?: string | null;
  gender?: Gender;
  user_id?: string | null;   // UUID
  created_at?: string;
  updated_at?: string;
}

// ========================================
// CLASS / DIVISION / CATEGORY
// ========================================

export interface Class {
  class_id?: number;
  name: string;
}

export interface Division {
  division_id?: number;
  name: string;
}

export interface Category {
  category_id?: number;
  class_id?: number | null;
  division_id?: number | null;
}

// ========================================
// COMPETITION
// ========================================

export interface Competition {
  competition_id?: number;
  name: string;
  date: string;
  location?: string | null;
  is_championship_part?: boolean;
  created_by?: number | null;
  rounds?: Round[];
}

// ========================================
// ROUND STRUCTURE
// ========================================

export interface Round {
  round_id?: number;
  name: string;
  description?: string | null;
}

export interface RoundRange {
  range_id?: number;
  round_id: number;
  distance: number;
  ends: number;
  target_face_size: number;
  range_number: number;
}

export interface RoundEnd {
  end_id?: number;
  range_id: number;
  end_number: number;
}

// ========================================
// STAGING SCORE (Recorder input before approval)
// ========================================

export type StagingStatus = "draft" | "submitted" | "approved";

export interface StagingScore {
  staging_score_id?: number;
  archer_id: number;
  round_id: number;
  competition_id?: number | null;
  datetime_recorded?: string;
  status: StagingStatus;
  recorder_by?: number | null;
  division_id?: number | null;
}

export interface StagingLine {
  staging_score_line_id?: number;
  staging_score_id: number;
  arrow_number: number;  // 1–6
  arrow_score: number;   // 0–10
  end_id?: number | null;
}

// ========================================
// FINAL SCORE (Official approved results)
// ========================================

export interface ScoreLine {
  score_line_id?: number;
  score_id: number;
  end_id: number;
  arrow_number: number;  // 1–6
  arrow_score: number;   // 0–10
}

export interface Score {
  score_id?: number;
  archer_id: number;
  competition_id?: number | null;
  date: string;
  total: number;
  is_practice: boolean;
  is_approved: boolean;
  round_id: number;
  approved_by?: number | null;
  division_id?: number | null;
  created_at?: string;
  equivalent_total?: number;
  lines?: ScoreLine[];
}
