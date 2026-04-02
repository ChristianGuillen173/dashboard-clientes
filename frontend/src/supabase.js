// src/supabase.js
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://wfrklnrncjswqzwkocfj.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmcmtsbnJuY2pzd3F6d2tvY2ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNDE3MjksImV4cCI6MjA5MDcxNzcyOX0.Gy5cyKqZ-EpA0YQEFajtLCTnaGaaBB2JQJGsEZ_rUxk";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
