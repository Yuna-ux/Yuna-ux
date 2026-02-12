"use client";

import { useRef, useState } from "react";

export default function PCPage() {
  const [streaming, setStreaming] = useState(false);
  const [offerText, setOfferText] = useState("");
  const [answerInput, setAnswerInput] = useState("");

  const pcRef = useRef(null);
  const videoRef = useRef(null);

  const startTransmission = async () => {
    if (streaming) return;

    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pcRef.current = pc;

    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });

    // Wait ICE gathering complete
    pc.onicecandidate = (e) => {
      if (!e.candidate) {
        const finalOffer = JSON.stringify({
          sdp: pc.localDescription,
        });

        setOfferText(finalOffer);
        console.log("Offer ready");
      }
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    setStreaming(true);
  };

  const copyOffer = async () => {
    if (!offerText) return;
    await navigator.clipboard.writeText(offerText);
    alert("Offer copied");
  };

  const applyAnswer = async () => {
    if (!answerInput) return;

    const data = JSON.parse(answerInput);
    await pcRef.current.setRemoteDescription(data.sdp);

    console.log("Connection state:", pcRef.current.connectionState);
    alert("Answer applied");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>PC - Screen Sharing</h1>

      <button onClick={startTransmission}>
        {streaming ? "Streaming started" : "Start streaming"}
      </button>

      {offerText && (
        <div style={{ marginTop: 20 }}>
          <p>Offer (copy to mobile)</p>
          <textarea
            value={offerText}
            readOnly
            rows={8}
            style={{ width: "100%" }}
          />
          <button onClick={copyOffer}>Copy Offer</button>
        </div>
      )}

      {streaming && (
        <div style={{ marginTop: 20 }}>
          <p>Paste Answer from mobile</p>
          <textarea
            value={answerInput}
            onChange={(e) => setAnswerInput(e.target.value)}
            rows={8}
            style={{ width: "100%" }}
          />
          <button onClick={applyAnswer}>Apply Answer</button>
        </div>
      )}

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
