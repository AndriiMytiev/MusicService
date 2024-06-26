import { makeAutoObservable } from "mobx";
import RootStore from "..";
import { User } from "../../types/user";
import axios, { AxiosError } from "axios";

export default class UsersStore {
  rootStore: RootStore;

  users: User[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setUsers = (users: User[]) => {
    this.users = users;
  };

  getUsers = async () => {
    try {
      const response = await axios.get(
        `${this.rootStore.globalStore.serverUrl}/api/users`,
      );
      this.setUsers(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error fetching users:", axiosError.message);
    }
  };

  getUserByID = async (userId: number): Promise<User | null> => {
    try {
      const response = await axios.get(
        `${this.rootStore.globalStore.serverUrl}/api/users/${userId}`,
      );
      return response.data as User;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error fetching user:", axiosError.message);
      return null;
    }
  };

  processUserEditing = async (user: User) => {
    try {
      const response = await axios.put(
        `${this.rootStore.globalStore.serverUrl}/api/users`,
        user,
      );

      console.log("Updated user:", response.data);
      return true;
    } catch (error) {
      console.error("Error updating user:", error);
      return false;
    }
  };

  processUserDeleting = async (id: number) => {
    try {
      const responseUser = await axios.delete(
        `${this.rootStore.globalStore.serverUrl}/api/users/${id}`,
      );

      console.log("Delete user:", responseUser.data);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  processFavouritesEditing = async (user: User, newFavorites: number[]) => {
    try {
      const updatedUser: User = {
        id: user.id,
        login: user.login,
        password: user.password,
        name: user.name,
        surname: user.surname,
        info: user.info,
        favorites: newFavorites,
        admin: user.admin,
      };
      const response = await axios.put(
        `${this.rootStore.globalStore.serverUrl}/api/users`,
        updatedUser,
      );
      console.log("Updated user:", response.data);
      this.rootStore.globalStore.setCurrentUser(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      return false;
    }
    return true;
  };

  toggleFav = (musicId: number) => {
    const user = this.rootStore.globalStore.currentUser;
    const favourites = user?.favorites;
    if (favourites) {
      if (favourites?.includes(musicId)) {
        const newFavourites = favourites?.filter((fav) => fav !== musicId);
        user && this.processFavouritesEditing(user, newFavourites);
      } else {
        const newFavourites = [...favourites, musicId];
        user && this.processFavouritesEditing(user, newFavourites);
      }
    }
  };
}
