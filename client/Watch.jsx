import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import "./style.css";

export default function Watch() {
  const videoRef = useRef();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const video = videoRef.current;

    const hls = new Hls();
    hls.loadSource("http://localhost:8080/hls/stream.m3u8");
    hls.attachMedia(video);

    const ws = new WebSocket("ws://localhost:3001");

    ws.onmessage = (e) => {
      const d = JSON.parse(e.data);
      setMessages(prev => [...prev, d]);
    };

    return () => ws.close();
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0f0f0f" }}>

      {/* 動画 */}
      <div style={{ flex: 1 }}>
        <video
          ref={videoRef}
          controls
          autoPlay
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* チャット */}
      <div style={{
        width: 300,
        borderLeft: "1px solid #222",
        display: "flex",
        flexDirection: "column"
      }}>

        <div style={{ padding: 10, borderBottom: "1px solid #222" }}>
          💬 ライブチャット
        </div>

        <div style={{
          flex: 1,
          overflow: "auto",
          padding: 10
        }}>

          {messages.map((m, i) => (
            <div key={i} className="fade">
              <b style={{ color: "#3ea6ff" }}>{m.name}</b>: {m.text}
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}