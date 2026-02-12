import { useRef, useState } from "react";

export default function PCPage() {
  const [streaming, setStreaming] = useState(false);
  const pcRef = useRef(null);
  const localStreamRef = useRef(null);
  const dcRef = useRef(null);

  const startTransmission = async () => {
    if (streaming) return;

    localStreamRef.current = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
    });

    const pc = new RTCPeerConnection();
    pcRef.current = pc;

    localStreamRef.current.getTracks().forEach(track =>
      pc.addTrack(track, localStreamRef.current)
    );

    const dc = pc.createDataChannel("signal");
    dcRef.current = dc;

    dc.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      if (data.sdp) {
        await pc.setRemoteDescription(data.sdp);
      } else if (data.candidate) {
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    };

    pc.onicecandidate = (e) => {
      if (e.candidate) console.log(JSON.stringify({ candidate: e.candidate }));
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
    <div style={{ padding: "20px" }}>
      <h1>PC - Screen Sharing</h1>
      <button onClick={startTransmission}>
        {streaming ? "Streaming started" : "Start streaming"}
      </button>
      <video
        autoPlay
        playsInline
        muted
        style={{ width: "100%", marginTop: "20px" }}
        ref={(video) => {
          if (video && localStreamRef.current) {
            video.srcObject = localStreamRef.current;
          }
        }}
      />
    </div>
  );
}
