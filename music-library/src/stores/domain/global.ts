import { makeAutoObservable } from "mobx";
import RootStore from "..";
import { User } from "../../types/user";

export default class GlobalStore {
  rootStore: RootStore;

  // serverUrl: string =
  //   "https://musiclibrary-database-131675906386.herokuapp.com";
  serverUrl: string = "http://localhost:8080";

  currentUser: User | null = null;

  isEditPageAvailable: boolean = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setCurrentUser = (user: User | null) => {
    this.currentUser = user;
  };

  setIsEditPageAvailable = (isAvailable: boolean) => {
    this.isEditPageAvailable = isAvailable;
  };
}
