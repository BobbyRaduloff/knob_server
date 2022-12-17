import { db_handle_error, db_connect } from "#lib/db";
import User from "#models/User";
import { validate_token } from "#lib/token";

export default async function (req, res) {
  try {
    await db_connect();

    const auth_header = req.headers.authorization;
    const token = auth_header && auth_header.split(" ")[1];

    if (token === null) {
      res.status(200).json({ result: false });
      return;
    }

    let email;
    try {
      email = validate_token(token);
    } catch {
      res.status(200).json({ result: false });
      return;
    }

    const user = await User.findOne({ email });
    if (!user || (user.type !== "Curator" && user.type !== "Admin")) {
      res.status(200).json({ result: false });
      return;
    }

    res.status(200).json({ result: true });
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
