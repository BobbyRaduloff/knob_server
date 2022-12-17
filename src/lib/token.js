import jwt from "jsonwebtoken";

export function generate_token(email) {
  return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: 44640000 });
}

export function validate_token(token) {
  try {
    return jwt.verify(token, process.env.TOKEN_SECRET).email;
  } catch (e) {
    return null;
  }
}
