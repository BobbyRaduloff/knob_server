import { db_handle_error, db_connect } from "#lib/db";
import SeminarItem from "#models/SeminarItem";
import { is_curator } from "../lib/user_checks";

export default async function (req, res) {
  try {
    await is_curator(req, res);
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

    await SeminarItem.deleteOne({ _id: id });
    res.status(200).json({});
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
