import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useActions } from "./hooks/useActions";
import { useTypedSelector } from "./hooks/useTypedSelector";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MakePost from "./components/MakePost";
import Registration from "./pages/Registration";
import { selectUser } from "./store/selectors/userSelector";
import { IUser } from "./types/user";
import PostList from "./components/PostList";
import PostPage from "./pages/PostPage";
import Profile from "./pages/Profile";

function App() {
  const { isUserAuth } = useActions();
  const [user, setUser] = React.useState<IUser | null | undefined>(null);
  const currentUser = useTypedSelector(selectUser);
  React.useEffect(() => {
    if (window.localStorage.getItem("token")) {
      isUserAuth();
    }
  }, []);
  React.useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  return (
    <Routes>
      <Route
        path="/*"
        element={window.localStorage.getItem("token") ? <Home /> : <Login />}
      >
        <Route path="" element={<PostList />} />
        <Route path="makePost" element={<MakePost />}>
          <Route path=":id" element={<MakePost />} />
        </Route>
        <Route path="profile" element={<Profile />} />
        <Route path="post/:id" element={<PostPage />} />
      </Route>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/registration"
        element={user ? <Navigate to="/" replace /> : <Registration />}
      />
    </Routes>
  );
}

export default App;
