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

    try {
      const constraints = {
        video: {
          displaySurface: "monitor",
          frameRate: { ideal: 30 },
          width: { max: 1920 },
          height: { max: 1080 }
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      videoRef.current.srcObject = stream;

      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        bundlePolicy: "max-bundle",
        rtcpMuxPolicy: "require"
      });

      pcRef.current = pc;

      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });

      pc.onicecandidate = (e) => {
        if (!e.candidate) {
          setOfferText(JSON.stringify({ sdp: pc.localDescription }));
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      setStreaming(true);
    } catch (err) {
      console.error(err);
    }
  };

  const applyAnswer = async () => {
    try {
      const data = JSON.parse(answerInput);
      await pcRef.current.setRemoteDescription(data.sdp);
    } catch {
      alert("Invalid answer");
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#020617",
      color: "#fff",
      padding: 20,
      fontFamily: "sans-serif",
    },
    card: {
      background: "#1e293b",
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
    },
    textarea: {
      width: "100%",
      background: "#020617",
      color: "#fff",
      border: "1px solid #334155",
      borderRadius: 8,
      padding: 8,
      fontSize: "12px"
    },
    button: {
      marginTop: 10,
      padding: "10px 14px",
      borderRadius: 8,
      border: "none",
      background: streaming ? "#22c55e" : "#3b82f6",
      color: "#fff",
      fontWeight: "bold",
      cursor: "pointer",
      width: "100%",
    },
    video: {
      width: "100%",
      borderRadius: 12,
      background: "#000",
      boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
    },
    status: {
      marginBottom: 10,
      color: streaming ? "#22c55e" : "#facc15",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.page}>
      <h2>🖥 PC Screen Sender</h2>

      <div style={styles.status}>
        {streaming ? "Streaming active" : "Not streaming"}
      </div>

      <div style={styles.card}>
        <button style={styles.button} onClick={startTransmission}>
          {streaming ? "Streaming started" : "Start streaming"}
        </button>
      </div>

      {offerText && (
        <div style={styles.card}>
          <p>Offer</p>
          <textarea readOnly value={offerText} rows={6} style={styles.textarea} />
        </div>
      )}

      {streaming && (
        <div style={styles.card}>
          <p>Paste Answer</p>
          <textarea
            value={answerInput}
            onChange={(e) => setAnswerInput(e.target.value)}
            rows={6}
            style={styles.textarea}
          />
          <button style={styles.button} onClick={applyAnswer}>
            Apply Answer
          </button>
        </div>
      )}

      <div style={styles.card}>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={styles.video}
        />
      </div>
    </div>
  );
}
