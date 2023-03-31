import React from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { uploadImage } from "../services/upload";
import { selectUser } from "../store/selectors/userSelector";
import { IUser } from "../types/user";
import Button from "../UI/Button/Button";

const Profile = () => {
  const user = useTypedSelector(selectUser);
  const file = React.useRef<File | null>(null);
  const { updateUser } = useActions();
  const updateAvatarHandler = () => {
    if (user) {
      const updatedUser: IUser = {
        email: user.email,
        password: user.password,
        username: user.username,
        id: user.id,
      };
      if (file.current) {
        updatedUser.avatar = file.current.name;
        const formData = new FormData();
        formData.append("file", file.current);
        formData.append("name", file.current.name);
        uploadImage(formData);
        updateUser(updatedUser);
        file.current = null;
      }
    }
  };
  const uploadFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      file.current = e.target.files[0];
    }
  };
  return (
    <div>
      <div className="mb-3 d-flex">
        <img
          src={
            user?.avatar
              ? `${process.env.REACT_APP_API_URL_IMG}/${user?.avatar}`
              : `${process.env.REACT_APP_API_URL_IMG}/istockphoto-519078727-612x612.jpg`
          }
          alt=""
          className="w-[80px] h-[80px] rounded-full"
        />
        <h1 className="text-[25px] font-bold">{user?.username}</h1>
      </div>
      <label htmlFor="avatar">
        <div className="mb-3 font-semibold text-[18px]">Загрузить картинку</div>
        <Button text="Изменить аватар" onClick={updateAvatarHandler} />
        <input
          className="hidden"
          type="file"
          id="avatar"
          onChange={uploadFileHandler}
        />
      </label>
    </div>
  );
};

export default Profile;
