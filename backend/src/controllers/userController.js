const getProfile = (req, res) => {
  res.status(200).json({
    message: "Protected Route Accessed Successfully",
    user: req.user,
  });
};

// Admin Dashboard
const adminDashboard = (req, res) => {
  res.status(200).json({
    message: "Welcome Admin 🎉",
    user: req.user,
  });
};

module.exports = {
  getProfile,
  adminDashboard,
};