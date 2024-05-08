import express from "express";
const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  res.status(200).json({
    message: "currentuser is fetched successfully",
    data: null,
  });
});

export { router as currentUserRouter };
