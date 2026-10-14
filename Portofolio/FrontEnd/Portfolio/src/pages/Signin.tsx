import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo, { LogoMarkLight } from "../components/Logo";
import { login } from "../lib/api";
import { saveSession } from "../lib/auth";

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const result = await login({ email, password });
      saveSession(result.access_token, result.user);
      navigate("/welcome");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="s14-screen">
      <Link to="/"><Logo size={36} /></Link>

      <div className="s14-split">
        <section className="s14-panel-light">
          <h1>Sign in</h1>

          <form onSubmit={handleSubmit}>
            <div className="s14-field">
              <label htmlFor="email">EMAIL</label>
              <input
                id="email" type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="laila@site14.sa"
              />
            </div>

            <div className="s14-field">
              <label htmlFor="password">PASSWORD</label>
              <input
                id="password" type="password" required value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
              />
              <Link to="/forgot" className="s14-signal-link"
                    style={{ display: "inline-block", marginTop: 12 }}>
                Forgot your password?
              </Link>
            </div>

            {error && <p className="s14-error">{error}</p>}

            <div className="s14-form-foot">
              <button type="submit" disabled={busy}
                      className="s14-btn s14-btn-block">
                {busy ? "Signing in…" : "Continue"}
              </button>
              <p className="s14-alt">
                No account yet? <Link to="/signup" className="s14-signal-link">Sign up</Link>
              </p>
            </div>
          </form>
        </section>

        <aside className="s14-panel-dark">
          <LogoMarkLight size={56} />
          <h2>One record.<br /><em>Every shift.</em></h2>
          <p>Attendance, zones and hours, captured as they happen.</p>
          <div className="s14-panel-foot">FIELD OPERATIONS RECORD</div>
        </aside>
      </div>
    </main>
  );
}