"use client";
import { useRef, useState } from "react";

export default function PCPage() {
  const pcRef = useRef(null);
  const [offerOutput, setOfferOutput] = useState("");
  const [answerInput, setAnswerInput] = useState("");

  const createConnection = async () => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    });

    pcRef.current = pc;

    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false
    });

    stream.getTracks().forEach(track => pc.addTrack(track, stream));

    pc.onicecandidate = (e) => {
      if (!e.candidate) {
        setOfferOutput(JSON.stringify({
          sdp: pc.localDescription
        }));
      }
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
  };

  const applyAnswer = async () => {
    if (!answerInput || !pcRef.current) return;

    try {
      const data = JSON.parse(answerInput);
      await pcRef.current.setRemoteDescription(data.sdp);
      alert("Connected!");
    } catch (err) {
      console.error(err);
      alert("Invalid Answer JSON");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>PC Sender</h1>

      <button onClick={createConnection}>
        Start Screen Share
      </button>

      {offerOutput && (
        <>
          <p>Offer (copy to mobile)</p>
          <textarea
            value={offerOutput}
            readOnly
            rows={8}
            style={{ width: "100%" }}
          />
        </>
      )}

      <p>Paste Answer from mobile</p>
      <textarea
        value={answerInput}
        onChange={(e) => setAnswerInput(e.target.value)}
        rows={8}
        style={{ width: "100%" }}
      />

      <button onClick={applyAnswer}>
        Apply Answer
      </button>
    </div>
  );
}
