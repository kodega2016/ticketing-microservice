import express from "express";
const router = express.Router();

router.post("/api/users/signup", (req, res) => {
  res.status(200).json({
    message: "signed up successfully",
    data: null,
  });
});

export { router as signupRouter };
