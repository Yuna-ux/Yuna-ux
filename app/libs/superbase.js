// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://iswuhikrhyudrbpdcols.supabase.co",
  "sb_publishable_0AuLfovh-dGGHt-K5apnmw_Mic96wXo"
);

export default supabase;
