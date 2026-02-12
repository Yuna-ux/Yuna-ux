"use client";import { useRef, useState } from "react";

export default function MobilePage() {const pcRef = useRef(null);const videoRef = useRef(null);

const [offerInput, setOfferInput] = useState("");const [answerOutput, setAnswerOutput] = useState("");

const connect = async () => {if (!offerInput) return;

const pc = new RTCPeerConnection({
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
});

pcRef.current = pc;

pc.ontrack = (event) => {
  videoRef.current.srcObject = event.streams[0];
};

const offerData = JSON.parse(offerInput);
await pc.setRemoteDescription(offerData.sdp);

pc.onicecandidate = (e) => {
  if (!e.candidate) {
    setAnswerOutput(JSON.stringify({
      sdp: pc.localDescription
    }));
  }
};

const answer = await pc.createAnswer();
await pc.setLocalDescription(answer);

};

return (<div style={{ padding: 20 }}>Mobile Receiver

  <p>Paste Offer from PC</p>
  <textarea
    value={offerInput}
    onChange={(e) => setOfferInput(e.target.value)}
    rows={8}
    style={{ width: "100%" }}
  />

  <button onClick={connect}>
    Connect
  </button>

  {answerOutput && (
    <>
      <p>Answer (copy to PC)</p>
      <textarea
        value={answerOutput}
        readOnly
        rows={8}
        style={{ width: "100%" }}
      />
    </>
  )}

  <video
    ref={videoRef}
    autoPlay
    playsInline
    controls
    style={{ width: "100%", marginTop: 20 }}
  />
</div>

);}
