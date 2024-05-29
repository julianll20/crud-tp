export const isGoodPassword = value => {
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/;
    return regex.test(value);
  };

  const password = "MyPassword123";
  if (isGoodPassword(password)) {
    console.log("La contraseña es valida.");
  } else {
    console.log(".");
  }
