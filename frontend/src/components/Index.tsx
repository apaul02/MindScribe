import { Navigate } from "react-router-dom";
import { UseUser } from "../hooks"
import { Spinner } from "./Spinner";

export const Index = () => {
  const user = UseUser();

  if(user.loading) {
    return <Spinner />
  }
  if(!user.detais){
    return <Navigate to={"/signin"} />
  }
  return <Navigate to={"/blogs"} />
}