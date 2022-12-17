import { db_handle_error, db_connect } from "#lib/db";
import OSProtocol from "#models/OSProtocol";
import { is_curator } from "../lib/user_checks";

export default async function (req, res) {
  try {
    is_curator(req, res);
  } catch (e) {
    console.log(e);
    return;
  }

  try {
    await db_connect();

    const { id } = req.body;
    if (!id) {
      res.status(400).json({ error: "Моля предоставете ID!" });
      return;
    }

    await OSProtocol.deleteOne({ _id: id });
    res.status(200).json({});
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
