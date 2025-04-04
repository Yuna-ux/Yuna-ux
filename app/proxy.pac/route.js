export function GET() {
  const pacContent = `
    function FindProxyForURL(url, host) {
      if (shExpMatch(host, "*.example.com")) {
        return "PROXY 127.0.0.1:8080";
      }
      return "DIRECT";
    }
  `;
  return new Response(pacContent, {
    headers: { "Content-Type": "application/x-ns-proxy-autoconfig" }
  });
}
