import User from "#models/User";
import { db_connect, db_handle_error } from "#lib/db";
import * as bcrypt from "bcryptjs";
import { generate_token } from "#lib/token";

export default async function (req, res) {
  try {
    await db_connect();

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      res.status(401).json({ error: "Invalid email or password!" });
      return;
    }

    const token = generate_token(email);
    res.status(200).json({ token });
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
