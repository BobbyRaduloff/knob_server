import { db_handle_error, db_connect } from "#lib/db";
import User from "#models/User";

export default async function (req, res) {
  try {
    await db_connect();

    if (req.body.full_name) {
      const cap = (x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();

      const s = req.body.full_name.split(" ");
      req.body.first_name = cap(s[0]);
      req.body.middle_name = cap(s[1]);
      req.body.last_name = cap(s[2]);
    }

    res.status(200).json({ results: await User.find({ ...req.body }) });
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
