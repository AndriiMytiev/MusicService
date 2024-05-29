import { makeAutoObservable } from "mobx";
import RootStore from "..";
import { AuthPageState } from "../../types/authPage";
import { User } from "../../types/user";
import axios, { AxiosError } from "axios";

export default class AuthStore {
  rootStore: RootStore;
  login: string = "";
  password: string = "";

  state: AuthPageState = "login";
  loginError: boolean = false;
  registrationError: boolean = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setLogin = (value: string) => {
    this.login = value;
  };

  setPassword = (value: string) => {
    this.password = value;
  };

  setLoginError = (error: boolean) => {
    this.loginError = error;
  };

  processLogin = () => {
    let tempUser: User | null = null;
    try {
      this.rootStore.usersStore.users.forEach((user) => {
        if (this.login === user?.login && this.password === user.password) {
          tempUser = user;
        }
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Login error:", axiosError.message);
    }
    if (tempUser) {
      this.rootStore.globalStore.currentUser = tempUser;
      this.setLogin("");
      this.setPassword("");
      this.setLoginError(false);
    } else {
      this.setLoginError(true);
      console.log("user not found");
    }
  };

  processRegistration = async () => {
    try {
      const userExists = this.rootStore.usersStore.users.some(
        (user) => user.login === this.login,
      );

      if (!userExists) {
        this.registrationError = false;
        const response = await axios.post(
          `${this.rootStore.globalStore.serverUrl}/api/user`,
          {
            login: this.login,
            password: this.password,
            admin: false,
          },
        );

        await this.rootStore.usersStore.getUsers();
        this.rootStore.globalStore.setCurrentUser(response.data);
        this.setLogin("");
        this.setPassword("");
        console.log("New user registered:", response.data);
      } else {
        this.registrationError = true;
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  setAuthPageStateToRegistration = () => {
    this.state = "registration";
  };

  setAuthPageStateToLogin = () => {
    this.state = "login";
  };
}
