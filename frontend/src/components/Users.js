import { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser
} from "../api/user.api";

export default function Users() {
  const [users, setUsers] = useState([]);

  const load = () => {
    getUsers().then(res => setUsers(res.data));
  };

  useEffect(load, []);

  const remove = async (id) => {
    await deleteUser(id);
    load();
  };

  return (
    <div>
      <h3>Users</h3>
      {users.map(u => (
        <div key={u._id}>
          {u.email} ({u.role})
          <button onClick={() => remove(u._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
