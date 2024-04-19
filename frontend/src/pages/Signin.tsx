import { Navigate } from "react-router-dom";
import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"
import { UseUser } from "../hooks";
import { Spinner } from "../components/Spinner";

export const Signin = () => {
  const user = UseUser();
  if(user.loading){
    return <Spinner />
  }

  if(user.detais){
    return <Navigate to={"/blogs"} />
  }
  return <div>
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <Auth type="signin" />
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
    
  </div>
}