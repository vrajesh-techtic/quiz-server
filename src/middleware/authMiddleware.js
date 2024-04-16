const handleErrors = (errors) => {
  let errorMsg = "";

  if (errors.code === 11000) {
    errorMsg = "User already exists!";
  } else {
    errorMsg = errors.details[0].message;
  }

  return errorMsg;
};

module.exports = { handleErrors };
