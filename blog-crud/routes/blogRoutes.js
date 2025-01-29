const express = require("express");
const {
  getBlog,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const router = express.Router();
const auth = require("../middleware/auth");
router.get("/", auth, getBlogs);
router.get("/:id", auth, getBlog);
router.post("/", auth, createBlog);
router.put("/:id", auth, updateBlog);
router.delete("/:id", auth, deleteBlog);

module.exports = router;
