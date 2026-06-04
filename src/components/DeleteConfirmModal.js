// // src/components/DeleteConfirmModal.jsx
// import React, { useEffect, useState } from "react";
// import "./DeleteConfirmModal.css";

// export default function DeleteConfirmModal({
//   open,
//   onClose,
//   onConfirm,
//   accountNo,
// }) {
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     if (open) {
//       setShow(false);
//       // small delay so we can animate scale in
//       const id = setTimeout(() => setShow(true), 20);
//       return () => clearTimeout(id);
//     } else {
//       setShow(false);
//     }
//   }, [open]);

//   if (!open) return null;

//   return (
//     <div className="dc-overlay" onClick={onClose}>
//       <div
//         className={`dc-card ${show ? "in" : ""}`}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="dc-icon">i</div>
//         <h3 className="dc-title">Kind tips</h3>
//         <p className="dc-text">
//           Confirm deletion {accountNo}?
//         </p>

//         <button className="dc-btn primary" onClick={onConfirm}>
//           Confirm
//         </button>
//         <button className="dc-btn" onClick={onClose}>
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }








// src/components/ConfirmModal.jsx
import React, { useEffect, useState } from "react";
import "./DeleteConfirmModal.css";

export default function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
  message = "Are you confirm sign out?",
  confirmText = "Confirm",
  cancelText = "Cancel",
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (open) {
      setShow(false);
      const id = setTimeout(() => setShow(true), 20);
      return () => clearTimeout(id);
    } else {
      setShow(false);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-box ${show ? "in" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="modal-text">{message}</p>

        <div className="modal-actions">
          <button className="btn cancel_btn" onClick={onClose}>
            {cancelText}
          </button>
          <button className="btn confirm_btn" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
