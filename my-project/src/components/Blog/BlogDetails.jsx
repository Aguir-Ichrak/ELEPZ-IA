import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from "../../redux/slices/blogsSlice";
import { IconButton } from "@material-tailwind/react";
import Header from "../Header";
import { removeBlog } from "../../redux/slices/blogsSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blogs.selectedBlog); 
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getById(id)); 
    }
  }, [id, dispatch]);

  if (!blog) {
    return <p>Loading blog details...</p>;
  }
   const notif = (data) => {
      toast[data.type || "success"](data.msg || "", {
        position: data.position || "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: data.position || "colored",
      });
    };
  const handelDelete= async()=>{
    try {    
          const res = await dispatch(removeBlog(id));
          if (res.succes) {
            notif({ msg: "Blog deleted successfully!" });
            navigate("/");
          } else {
            notif({ type: "error", msg: res.msg });
          }
        } catch (err) {
          notif({ type: "error", msg: "Error deleting blog" });
        }
  }
  return (
    <div> 
       <Header/>
       <section className="py-16 h-full w-full content-center">
      <div className="container mx-auto grid gap-y-10 gap-x-6 items-center md:grid-cols-2 grid-cols-1">
        <div className="h-full w-full max-h-[30rem] border border-surface rounded-lg">
          <img
            alt={blog?.title}
            src={blog?.image || "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"}
            className="w-auto mx-auto h-full"
          />
        </div>
        <div className="md:p-2">
          <p className="text-4xl font-bold">{blog?.title}</p>
          <p className="text-2xl my-3">{blog?.category}</p>
          <p className="text-xl my-3">{blog?.tags}</p>
          <p className="text-foreground [text-wrap:_balance]"><span
            dangerouslySetInnerHTML={{
              __html: blog?.content,
            }}
          /></p>
          <div className="mt-6 flex items-center gap-2">
            <IconButton
              variant="outlined"
              className="rounded-full text-blue-900 border-blue-900"
            >
              <i className="fas fa-pen" />
            </IconButton>
            <IconButton
              variant="outlined"
              className="rounded-full text-red-400 border-red-400"
              onClick={handelDelete}
            >
              <i className="fas fa-trash-alt" />
            </IconButton>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section></div>
  
  );
};

export default BlogDetails;
