// app/libs/superbase.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function GET() {
  const { data } = await supabase.from('scripts').select('*');
  return Response.json(data);
}
