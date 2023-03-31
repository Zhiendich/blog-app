import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className=" max-w-[1200px] px-5 mx-auto">
      <Header />
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
