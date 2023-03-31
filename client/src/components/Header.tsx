import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { categories } from "../data/categories";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { selectUser } from "../store/selectors/userSelector";
import { UserActionTypes } from "../types/user";
import Button from "../UI/Button/Button";

const Header = () => {
  const user = useTypedSelector(selectUser);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch({ type: UserActionTypes.USER_LOG_OUT });
    window.localStorage.removeItem("token");
  };
  const navigate = useNavigate();

  return (
    <div className="flex justify-between mt-4">
      <Link to="/" className="font-bold text-[25px]">
        Blog App
      </Link>
      <div className="flex items-center justify-between w-[80%]">
        <Button onClick={() => navigate("/makePost")} text="Написать статью" />
        <nav className="text-[18px] uppercase">
          {categories.map((c) => (
            <Link key={c.title} className="mx-[8px]" to={c.link}>
              {c.title}
            </Link>
          ))}
        </nav>
        <div className="flex items-center">
          <Link to="/profile" className="text-[18px] uppercase font-bold mx-2">
            {user?.username}
          </Link>
          <Button onClick={logoutHandler} text="Выйти" />
        </div>
      </div>
    </div>
  );
};

export default Header;
