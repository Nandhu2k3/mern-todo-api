const allowedFields = ["task", "done", "inProgress", "deadline", "userId"];

module.exports = function validateTodoPayload(req, res, next) {
  const invalidFields = Object.keys(req.body).filter(
    (key) => !allowedFields.includes(key)
  );

  if (invalidFields.length > 0) {
    return res.status(400).json({
      error: `Invalid fields in request: ${invalidFields.join(", ")}`,
    });
  }

  next();
};
