export default function NetworkError(e) {
  const info = errorInfo(e);
  const error = new Error(info.message);
  error.status = info.status;
  error.message = info.error || info.message;
  error.details = info.details || info.response;
  return error;
}

function errorInfo(err) {
  // console.log("NetworkError errorInfo: err:\n", err.response.body);
  // return err && err.response && err.response.body || err;

  return err.response && err.response.body && typeof err.response.body.status === 'number' && err.response.body ||
    err.response && typeof err.response.status === 'number' && err.response ||
    typeof err.status === 'status' && err;
}