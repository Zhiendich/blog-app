import { useNavigate } from "react-router-dom";
import { IPost } from "../types/post";
import Button from "../UI/Button/Button";

const SidePostInfo = ({ img, id, title }: IPost) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col mb-8">
      <img
        src={img ? `${process.env.REACT_APP_API_URL_IMG}/${img}` : ""}
        alt=""
        className="max-w-[350px] w-[350px] max-h-[350px]"
      />
      <h1 className="text-[30px] font-bold mb-3">{title}</h1>
      <Button text="Подробнее" onClick={() => navigate(`/post/${id}`)} />
    </div>
  );
};

export default SidePostInfo;
