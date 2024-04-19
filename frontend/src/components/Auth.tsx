import { SignupInput } from "@ankanpaul/medium-common"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Auth = ({type}: {type: "signup" | "signin"}) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: ""
  })

  async function sendRequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
      const jwt = response.data.token;
      localStorage.setItem('token', jwt);
      navigate("/blogs");
    }catch(e){
      alert("Error");
    }
  } 


  return <div className="h-screen flex justify-center flex-col ">
    <div className="flex justify-center text-center">
      <div>
        <div className="px-10">
          <div  className="text-4xl font-bold">
            Create an Account
          </div>
          <div>
            <div className="text-slate-500 mt-4 text-lg">
              {type === "signup" ? "Already have an account?" : "Don't have one?"} 
              <Link className="underline ml-2" to={type === "signup" ? "/signin" : "/signup"}> {type === "signup" ? "Login" : "SignUp"}</Link>
            </div>
          </div>
        </div>
        <div>
          {type ==="signup" ? <LabelledInput label="Name" placeholder="Jhon"  onChange={(e) => {
            setPostInputs({
              ...postInputs,
              name: e.target.value
            })
          }}/> : null }
          <LabelledInput label="Username" placeholder="jhondoe@gmail.com"  onChange={(e) => {
            setPostInputs({
              ...postInputs,
              username: e.target.value
            })
          }}/>
          <LabelledInput label="Password" type={"password"} placeholder="12345678"  onChange={(e) => {
            setPostInputs({
              ...postInputs,
              password: e.target.value
            })
          }}/>
          <button onClick={sendRequest} type="button" className="mt-7 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign Up" : "Sign In"}</button>

        </div>
      </div>
    </div>
  </div>
}

interface LabelledInputType {
  label : string,
  placeholder: string,
  onChange: (e :ChangeEvent<HTMLInputElement>) => void,
  type?: string

}

const LabelledInput = ({label, placeholder, onChange, type}: LabelledInputType) => {
  return <div>
  <label className="block mb-2 text-md font-semibold text-black text-left pt-2">{label}</label>
  <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
</div>
}