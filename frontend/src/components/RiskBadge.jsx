function RiskBadge({ label }) {
  let bg = "#d1fae5";
  let color = "#065f46";

  if (label === "Medium") {
    bg = "#fef3c7";
    color = "#92400e";
  }

  if (label === "High") {
    bg = "#fee2e2";
    color = "#991b1b";
  }

  return (
    <span
      style={{
        backgroundColor: bg,
        color: color,
        padding: "6px 12px",
        borderRadius: "999px",
        fontSize: "13px",
        fontWeight: "600",
      }}
    >
      {label}
    </span>
  );
}

export default RiskBadge;
