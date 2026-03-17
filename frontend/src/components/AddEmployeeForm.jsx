import { useState } from "react";
import api from "../api/api";

function AddEmployeeForm({ onEmployeeAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    department: "IT",
    position: "",
    age: 25,
    salary: 40000,
    satisfaction_score: 3,
    engagement_score: 3,
    absences: 0,
    years_at_company: 1,
    performance_score: "Medium",
    sex: "M",
    race: "Group A",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        ["age", "salary", "satisfaction_score", "engagement_score", "absences", "years_at_company"].includes(name)
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/employees", formData);
      await onEmployeeAdded(response.data);

      setFormData({
        name: "",
        department: "IT",
        position: "",
        age: 25,
        salary: 40000,
        satisfaction_score: 3,
        engagement_score: 3,
        absences: 0,
        years_at_company: 1,
        performance_score: "Medium",
        sex: "M",
        race: "Group A",
      });

      setIsOpen(false);
    } catch (error) {
      console.error("Error creating employee:", error);
      alert("Failed to add employee.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginBottom: "24px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <div>
          <h2 style={{ margin: 0, color: "#111827" }}>Employee Management</h2>
          <p style={{ margin: "6px 0 0 0", color: "#6b7280", fontSize: "14px" }}>
            Add a new employee. Risk level is automatically estimated by the prediction engine.
          </p>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            backgroundColor: "#111827",
            color: "white",
            border: "none",
            borderRadius: "12px",
            padding: "12px 18px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          {isOpen ? "Close form" : "Add Employee"}
        </button>
      </div>

      {isOpen && (
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "24px",
            marginTop: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "18px",
            }}
          >
            <Field label="Full name">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </Field>

            <Field label="Position">
              <input
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </Field>

            <Field label="Department">
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
                <option value="Marketing">Marketing</option>
              </select>
            </Field>

            <Field label="Age">
              <input
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </Field>

            <Field label="Salary (€)">
              <input
                name="salary"
                type="number"
                value={formData.salary}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </Field>

            <Field label="Absences">
              <input
                name="absences"
                type="number"
                value={formData.absences}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </Field>

            <Field label="Years at company">
              <input
                name="years_at_company"
                type="number"
                step="0.1"
                value={formData.years_at_company}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </Field>

            <Field label="Satisfaction score (1 to 5)">
              <input
                name="satisfaction_score"
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={formData.satisfaction_score}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </Field>

            <Field label="Engagement score (1 to 5)">
              <input
                name="engagement_score"
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={formData.engagement_score}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </Field>

            <Field label="Performance score">
              <select
                name="performance_score"
                value={formData.performance_score}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </Field>

            <Field label="Sex">
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="M">M</option>
                <option value="F">F</option>
              </select>
            </Field>

            <Field label="Race group">
              <select
                name="race"
                value={formData.race}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="Group A">Group A</option>
                <option value="Group B">Group B</option>
                <option value="Group C">Group C</option>
              </select>
            </Field>
          </div>

          <div style={{ marginTop: "22px", display: "flex", gap: "12px" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "12px 18px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {loading ? "Adding..." : "Submit employee"}
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{
                backgroundColor: "#e5e7eb",
                color: "#111827",
                border: "none",
                borderRadius: "12px",
                padding: "12px 18px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <span style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>
        {label}
      </span>
      {children}
    </label>
  );
}

const inputStyle = {
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  outline: "none",
  backgroundColor: "white",
};

export default AddEmployeeForm;
