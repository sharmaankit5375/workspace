import { useState } from "react";
import { createUser, updateUser } from "../api/user.api";
import "../styles.css";

export default function UserModal({ user, onClose, onSaved }) {
  const [form, setForm] = useState(
    user || { name: "", email: "", address: "", phone: "" }
  );

  const save = async () => {
    if (user) {
      await updateUser(user._id, form);
    } else {
      await createUser(form);
    }
    onSaved();
    onClose();
  };

  return (
    <>
      <div className="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <form>
              <div className="modal-header">
                <h4 className="modal-title">
                  {user ? "Edit User" : "Add User"}
                </h4>
                <button type="button" onClick={onClose} className="close">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    value={form.name}
                    className="form-control"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    value={form.email}
                    className="form-control"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
                {!user && (
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                    />
                  </div>
                )}
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    className="form-control"
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button className="btn btn-success" onClick={save}>
                  {user ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
