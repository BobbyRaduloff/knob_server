import { db_handle_error, db_connect } from "#lib/db";
import SeminarItem from "#models/SeminarItem";

export default async function (req, res) {
  try {
    await db_connect();

    res.status(200).json({ results: await SeminarItem.find().populate("picture").populate("files") });
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
