import { hash, genSalt } from "bcrypt";

async function generatePassword(password) {
  const salt = await genSalt(10);
  const newPassword = await hash(password, salt);
  return newPassword;
}
export default generatePassword;
