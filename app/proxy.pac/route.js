export async function GET() {
  const pac = `
    function FindProxyForURL(url, host) {
      return "PROXY yuna-ux.vercel.app";
    }
  `;
  return new Response(pac, {
    headers: {
      'Content-Type': 'application/x-ns-proxy-autoconfig',
    },
  });
}
