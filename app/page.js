export default function Home() {
  return (
    <main>
      <h1>Serverside EndPoint</h1>
      <pre>
        {`
local response = game:HttpGet("\104\116\116\112\115\58\47\47\121\117\110\97\45\117\120\46\118\101\114\99\101\108\46\97\112\112")
local data = game:GetService("HttpService"):JSONDecode(response)
print(data.data)`}
      </pre>
    </main>
  );
}
