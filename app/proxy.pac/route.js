// app/proxy.pac/route.js

export function GET() {
  const pacScript = `
    function FindProxyForURL(url, host) {
      return "PROXY yuna-ux.vercel.app:443; DIRECT";
    }
  `;

  return new Response(pacScript, {
    headers: {
      "Content-Type": "application/x-ns-proxy-autoconfig"
    }
  });
}
