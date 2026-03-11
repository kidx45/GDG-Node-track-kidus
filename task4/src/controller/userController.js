export const getUserProfile = (req, res) => {
  const user = req.user;
  res.json({
    success: true,
    message: "User profile retrieved successfully",
    data: {
      id: user._id,
      name: user.full_name,
      email: user.email,
    },
  });
};
