import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api/user.api";
import UserModal from "./UserModal";
import ConfirmModal from "./ConfirmModal";
import "../styles.css";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const confirmDelete = async () => {
    await Promise.all(selected.map((id) => deleteUser(id)));
    setSelected([]);
    setShowDelete(false);
    loadUsers();
  };

  return (
    <>
      <div className="container">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2>
                  Manage <b>Users</b>
                </h2>
              </div>
              <div className="col-sm-6">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    setEditUser(null);
                    setShowForm(true);
                  }}
                >
                  <i className="material-icons">&#xE147;</i>
                  <span>Add New User</span>
                </button>
                <button
                  className="btn btn-danger"
                  disabled={!selected.length}
                  onClick={() => setShowDelete(true)}
                >
                  <i className="material-icons">&#xE15C;</i> <span>Delete</span>
                </button>
              </div>
            </div>
          </div>

          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      setSelected(
                        e.target.checked ? users.map((u) => u._id) : []
                      )
                    }
                  />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(u._id)}
                      onChange={() => toggleSelect(u._id)}
                    />
                  </td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.address}</td>
                  <td>{u.phone}</td>
                  <td>
                    <div
                      style={{ display: "inline-flex", alignItems: "center" }}
                    >
                      <div style={{ marginRight: "5px" }}>
                        <button
                          onClick={() => {
                            setEditUser(u);
                            setShowForm(true);
                          }}
                          className="btn btn-primary btn-sm"
                        >
                          <i className="material-icons" title="Edit">
                            edit
                          </i>
                        </button>
                      </div>
                      <div style={{ marginRight: "5px" }}>
                        <button
                          onClick={() => {
                            setSelected([u._id]);
                            setShowDelete(true);
                          }}
                          className="btn btn-danger btn-sm"
                        >
                          <i className="material-icons" title="Delete">
                            delete
                          </i>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showForm && (
        <UserModal
          user={editUser}
          onClose={() => setShowForm(false)}
          onSaved={loadUsers}
        />
      )}

      {showDelete && (
        <ConfirmModal
          onCancel={() => setShowDelete(false)}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
}
