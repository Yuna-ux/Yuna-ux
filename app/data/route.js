export async function GET() {
  const data = {
    data: 191816425,
    status: "success",
    timestamp: Date.now()
  };
  
  return new Response(JSON.stringify(data), {
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
