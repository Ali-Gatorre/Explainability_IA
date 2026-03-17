import { Link } from "react-router-dom";

function Navbar() {
  const navStyle = {
    backgroundColor: "#111827",
    padding: "16px 24px",
    color: "white",
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const linksStyle = {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/" style={{ ...linkStyle, fontSize: "20px", fontWeight: "700" }}>
          Explainability IA
        </Link>

        <div style={linksStyle}>
          <Link to="/" style={linkStyle}>Dashboard</Link>
          <Link to="/ethics" style={linkStyle}>Ethics</Link>
          <Link to="/frugality" style={linkStyle}>Frugality</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
