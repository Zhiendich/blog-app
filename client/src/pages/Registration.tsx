import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import Button from "../UI/Button/Button";
import TextField from "../UI/TextField/TextField";

const Registration = () => {
  const [email, setEmail] = useState("test@gmail.com");
  const [username, setUserName] = useState("Nikita");
  const [password, setPassword] = useState("123456");
  const { userRegister } = useActions();
  const registerHandler = () => {
    userRegister({ email, password, username });
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="p-5 bg-[#E5E5E5] rounded-2xl w-[500px] h-[400px] flex flex-col justify-between">
        <h1 className="text-center text-[30px]">Регистрация</h1>
        <div className="flex flex-wrap justify-between">
          <TextField
            value={email}
            setValue={setEmail}
            fieldName="Email"
            fieldType="text"
            key="Email"
          />
          <TextField
            value={username}
            setValue={setUserName}
            fieldName="Full Name"
            fieldType="text"
            key="Name"
          />
          <TextField
            value={password}
            setValue={setPassword}
            fieldName="Password"
            fieldType="password"
            key="Password"
          />
        </div>
        <p className="text-[18px] text-center mt-3">
          Вернуться на страницу
          <Link className="text-[blue] cursor-pointer ml-1" to={"/login"}>
            авторизации
          </Link>
        </p>
        <Button
          onClick={registerHandler}
          text="Авторизация"
          styles="w-full mx-auto"
        />
      </div>
    </div>
  );
};

export default Registration;
