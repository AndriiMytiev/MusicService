import { createContext } from "react";
import AuthStore from "./domain/auth";
import GlobalStore from "./domain/global";
import UsersStore from "./domain/users";
import MusicStore from "./domain/music";

export default class RootStore {
  globalStore = new GlobalStore(this);
  authStore = new AuthStore(this);
  usersStore = new UsersStore(this);
  musicStore = new MusicStore(this);
}

export const RootStoreContext = createContext<RootStore>({} as RootStore);
