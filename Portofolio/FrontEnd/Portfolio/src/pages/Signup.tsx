import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo, { LogoMarkLight } from "../components/Logo";
import { register } from "../lib/api";
import { saveSession } from "../lib/auth";

export default function Signup() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const result = await register({
        company_name: companyName,
        full_name: fullName,
        email,
        password,
      });
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
          <h1>Create your account</h1>

          <form onSubmit={handleSubmit}>
            <Field id="company_name" label="COMPANY NAME" value={companyName}
                   onChange={setCompanyName} placeholder="Alrajhi Contracting" />
            <Field id="full_name" label="YOUR NAME" value={fullName}
                   onChange={setFullName} placeholder="Laila Khalid" />
            <Field id="email" label="EMAIL" type="email" value={email}
                   onChange={setEmail} placeholder="laila@site14.sa" />
            <Field id="password" label="PASSWORD" type="password" value={password}
                   onChange={setPassword} placeholder="At least 8 characters" />

            {error && <p className="s14-error">{error}</p>}

            <div className="s14-form-foot">
              <button type="submit" disabled={busy} className="s14-btn s14-btn-block">
                {busy ? "Creating…" : "Continue"}
              </button>
              <p className="s14-alt">
                Already registered? <Link to="/signin" className="s14-signal-link">Sign in</Link>
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

function Field(props: {
  id: string; label: string; value: string;
  onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div className="s14-field">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type={props.type ?? "text"}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        required
      />
    </div>
  );
}
