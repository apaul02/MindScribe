import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog {
  title: string,
  content: string,
  id: number,
  author:{
    name: string
  }
}

export const useBlog = ({ id }: { id: string}) => {
  const [loader, setLoader] = useState(true);
  const [blog, setBlog] = useState<Blog>({
    title: "None",
    content: "None",
   id: 1,
   author : {
    name: "None"
   } 
  });

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{

      headers : {
        Authorization : localStorage.getItem("token")
      }
    })
      .then(response => {
        setBlog(response.data.blog);
        setLoader(false);
      } )
  }, [])
  return {
    loader,
    blog
  }
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{

      headers : {
        Authorization : localStorage.getItem("token")
      }
    })
      .then(response => {
        setBlogs(response.data.blogs);
        setLoading(false);
      } )
  }, [])
  return {
    loading,
    blogs
  }
}

export const UseUser = () => {
  const [loading, setLoading] = useState(true);
  const [detais, setDetails] = useState(null);
  async function getDetails() {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
        headers: {
          Authorization : localStorage.getItem("token")
        }
      })
      setDetails(res.data.userDetails.username)
    }catch(e) {
      console.error(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    getDetails()
  }, [])
  return {
    loading,
    detais
  }
}