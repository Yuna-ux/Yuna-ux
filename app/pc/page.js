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

    pc.onconnectionstatechange = () => {
      console.log("PC state:", pc.connectionState);
    };

    pc.onicecandidate = (e) => {
      if (!e.candidate) {
        setOfferText(
          JSON.stringify({
            sdp: pc.localDescription,
          })
        );
        console.log("Offer ready");
      }
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    setStreaming(true);
  };

  const applyAnswer = async () => {
    if (!answerInput || !pcRef.current) return;

    try {
      const data = JSON.parse(answerInput);

      if (pcRef.current.signalingState !== "have-local-offer") {
        alert("Wrong state: " + pcRef.current.signalingState);
        return;
      }

      await pcRef.current.setRemoteDescription(data.sdp);
      console.log("Answer applied");
    } catch (e) {
      console.error(e);
      alert("Invalid JSON");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>PC - Screen Sharing</h1>

      <button onClick={startTransmission}>
        {streaming ? "Streaming started" : "Start streaming"}
      </button>

      {offerText && (
        <>
          <p>Offer (copy to mobile)</p>
          <textarea value={offerText} readOnly rows={8} style={{ width: "100%" }} />
        </>
      )}

      {streaming && (
        <>
          <p>Paste Answer from mobile</p>
          <textarea
            value={answerInput}
            onChange={(e) => setAnswerInput(e.target.value)}
            rows={8}
            style={{ width: "100%" }}
          />
          <button onClick={applyAnswer}>Apply Answer</button>
        </>
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
