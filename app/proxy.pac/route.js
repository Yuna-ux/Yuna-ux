export function GET() {
  const pacFile = `
    function FindProxyForURL(url, host) {
      if (shExpMatch(host, "*.local")) {
        return "PROXY 127.0.0.1:8080";
      }
      return "DIRECT";
    }
  `;
  return new Response(pacFile, {
    headers: {
      "Content-Type": "application/x-ns-proxy-autoconfig"
    }
  });
}
