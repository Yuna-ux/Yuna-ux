import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://iswuhikrhyudrbpdcols.supabase.co";
const SUPABASE_KEY = "sb_publishable_0AuLfovh-dGGHt-K5apnmw_Mic96wXo"; // Use a ANON KEY (não a secret!)

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
