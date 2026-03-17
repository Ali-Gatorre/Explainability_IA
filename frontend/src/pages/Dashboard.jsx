import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import StatCard from "../components/StatCard";
import RiskBadge from "../components/RiskBadge";
import AddEmployeeForm from "../components/AddEmployeeForm";

function Dashboard() {
  const [overview, setOverview] = useState(null);
  const [employees, setEmployees] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedRisk, setSelectedRisk] = useState("All");
  const [sortBy, setSortBy] = useState("risk_desc");

  async function loadDashboardData() {
    try {
      const overviewRes = await api.get("/insights/overview");
      const employeesRes = await api.get("/employees");

      setOverview(overviewRes.data);
      setEmployees(employeesRes.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function handleDeleteEmployee(employeeId, employeeName) {
    const confirmed = window.confirm(`Delete ${employeeName}?`);
    if (!confirmed) return;

    try {
      await api.delete(`/employees/${employeeId}`);
      await loadDashboardData();
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee.");
    }
  }

  const departments = useMemo(() => {
    const uniqueDepartments = [...new Set(employees.map((emp) => emp.department))];
    return ["All", ...uniqueDepartments];
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    let data = [...employees];

    if (searchTerm.trim() !== "") {
      const query = searchTerm.toLowerCase();
      data = data.filter((emp) =>
        emp.name.toLowerCase().includes(query) ||
        emp.department.toLowerCase().includes(query) ||
        emp.position.toLowerCase().includes(query)
      );
    }

    if (selectedDepartment !== "All") {
      data = data.filter((emp) => emp.department === selectedDepartment);
    }

    if (selectedRisk !== "All") {
      data = data.filter((emp) => emp.risk_label === selectedRisk);
    }

    switch (sortBy) {
      case "name_asc":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        data.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "risk_asc":
        data.sort((a, b) => a.risk_score - b.risk_score);
        break;
      case "risk_desc":
        data.sort((a, b) => b.risk_score - a.risk_score);
        break;
      case "tenure_asc":
        data.sort((a, b) => a.years_at_company - b.years_at_company);
        break;
      case "tenure_desc":
        data.sort((a, b) => b.years_at_company - a.years_at_company);
        break;
      default:
        break;
    }

    return data;
  }, [employees, searchTerm, selectedDepartment, selectedRisk, sortBy]);

  if (!overview) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div>
      <h1 style={{ color: "#111827", marginBottom: "8px" }}>RH Dashboard</h1>
      <p style={{ color: "#6b7280", marginTop: 0 }}>
        Explainable turnover analysis for HR decision support.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginTop: "24px",
          marginBottom: "32px",
        }}
      >
        <StatCard title="Total Employees" value={overview.total_employees} />
        <StatCard title="Turnover Rate" value={`${(overview.turnover_rate * 100).toFixed(1)}%`} />
        <StatCard title="Average Risk" value={`${(overview.average_risk_score * 100).toFixed(1)}%`} />
        <StatCard title="Average Salary" value={`${Math.round(overview.average_salary).toLocaleString()} €`} />
      </div>

      <AddEmployeeForm onEmployeeAdded={loadDashboardData} />

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          marginBottom: "24px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Filters & Search</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          <input
            type="text"
            placeholder="Search by name, department or position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "12px 14px",
              borderRadius: "12px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
              outline: "none",
            }}
          />

          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            style={{
              padding: "12px 14px",
              borderRadius: "12px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
            }}
          >
            {departments.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>

          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            style={{
              padding: "12px 14px",
              borderRadius: "12px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
            }}
          >
            <option value="All">All Risks</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: "12px 14px",
              borderRadius: "12px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
            }}
          >
            <option value="risk_desc">Highest risk first</option>
            <option value="risk_asc">Lowest risk first</option>
            <option value="tenure_desc">Most senior first</option>
            <option value="tenure_asc">Least senior first</option>
            <option value="name_asc">Name A → Z</option>
            <option value="name_desc">Name Z → A</option>
          </select>
        </div>

        <div
          style={{
            marginTop: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          <span>{filteredEmployees.length} employee(s) displayed</span>

          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedDepartment("All");
              setSelectedRisk("All");
              setSortBy("risk_desc");
            }}
            style={{
              backgroundColor: "#111827",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "10px 14px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Reset filters
          </button>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <h2 style={{ margin: 0 }}>Employees</h2>
          <span style={{ color: "#6b7280", fontSize: "14px" }}>
            Sorted by: {sortBy.replace("_", " ")}
          </span>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
              <th style={{ padding: "12px" }}>ID</th>
              <th style={{ padding: "12px" }}>Name</th>
              <th style={{ padding: "12px" }}>Department</th>
              <th style={{ padding: "12px" }}>Position</th>
              <th style={{ padding: "12px" }}>Tenure</th>
              <th style={{ padding: "12px" }}>Risk</th>
              <th style={{ padding: "12px" }}>Score</th>
              <th style={{ padding: "12px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.employee_id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "12px" }}>{emp.employee_id}</td>
                <td style={{ padding: "12px", fontWeight: "500" }}>{emp.name}</td>
                <td style={{ padding: "12px" }}>{emp.department}</td>
                <td style={{ padding: "12px" }}>{emp.position}</td>
                <td style={{ padding: "12px" }}>{emp.years_at_company} yrs</td>
                <td style={{ padding: "12px" }}>
                  <RiskBadge label={emp.risk_label} />
                </td>
                <td style={{ padding: "12px" }}>{(emp.risk_score * 100).toFixed(1)}%</td>
                <td style={{ padding: "12px" }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <Link
                      to={`/employee/${emp.employee_id}`}
                      style={{
                        textDecoration: "none",
                        color: "#2563eb",
                        fontWeight: "600",
                      }}
                    >
                      View
                    </Link>

                    <button
                      onClick={() => handleDeleteEmployee(emp.employee_id, emp.name)}
                      style={{
                        backgroundColor: "#fee2e2",
                        color: "#991b1b",
                        border: "none",
                        borderRadius: "8px",
                        padding: "8px 10px",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredEmployees.length === 0 && (
          <p style={{ marginTop: "20px", color: "#6b7280" }}>
            No employees match the selected filters.
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
