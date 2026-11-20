export const checkRole = async (req, res, next) => {
  const payloadId = req.user.id;
  const clientId = req.val.id;
  if (payloadId === clientId) {
    return next();
  }
  return res.status(403).json({
    message: "action or page not allowed",
  });
};
