import { Navigate } from "react-router-dom";
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { UseUser, useBlogs } from "../hooks"
import { Spinner } from "../components/Spinner";

export const Blogs = () => {
  const {blogs, loading} = useBlogs();
  const user = UseUser();
  if(user.loading){
    return <Spinner />
  }

  if(!user.detais){
    return <Navigate to={"/signin"} />
  }

  if(loading){
    return <div>
      <Appbar /> 
      <div className="flex justify-center">
        <div>
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
        </div>
      </div>
    </div>
  }
  return<div>
    <Appbar />
    <div className="flex justify-center"> 
      <div>
        {blogs.map(blog => <BlogCard authorName={blog.author.name || "User"}
          id={blog.id}
          title={blog.title}
          content={blog.content}
          published={"24 Feb 2024"}
        /> )}
      </div>
    </div>
  </div>
}