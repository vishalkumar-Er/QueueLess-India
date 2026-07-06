const getProfile = (req, res) => {
  res.status(200).json({
    message: "Protected Route Accessed Successfully",
    user: req.user,
  });
};

module.exports = {
  getProfile,
};