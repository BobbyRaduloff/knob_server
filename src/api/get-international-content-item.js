import { db_handle_error, db_connect } from "#lib/db";
import InternationalContent from "#models/InternationalContent";

export default async function (req, res) {
  if (!req.body._id) {
    res.status(400).json({ error: "Въведете ID!" });
    return;
  }

  try {
    await db_connect();

    res.status(200).json({ results: await InternationalContent.findOne({ _id: req.body.id }) });
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
