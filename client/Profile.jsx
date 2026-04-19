import { useEffect, useState } from "react";

export default function Profile() {
  const username = "test";

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/user/${username}`)
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh" }}>

      <h1>{data.user.name}</h1>
      <p>@{data.user.username}</p>

      <h3>LIVE</h3>
      {data.streams.filter(s => s.is_live).map(s => (
        <div key={s.id}>
          <p>{s.title}</p>
        </div>
      ))}

      <h3>過去配信</h3>
      {data.streams.filter(s => !s.is_live).map(s => (
        <div key={s.id}>
          <p>{s.title}</p>
        </div>
      ))}

    </div>
  );
}