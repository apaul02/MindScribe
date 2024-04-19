import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { UseUser } from "../hooks"
import { Spinner } from "../components/Spinner"

export const Publish = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const user = UseUser();
  if(user.loading){
    return <Spinner />
  }

  if(!user.detais){
    return <Navigate to={"/signin"} />
  }
  return <div>
    <Appbar />
    <div className="flex justify-center pt-8 "> 
      <div className="max-w-screen-lg w-full"> 
        <input onChange={(e) => {
          setTitle(e.target.value);
        }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title"></input>
        <TextEditor onChange={(e) => {
          setContent(e.target.value);
        }} />
          <button onClick={async () => {
           const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                title,
                content
              }, {
                headers : {
                  Authorization : localStorage.getItem("token")
                }
              });
          navigate(`/blog/${response.data.id}`)
        }} type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
            Publish post
        </button>
      </div>
      
    </div>
  </div>
}

function TextEditor ({onChange}: {onChange: (e :ChangeEvent<HTMLTextAreaElement>) => void}) {
  return <div>
     <div className="w-full mb-4">
         <div className="flex items-center justify-between py-2">
         <div className=" py-2 bg-white rounded-b-lg w-full">
             <label className="sr-only">Publish post</label>
             <textarea onChange={onChange} id="editor" rows={8} className=" rounded-lg block w-full px-0 text-sm text-gray-800 bg-white border focus:ring-0 px-2 py-2" placeholder="Write an article..." required ></textarea>
         </div>
     </div>
    </div>
  </div>
  
}