import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import RootStore, { RootStoreContext } from "./stores";
import { MainPage } from "./pages/MainPage";
import { Header } from "./components/Common/Header/Header";
import { CurrentUserPage } from "./pages/CurrentUserPage";
import { UserEditPage } from "./pages/UserEditPage";
import { UsersListPage } from "./pages/UsersListPage";
import { UserLibraryPage } from "./pages/UserLibraryPage";
import { UserFavoritesPage } from "./pages/UserFavoritesPage";
import { UserPage } from "./pages/UserPage";
import { ToTopButton } from "./components/Common/ToTopButton/ToTopButton";
import { MusicEditPage } from "./pages/MusicEditPage";
import { MusicAddPage } from "./pages/MusicAddPage";

function App() {
  const rootStore = new RootStore();

  return (
    <RootStoreContext.Provider value={rootStore}>
      <div className="App">
        <Header />
        <ToTopButton />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/user-library" element={<UserLibraryPage />} />
          <Route path="/user-library/add-music" element={<MusicAddPage />} />
          <Route path="/favorites" element={<UserFavoritesPage />} />
          <Route path="/profile" element={<CurrentUserPage />} />
          <Route path="/users" element={<UsersListPage />} />
          <Route path="/users/edit/:id" element={<UserEditPage />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/edit-music/:id" element={<MusicEditPage />} />
          <Route path="*" element={<MainPage />} />
        </Routes>
      </div>
    </RootStoreContext.Provider>
  );
}

export default App;
