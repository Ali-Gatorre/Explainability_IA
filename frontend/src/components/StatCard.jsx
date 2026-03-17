function StatCard({ title, value }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        minHeight: "110px",
      }}
    >
      <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>{title}</p>
      <h2 style={{ marginTop: "12px", marginBottom: 0, color: "#111827" }}>{value}</h2>
    </div>
  );
}

export default StatCard;
