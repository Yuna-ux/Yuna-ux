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
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pc.ontrack = (event) => {
      if (videoRef.current) {
        videoRef.current.srcObject = event.streams[0];
      }
    };

    pcRef.current = pc;
  }, []);

  const connect = async () => {
    if (!offerInput) return;

    const pc = pcRef.current;
    const offerData = JSON.parse(offerInput);

    // Wait ICE gathering complete
    pc.onicecandidate = (e) => {
      if (!e.candidate) {
        const finalAnswer = JSON.stringify({
          sdp: pc.localDescription,
        });

        setAnswerOutput(finalAnswer);
        setConnected(true);
        console.log("Answer ready");
      }
    };

    await pc.setRemoteDescription(offerData.sdp);

    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
  };

  const copyAnswer = async () => {
    if (!answerOutput) return;
    await navigator.clipboard.writeText(answerOutput);
    alert("Answer copied");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Mobile Receiver</h1>

      <p>Paste Offer from PC</p>
      <textarea
        value={offerInput}
        onChange={(e) => setOfferInput(e.target.value)}
        rows={8}
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
            rows={8}
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
