import { Navigate, useParams } from "react-router-dom";
import { Fullblog } from "../components/Fullblog"
import { UseUser, useBlog } from "../hooks"
import { Spinner } from "../components/Spinner";
import { Appbar } from "../components/Appbar";

export const Blog = () => {

  const { id } = useParams();
  const { loader, blog } = useBlog({
    id: id || ""
  });
  const user = UseUser()
  if(user.loading){
    return <Spinner />
  }
  if(!user.detais){
    return <Navigate to={"/signin"} />
  }

  if(loader){
    return<div>
      <Appbar />
      <div className=" h-screen flex flex-col justify-center">
        <div className="flex justify-center">
          <Spinner />
        </div>
      </div>
    </div>
  }
  return <div>
    <Fullblog blog={blog} />
  </div>
}