const Blog = require("../models/Blog");

exports.getBlogs = async (req, res) => {
  try {
    const { search, page = 1, limit = 6 } = req.query;
    
    const searchQuery = search ? { title: { $regex: search, $options: 'i' } } : {}; 
    const skip = (page - 1) * limit;
    
    const blogs = await Blog.find(searchQuery)
      .skip(skip)
      .limit(parseInt(limit))
      .exec();

    const totalBlogs = await Blog.countDocuments(searchQuery); 

    const totalPages = Math.ceil(totalBlogs / limit);

    res.status(200).json({
      blogs,
      totalBlogs,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};



exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "blog non trouvé" });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};


exports.createBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBlog)
      return res.status(404).json({ message: "Blog non trouvé" });
    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog)
      return res.status(404).json({ message: "Blog non trouvé" });
    res.status(200).json({ message: "Blog supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
