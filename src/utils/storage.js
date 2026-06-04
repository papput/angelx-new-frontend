// src/utils/storage.js
export const LS = {
  loggedIn: "angelx_logged_in",
  selectedMethod: "angelx_selected_method", // JSON string of selected bank method
};

export const saveSelectedMethod = (method) => {
  localStorage.setItem(LS.selectedMethod, JSON.stringify(method));
};

export const getSelectedMethod = () => {
  try {
    const s = localStorage.getItem(LS.selectedMethod);
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
};

export const clearSelectedMethod = () =>
  localStorage.removeItem(LS.selectedMethod);
