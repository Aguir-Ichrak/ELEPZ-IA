import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import "./BlogForm.css";
import { useNavigate } from "react-router-dom";
import { createNewBlog } from "../../redux/slices/blogsSlice";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Header from "../Header";
const categories = [
  { value: "scientific", label: "Scientific" },
  { value: "it", label: "IT" },
];

export default function BlogForm() {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    category: "",
    image: null,
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      category: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleQuillChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      content: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.content ||
      !formData.tags ||
      !formData.category
    ) {
      notif({ type: "error", msg: "All fields are required." });
      return;
    }

    try {
      const res = await dispatch(createNewBlog(formData));
      if (res.succes) {
        notif({ msg: "Blog added successfully!" });
        navigate("/");
      } else {
        notif({ type: "error", msg: res.msg });
      }
    } catch (err) {
      notif({ type: "error", msg: "Error creating blog" });
    }
  };

  const navigate = useNavigate();


  return (
    <div>
    <div className="bg-gray-800 flex flex-col justify-center h-full pt-2">
            <Header />
      <form
        className="mb-6 mt-6 max-w-[400px] mx-auto rounded-lg bg-gray-900 p-8 px-10 lg:w-1/3 3xs:w-2/3"
        onSubmit={onSubmit}
      >
        <h2 className="text-4xl font-bold mb-6 text-white text-center">
          Create New Blog
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            className="w-full bg-gray-700 text-white p-3 border rounded-lg border-gray-300"
            value={formData.title}
            name="title"
            type="text"
            placeholder="Enter blog title"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Content
          </label>
          <div className="bg-gray-700 text-white">
            <ReactQuill
              theme="snow"
              value={formData.content}
              placeholder="Add your blog content here..."
              onChange={handleQuillChange}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Tags</label>
          <input
            className="w-full p-3 bg-gray-700 text-white border rounded-lg border-gray-300"
            name="tags"
            type="text"
            value={formData.tags}
            placeholder="Enter tags"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <Select
            options={categories}
            value={categories.find(
              (category) => category.value === formData.category
            )}
            onChange={handleSelectChange}
            placeholder="Select a category"
            className="basic-single bg-gray-700 border rounded-lg"
            classNamePrefix="select"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Image Upload
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-3 border rounded-lg bg-gray-700 text-white"
            onChange={handleImageUpload}
          />
          {imagePreview && (
            <div className="mt-4 w-1/5">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-w-xs rounded-lg shadow-md"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-300 hover:bg-green-300 font-semibold text-white py-3 rounded-lg hover:bg-blue-600"
        >
          ADD
        </button>
        <ToastContainer />
      </form>
    </div>
    </div>
  );
}
