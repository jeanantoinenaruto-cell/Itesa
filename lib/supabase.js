import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://lrdarwizuuxwyqcnusql.supabase.co";

const supabaseKey =
  "sb_publishable_NQoSXI6e_ZeovaW6xFVgJQ_uSRQ_khr";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);