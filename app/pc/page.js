"use client";

import { useRef, useState } from "react";

export default function PCPage() {
  const [streaming, setStreaming] = useState(false);
  const pcRef = useRef(null);
  const localStreamRef = useRef(null);
  const videoRef = useRef(null);
  const dcRef = useRef(null);

  const startTransmission = async () => {
    if (streaming) return;

    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
    });

    localStreamRef.current = stream;

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }

    const pc = new RTCPeerConnection();
    pcRef.current = pc;

    stream.getTracks().forEach(track => {
      pc.addTrack(track, stream);
    });

    const dc = pc.createDataChannel("signal");
    dcRef.current = dc;

    dc.onmessage = async (event) => {
      const data = JSON.parse(event.data);

      if (data.sdp) {
        await pc.setRemoteDescription(data.sdp);
      }

      if (data.candidate) {
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    };

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        console.log(
          "ICE:",
          JSON.stringify({ candidate: e.candidate })
        );
      }
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    alert(
      "Copy this offer and paste it on the mobile page:\n\n" +
      JSON.stringify({ sdp: pc.localDescription })
    );

    setStreaming(true);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>PC - Screen Sharing</h1>

      <button onClick={startTransmission}>
        {streaming ? "Streaming started" : "Start streaming"}
      </button>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ width: "100%", marginTop: 20 }}
      />
    </div>
  );
}
