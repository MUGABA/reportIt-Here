import { hash, genSalt } from "bcrypt";

async function generatePassword(data) {
  const salt = await genSalt(10);
  const newPassword = await hash(data.password, salt);
  return newPassword;
}
export default generatePassword;
