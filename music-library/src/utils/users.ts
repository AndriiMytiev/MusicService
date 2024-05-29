import { User } from "../types/user";

export const searchUsers = (users: User[], text: string) => {
  const searchText = text.toLowerCase(); // Перевести введений текст у нижній регістр для нормалізації порівнянь

  // Фільтруємо користувачів за збігами у імені, прізвищі та логіні
  return users.filter((user) => {
    const lowerCaseName = user.name?.toLowerCase() || "";
    const lowerCaseSurname = user.surname?.toLowerCase() || "";
    const lowerCaseLogin = user.login.toLowerCase();

    return (
      lowerCaseName.includes(searchText) ||
      lowerCaseSurname.includes(searchText) ||
      lowerCaseLogin.includes(searchText)
    );
  });
};
