import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import RiskBadge from "../components/RiskBadge";

function EmployeeDetail() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    api.get(`/employees/${id}`)
      .then((res) => setEmployee(res.data))
      .catch((err) => console.error(err));

    api.get(`/employees/${id}/predict`)
      .then((res) => setPrediction(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!employee || !prediction) {
    return <p>Loading employee...</p>;
  }

  return (
    <div>
      <h1 style={{ color: "#111827" }}>{employee.name}</h1>
      <p style={{ color: "#6b7280" }}>
        {employee.position} · {employee.department}
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
        <h2 style={{ marginTop: 0 }}>Prediction</h2>
        <p>
          <strong>Risk score:</strong> {(prediction.risk_score * 100).toFixed(1)}%
        </p>
        <p>
          <strong>Risk level:</strong> <RiskBadge label={prediction.risk_label} />
        </p>
        <p>
          <strong>Recommendation:</strong> {prediction.recommendation}
        </p>

        <h3>Top explanatory factors</h3>
        <ul>
          {prediction.top_factors.map((factor, index) => (
            <li key={index}>{factor}</li>
          ))}
        </ul>
      </div>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          marginTop: "24px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Employee profile</h2>
        <p><strong>Age:</strong> {employee.age}</p>
        <p><strong>Salary:</strong> {employee.salary.toLocaleString()} €</p>
        <p><strong>Satisfaction:</strong> {employee.satisfaction_score}</p>
        <p><strong>Engagement:</strong> {employee.engagement_score}</p>
        <p><strong>Absences:</strong> {employee.absences}</p>
        <p><strong>Years at company:</strong> {employee.years_at_company}</p>
        <p><strong>Performance:</strong> {employee.performance_score}</p>
      </div>
    </div>
  );
}

export default EmployeeDetail;
