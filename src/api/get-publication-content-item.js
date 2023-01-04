import { db_handle_error, db_connect } from "#lib/db";
import PublicationContent from "#models/PublicationContent";

export default async function (req, res) {
  if (!req.query._id) {
    res.status(400).json({ error: "Въведете ID!" });
    return;
  }

  try {
    await db_connect();

    res
      .status(200)
      .json({ results: await PublicationContent.findOne({ _id: req.query._id }).populate("picture").populate("file") });
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
