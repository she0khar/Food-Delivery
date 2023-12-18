const checkData = (email, password) => {
  const validEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email);
  const validPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
    password
  );
  if (!validEmail) return "Enter valid Email Id";
  if (!validPass) return "Enter valid Password";

  return null;
};
export default checkData;
