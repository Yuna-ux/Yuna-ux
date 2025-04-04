export async function GET() {
  const pacScript = `
    function FindProxyForURL(url, host) {
      if (shExpMatch(host, "*.google.com")) {
        return "PROXY yuna-ux.vercel.app:443";
      }
      return "DIRECT";
    }
  `;

  return new Response(pacScript, {
    headers: {
      "Content-Type": "application/x-ns-proxy-autoconfig",
    },
  });
}
