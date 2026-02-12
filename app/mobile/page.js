// mobile

"use client";

import { useRef, useState } from "react";

export default function MobilePage() {
  const pcRef = useRef(new RTCPeerConnection());
  const [connected, setConnected] = useState(false);
  const videoRef = useRef(null);

  const connectToPC = async () => {
    const sdpString = prompt("Paste the offer from the PC:");
    if (!sdpString) return;

    const data = JSON.parse(sdpString);
    await pcRef.current.setRemoteDescription(data.sdp);

    pcRef.current.ondatachannel = (event) => {
      const dc = event.channel;
      dc.onmessage = async (msg) => {
        const data = JSON.parse(msg.data);
        if (data.candidate) {
          await pcRef.current.addIceCandidate(
            new RTCIceCandidate(data.candidate)
          );
        }
      };
    };

    pcRef.current.ontrack = (event) => {
      if (videoRef.current) {
        videoRef.current.srcObject = event.streams[0];
      }
    };

    const answer = await pcRef.current.createAnswer();
    await pcRef.current.setLocalDescription(answer);

    alert(
      "Copy this answer and paste it on the PC page:\n\n" +
        JSON.stringify({ sdp: pcRef.current.localDescription })
    );

    setConnected(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mobile - Screen Receiver</h1>
      <button onClick={connectToPC}>
        {connected ? "Connected" : "Connect to PC"}
      </button>
      <video
        autoPlay
        playsInline
        style={{ width: "100%", marginTop: "20px" }}
        ref={videoRef}
      />
    </div>
  );
}      if (e.candidate) console.log(JSON.stringify({ candidate: e.candidate }));
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
