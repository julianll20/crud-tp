export const isGoodPassword = value => {
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/;
    return regex.test(value);
  };

  const password = "MyPassword123";
  if (isGoodPassword(password)) {
    console.log("The password is valid.");
  } else {
    console.log("The password is invalid.");
  }
