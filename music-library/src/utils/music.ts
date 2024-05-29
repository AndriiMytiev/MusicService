import {
  getDownloadURL,
  StorageReference,
  ref,
  uploadBytes,
} from "firebase/storage";
import { Music } from "../types/music";
import { storage } from "../firebase";

export const getMusicUrl = async (musicRef: StorageReference) => {
  try {
    return await getDownloadURL(musicRef);
  } catch (error) {
    console.error(error);
  }
};

export const searchMusic = (musicList: Music[], text: string) => {
  const searchText = text.toLowerCase();

  // Фільтруємо користувачів за збігами у імені, прізвищі та логіні, а також у масиві tags
  return musicList.filter((music) => {
    const lowerCaseTitle = music.title?.toLowerCase() || "";
    const lowerCaseAuthor = music.author?.toLowerCase() || "";

    // Перевірка для title та author
    const titleMatch = lowerCaseTitle.includes(searchText);
    const authorMatch = lowerCaseAuthor.includes(searchText);

    // Перевірка для tags
    const tagsMatch = music.tags?.some((tag) =>
      tag.toLowerCase().includes(searchText),
    );

    // Повертаємо true, якщо хоча б один з умов виконано
    return titleMatch || authorMatch || tagsMatch;
  });
};

export const uploadFile = async (file: File) => {
  if (file) {
    const storageRef = ref(storage, `music/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      console.log("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Check the console for details.");
    }
  } else {
    console.log("Please provide a valid file to upload.");
  }
};
