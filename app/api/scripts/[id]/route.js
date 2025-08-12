import { NextResponse } from 'next/server';
import supabase from '@/libs/supabase';

export async function GET(request, { params }) {
  const userAgent = request.headers.get('user-agent') || '';
  const isRobloxAgent = 
    userAgent.includes('Roblox/WinHttp') ||
    userAgent.toLowerCase().includes('roblox');

  if (!isRobloxAgent) {
    return new NextResponse(
      `<html><head><style>body{font-family:sans-serif;background:#f0f0f0;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;}div{padding:2rem;background:white;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.1);}</style></head><body><div>Page not found</div></body></html>`,
      {
        status: 404,
        headers: { 'Content-Type': 'text/html' },
      }
    );
  }

  const { data, error } = await supabase
    .from('scripts')
    .select('content')
    .eq('id', params.id)
    .single();

  if (error || !data) {
    return new NextResponse(
      `<html><head><style>body{font-family:sans-serif;background:#f0f0f0;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;}div{padding:2rem;background:white;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.1);}</style></head><body><div>Script not found</div></body></html>`,
      {
        status: 404,
        headers: { 'Content-Type': 'text/html' },
      }
    );
  }

  return new NextResponse(data.content, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
