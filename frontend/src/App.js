import { useState } from "react";
import { getToken } from "./auth/auth.service";
import Login from "./components/Login";
import UserList from "./components/UserList";

export default function App() {
  const [refresh, setRefresh] = useState(0);
  const token = getToken();
  return (
    <>
      {!token && <Login onLogin={() => setRefresh((r) => r + 1)} />}
      {token && (
        <>
          <UserList key={refresh} />
        </>
      )}
    </>
  );
}
