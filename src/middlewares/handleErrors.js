require('express-async-errors');

function handleErrors(err, request, response, next) {
  if (err instanceof Error) {
    return response.status(400).json({ error: err.message });
  }
  return response
    .status(500)
    .json({ status: 'error', messgae: 'Internal server error' });
}

module.exports = handleErrors;
