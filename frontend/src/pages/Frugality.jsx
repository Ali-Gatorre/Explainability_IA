import { useEffect, useState } from "react";
import api from "../api/api";

function Frugality() {
  const [models, setModels] = useState([]);

  useEffect(() => {
    api.get("/insights/frugality")
      .then((res) => setModels(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1 style={{ color: "#111827" }}>Frugality Analysis</h1>
      <p style={{ color: "#6b7280" }}>
        Comparison of model performance, explainability, and estimated energy cost.
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
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
              <th style={{ padding: "12px" }}>Model</th>
              <th style={{ padding: "12px" }}>F1-score</th>
              <th style={{ padding: "12px" }}>Accuracy</th>
              <th style={{ padding: "12px" }}>Training Time</th>
              <th style={{ padding: "12px" }}>Energy Cost</th>
              <th style={{ padding: "12px" }}>Explainability</th>
              <th style={{ padding: "12px" }}>Recommended</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "12px" }}>{model.model}</td>
                <td style={{ padding: "12px" }}>{model.f1_score}</td>
                <td style={{ padding: "12px" }}>{model.accuracy}</td>
                <td style={{ padding: "12px" }}>{model.training_time_seconds}s</td>
                <td style={{ padding: "12px" }}>{model.estimated_energy_cost}</td>
                <td style={{ padding: "12px" }}>{model.explainability_score}/5</td>
                <td style={{ padding: "12px" }}>{model.recommended ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Frugality;
