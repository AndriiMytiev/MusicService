import { makeAutoObservable } from "mobx";
import RootStore from "..";
import axios, { AxiosError } from "axios";
import { Music, MusicCreate } from "../../types/music";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../firebase";

export default class MusicStore {
  rootStore: RootStore;

  music: Music[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setMusic = (music: Music[]) => {
    this.music = music;
  };

  getMusic = async () => {
    try {
      const response = await axios.get(
        `${this.rootStore.globalStore.serverUrl}/api/music`,
      );
      this.setMusic(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error fetching music:", axiosError.message);
    }
  };

  getMusicByID = async (musicId: number): Promise<Music | null> => {
    try {
      const response = await axios.get(
        `${this.rootStore.globalStore.serverUrl}/api/music/${musicId}`,
      );
      return response.data as Music; // Повертаємо конкретного користувача
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error fetching user:", axiosError.message);
      return null; // Повертаємо null у разі помилки
    }
  };

  processMusicCreating = async (musicData: MusicCreate) => {
    try {
      const response = await axios.post(
        `${this.rootStore.globalStore.serverUrl}/api/music`,
        musicData,
      );

      if (!response.data) {
        throw new Error("Failed to add new music");
      }

      console.log("Added new music:", response.data);
      this.getMusic();
      return true;
    } catch (error) {
      console.error("Error adding new music:", error);
      return false;
    }
  };

  processMusicEditing = async (music: Music) => {
    try {
      // Ваш запит PUT для оновлення користувача
      const response = await axios.put(
        `${this.rootStore.globalStore.serverUrl}/api/music`,
        music,
      );

      // Опціонально, обробляйте відповідь від сервера
      console.log("Updated music:", response.data);
      this.getMusic();
      return true;
    } catch (error) {
      // Обробка помилок
      console.error("Error updating music:", error);
      return false;
    }
  };

  processMusicDeleting = async (music: Music) => {
    const musicRef = ref(storage, `music/${music.fileName}`);
    try {
      const response = await axios.delete(
        `${this.rootStore.globalStore.serverUrl}/api/music/${music.id}`,
      );
      console.log("Delete music:", response.data);
      deleteObject(musicRef)
        .then(() => {
          console.log("Delete music from FirebaseStorage: ", music.fileName);
        })
        .catch((error) => {
          console.error(error);
        });
      this.getMusic();
    } catch (error) {
      console.error("Error deleting music:", error);
    }
  };
}
