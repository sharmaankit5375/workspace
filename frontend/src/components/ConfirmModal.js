import "../styles.css";

export default function ConfirmModal({ onCancel, onConfirm }) {
  return (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <form>
            <div className="modal-header">
              <h4 className="modal-title">Delete User</h4>
              <button type="button" className="close" onClick={onCancel}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p
                className="alert alert-warning"
                style={{ display: "inline-flex", alignItems: "flex-start" }}
              >
                <i class="material-icons" style={{ marginRight: 5 }}>
                  warning
                </i>
                Are you sure you want to delete these Record(s)? You won't be
                able to revert this action.
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button onClick={onConfirm} className="btn btn-danger">
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
