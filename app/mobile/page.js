"use client";
import { useRef, useState, useEffect } from "react";

export default function MobilePage() {
  const pcRef = useRef(null);
  const videoRef = useRef(null);
  const wakeLockRef = useRef(null);

  const [connected, setConnected] = useState(false);
  const [offerInput, setOfferInput] = useState("");
  const [answerOutput, setAnswerOutput] = useState("");

  const requestWakeLock = async () => {
    try {
      if ("wakeLock" in navigator) {
        wakeLockRef.current = await navigator.wakeLock.request("screen");
      }
    } catch (err) {}
  };

  useEffect(() => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      bundlePolicy: "max-bundle",
      rtcpMuxPolicy: "require"
    });

    pc.ontrack = (event) => {
      if (videoRef.current) {
        videoRef.current.srcObject = event.streams[0];
        videoRef.current.play().catch(() => {
          console.log("Clique na tela para ativar o áudio");
        });
      }
    };

    pc.onconnectionstatechange = () => {
        if (pc.connectionState === "disconnected" || pc.connectionState === "failed") {
            console.log("Reconnecting...");
            setConnected(false);
        }

        if (pc.connectionState === "connected") {
            setConnected(true);
            if (videoRef.current) {
                videoRef.current.play().catch(() => {});
            }
        }
    };

    pcRef.current = pc;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        requestWakeLock();
        if (videoRef.current && videoRef.current.paused) {
          videoRef.current.play().catch(() => {});
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    requestWakeLock();

    return () => {
      pc.close();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (wakeLockRef.current) wakeLockRef.current.release();
    };
  }, []);

  const connect = async () => {
    if (!offerInput) return;

    const pc = pcRef.current;

    try {
      const offerData = JSON.parse(offerInput);

      pc.onicecandidate = (e) => {
        if (!e.candidate) {
          setAnswerOutput(
            JSON.stringify({
              sdp: pc.localDescription,
            })
          );
        }
      };

      await pc.setRemoteDescription(new RTCSessionDescription(offerData.sdp));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      requestWakeLock();
    } catch (err) {
      console.error(err);
      alert("Invalid offer or connection error");
    }
  };

  const copyAnswer = () => {
    navigator.clipboard.writeText(answerOutput);
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#0f172a",
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
      background: "#0f172a",
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
      background: connected ? "#22c55e" : "#3b82f6",
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
      color: connected ? "#22c55e" : "#facc15",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.page}>
      <h2>📱 Mobile Receiver</h2>

      <div style={styles.status}>
        {connected ? "Connected" : "Waiting connection..."}
      </div>

      <div style={styles.card}>
        <p>Paste Offer</p>
        <textarea
          value={offerInput}
          onChange={(e) => setOfferInput(e.target.value)}
          rows={6}
          style={styles.textarea}
        />
        <button style={styles.button} onClick={connect}>
          {connected ? "Connected" : "Connect"}
        </button>
      </div>

      {answerOutput && (
        <div style={styles.card}>
          <p>Answer</p>
          <textarea
            value={answerOutput}
            readOnly
            rows={6}
            style={styles.textarea}
          />
          <button style={styles.button} onClick={copyAnswer}>
            Copy Answer
          </button>
        </div>
      )}

      <div style={styles.card}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          controls
          muted
          style={styles.video}
        />
      </div>
    </div>
  );
}
