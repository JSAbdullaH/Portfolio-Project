import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { getToken, getUser, clearSession, type StoredUser } from "../lib/auth";

export default function Welcome() {
  const navigate = useNavigate();
  const [user, setUser] = useState<StoredUser | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      navigate("/signin", { replace: true });
      return;
    }
    setUser(getUser());
    setChecked(true);
  }, [navigate]);

  if (!checked) return null;

  return (
    <main className="s14-screen" style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/"><Logo size={36} /></Link>
        <button
          className="s14-textlink"
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14 }}
          onClick={() => { clearSession(); navigate("/", { replace: true }); }}
        >
          Sign out
        </button>
      </div>

      <div className="s14-welcome">
        <h1>welcome!<br />but….</h1>
        <h2>developers at work :)</h2>

        {user && (
          <div className="s14-welcome-meta">
            <span>Signed in as <b>{user.full_name}</b></span>
            <span><b>{user.email}</b></span>
            <span>Role <b>{user.role}</b></span>
          </div>
        )}
      </div>
    </main>
  );
}