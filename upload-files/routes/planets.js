const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
  uploadImage
} = require("../controllers/planets");

router.get("/", getAll);
router.get("/:id", getOneById);
router.post("/", create);
router.put("/:id", updateById);
router.delete("/:id", deleteById);
router.post("/:id/image", upload.single("image"), uploadImage);

module.exports = router;