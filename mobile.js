import { useRef, useState } from "react";

export default function MobilePage() {
  const pcRef = useRef(new RTCPeerConnection());
  const [connected, setConnected] = useState(false);
  const videoRef = useRef(null);

  const connectToPC = async () => {
    const sdpString = prompt("Paste the PC offer here:");
    if (!sdpString) return;

    const data = JSON.parse(sdpString);
    await pcRef.current.setRemoteDescription(data.sdp);
    
    pcRef.current.ondatachannel = (event) => {
      const dc = event.channel;
      dc.onmessage = async (msg) => {
        const data = JSON.parse(msg.data);
        if (data.candidate) await pcRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
      };
    };
    
    pcRef.current.ontrack = (event) => {
      if (videoRef.current) videoRef.current.srcObject = event.streams[0];
    };

    const answer = await pcRef.current.createAnswer();
    await pcRef.current.setLocalDescription(answer);

    alert("Copy this answer and paste it into your PC to finalize the connection.:\n\n" + JSON.stringify({ sdp: pcRef.current.localDescription }));

    setConnected(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mobile - Receber Tela</h1>
      <button onClick={connectToPC}>{connected ? "Conectado" : "Conectar ao PC"}</button>
      <video
        autoPlay
        playsInline
        style={{ width: "100%", marginTop: "20px" }}
        ref={videoRef}
      />
    </div>
  );
}
