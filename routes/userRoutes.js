const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

//localhost:3000/
router
  .route("/")
  .post(authController.signUp);

// router
//   .route("/:id")
//   .get(postController.getOnePost)
//   .patch(postController.updatePost)
//   .delete(postController.deletePost);

module.exports = router;
