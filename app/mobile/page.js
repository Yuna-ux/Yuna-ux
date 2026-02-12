"use client";

import { useRef, useState, useEffect } from "react";

export default function MobilePage() {
  const pcRef = useRef(null);
  const videoRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    pcRef.current = new RTCPeerConnection();

    pcRef.current.ontrack = (event) => {
      if (videoRef.current) {
        videoRef.current.srcObject = event.streams[0];
      }
    };
  }, []);

  const connect = async () => {
    const offerText = prompt("Paste the offer from PC:");
    if (!offerText) return;

    const offerData = JSON.parse(offerText);

    await pcRef.current.setRemoteDescription(offerData.sdp);

    const answer = await pcRef.current.createAnswer();
    await pcRef.current.setLocalDescription(answer);

    alert(
      "Copy this answer and paste on PC:\n\n" +
      JSON.stringify({ sdp: pcRef.current.localDescription })
    );

    setConnected(true);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Mobile Receiver</h1>
      <button onClick={connect}>
        {connected ? "Connected" : "Connect"}
      </button>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", marginTop: 20 }}
      />
    </div>
  );
}
