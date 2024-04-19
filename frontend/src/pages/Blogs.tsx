import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = () => {
  const {blogs, loading} = useBlogs();

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