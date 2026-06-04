// import React, { useEffect, useState } from "react";
// import "./Toast.css";

// export default function Toast({ message, visible, onClose }) {
//   const [animation, setAnimation] = useState("");

//   useEffect(() => {
//     if (visible) {
//       setAnimation("show");

//       const fadeOut = setTimeout(() => {
//         setAnimation("hide");
//       }, 2000); // stay visible for 2 sec

//       const reset = setTimeout(() => {
//         setAnimation("");
//         onClose(); // tell parent to hide
//       }, 2500); // after fade-out

//       return () => {
//         clearTimeout(fadeOut);
//         clearTimeout(reset);
//       };
//     }
//   }, [visible]);

//   return <div className={`toast-popup ${animation}`}>{message}</div>;
// }

import React, { useEffect, useState } from "react";
import "./Toast.css";

export default function Toast({ message, visible, onClose }) {
  const [animation, setAnimation] = useState("");

  useEffect(() => {
    if (!visible) return;

    setAnimation("show");

    const fadeOut = setTimeout(() => {
      setAnimation("hide");
    }, 2000);

    const reset = setTimeout(() => {
      setAnimation("");
      onClose();
    }, 2500);

    return () => {
      clearTimeout(fadeOut);
      clearTimeout(reset);
    };
  }, [visible, onClose]);

  return <div className={`toast-popup ${animation}`}>{message}</div>;
}
