export const read = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const write = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    return;
  }
};
