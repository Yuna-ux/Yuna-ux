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
      console.log("Track received");

      if (videoRef.current) {
        videoRef.current.srcObject = event.streams[0];
        videoRef.current.play().catch(() => {});
      }
    };

    pc.onconnectionstatechange = () => {
      console.log("Mobile state:", pc.connectionState);
      if (pc.connectionState === "connected") {
        setConnected(true);
      }
    };

    pcRef.current = pc;

    return () => {
      pc.close();
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
          console.log("Answer ready");
        }
      };

      await pc.setRemoteDescription(offerData.sdp);

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
    } catch (e) {
      console.error(e);
      alert("Invalid offer");
    }
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
        <>
          <p>Answer (copy to PC)</p>
          <textarea value={answerOutput} readOnly rows={8} style={{ width: "100%" }} />
        </>
      )}

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        controls
        style={{ width: "100%", marginTop: 20 }}
      />
    </div>
  );
        }
