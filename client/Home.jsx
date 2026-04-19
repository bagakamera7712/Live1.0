import { useEffect, useState } from "react";
import "./style.css";

export default function Home() {
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/streams")
      .then(res => res.json())
      .then(setStreams);

    const ws = new WebSocket("ws://localhost:3001");

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.type === "NEW_STREAM") {
        setStreams(prev => [data.stream, ...prev]);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div>

      {/* ヘッダー */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 15,
        borderBottom: "1px solid #222",
        background: "#0f0f0f"
      }}>
        <h2>▶ ライブ配信</h2>

        <button
          style={{
            background: "red",
            border: "none",
            padding: "8px 12px",
            color: "white",
            borderRadius: 6
          }}
          onClick={() => window.location.href = "/streamer"}
        >
          ➕ 配信する
        </button>
      </div>

      {/* グリッド */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: 15,
        padding: 15
      }}>

        {streams.map(s => (
          <div key={s.id} className="card fade">

            <div style={{ position: "relative" }}>
              <img
                src={s.thumbnail}
                style={{ width: "100%", height: 140, objectFit: "cover" }}
              />

              {s.is_live && (
                <div className="live">LIVE</div>
              )}
            </div>

            <div style={{ padding: 10 }}>
              <h4>{s.title}</h4>
              <p style={{ fontSize: 12, color: "#aaa" }}>
                👀 {s.viewer_count}
              </p>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}