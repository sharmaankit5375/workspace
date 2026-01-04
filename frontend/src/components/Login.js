import { useState } from "react";
import { login } from "../api/auth.api";
import { setToken } from "../auth/auth.service";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (onLogin) => {
    const res = await login({ email, password });
    setToken(res.data.accessToken);
    onLogin();
  };

  return (
    <>
      <div className="container">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2>
                  <b>Sign In</b>
                </h2>
              </div>
            </div>
          </div>
          <div style={{ width: 300 }}>
            <div className="form-group">
              <label>Email</label>
              <input
                value={email}
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => submit(onLogin)}>
            Login
          </button>
        </div>
      </div>
    </>
  );
}
