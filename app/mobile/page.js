"use client";

import { useRef, useState, useEffect } from "react";

export default function MobilePage() {
  const pcRef = useRef(null);
  const videoRef = useRef(null);

  const [connected, setConnected] = useState(false);
  const [offerInput, setOfferInput] = useState("");
  const [answerOutput, setAnswerOutput] = useState("");

  useEffect(() => {
    const pc = new RTCPeerConnection({
        iceServers: [
            { urls: "stun:stun.l.google.com:19302" }
        ]
    });
    pcRef.current = pc;

    pc.ontrack = (event) => {
      if (videoRef.current) {
        videoRef.current.srcObject = event.streams[0];
      }
    };
  }, []);

  const connect = async () => {
  if (!offerInput) return;

  const offerData = JSON.parse(offerInput);
    
  await pcRef.current.setRemoteDescription(offerData.sdp);
    
  pcRef.current.onicecandidate = (e) => {
    if (!e.candidate) {
      const answerText = JSON.stringify({
        sdp: pcRef.current.localDescription,
      });

      setAnswerOutput(answerText);
      setConnected(true);
    }
  };

  const answer = await pcRef.current.createAnswer();
  await pcRef.current.setLocalDescription(answer);
};

  return (
    <div style={{ padding: 20 }}>
      <h1>Mobile Receiver</h1>

      <p>Paste Offer from PC</p>
      <textarea
        value={offerInput}
        onChange={(e) => setOfferInput(e.target.value)}
        rows={6}
        style={{ width: "100%" }}
      />

      <button onClick={connect}>
        {connected ? "Connected" : "Connect"}
      </button>

      {answerOutput && (
        <div style={{ marginTop: 20 }}>
          <p>Answer (copy to PC)</p>
          <textarea
            value={answerOutput}
            readOnly
            rows={6}
            style={{ width: "100%" }}
          />
          <button onClick={copyAnswer}>Copy Answer</button>
        </div>
      )}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", marginTop: 20 }}
      />
    </div>
  );
}
