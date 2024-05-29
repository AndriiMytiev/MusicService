export const validateLogin = (login: string) => {
  return String(login).match(/^[a-zA-Z0-9._-]{4,20}$/) ? null : "Invalid login";
};

export const validatePassword = (password: string) => {
  return String(password).match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    ? null
    : "Minimum 8 characters, at least 1 letter and 1 number";
};

export const validateNameSurname = (text: string) => {
  return String(text).match(/^[a-zA-Z]+$/)
    ? null
    : "Name and surname can only contain letters";
};
