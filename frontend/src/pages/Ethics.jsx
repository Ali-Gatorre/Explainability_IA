import { useEffect, useState } from "react";
import api from "../api/api";

function Ethics() {
  const [fairness, setFairness] = useState(null);

  useEffect(() => {
    api.get("/insights/fairness")
      .then((res) => setFairness(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!fairness) {
    return <p>Loading ethics insights...</p>;
  }

  return (
    <div>
      <h1 style={{ color: "#111827" }}>Ethics & Fairness</h1>
      <p style={{ color: "#6b7280" }}>
        Prototype fairness analysis across sensitive groups.
      </p>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          marginTop: "24px",
        }}
      >
        <h2>Average predicted risk by sex</h2>
        <ul>
          {fairness.sex_gap.map((item, index) => (
            <li key={index}>
              {item.group}: {(item.avg_risk * 100).toFixed(1)}% ({item.count} employees)
            </li>
          ))}
        </ul>

        <h2>Average predicted risk by race group</h2>
        <ul>
          {fairness.race_gap.map((item, index) => (
            <li key={index}>
              {item.group}: {(item.avg_risk * 100).toFixed(1)}% ({item.count} employees)
            </li>
          ))}
        </ul>

        <p><strong>Comment:</strong> {fairness.summary.demographic_parity_comment}</p>
        <p><strong>Warning:</strong> {fairness.summary.warning}</p>
      </div>
    </div>
  );
}

export default Ethics;
