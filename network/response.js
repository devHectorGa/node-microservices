const buildMessage = ({ status, body, error }) => ({
  status: status,
  body,
  error,
});

exports.success = function (req, res, body, status = 200) {
  const { status: statusCode, ...rest } = buildMessage({
    status,
    body,
  });
  res.status(statusCode).send({ status: statusCode, ...rest });
};

exports.error = function (
  req,
  res,
  body = 'Internal Server Error',
  status = 500
) {
  const { status: statusCode, ...rest } = buildMessage({
    status,
    body,
    error: true,
  });
  res.status(statusCode).send({ status: statusCode, ...rest });
};
