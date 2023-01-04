import { db_handle_error, db_connect } from "#lib/db";
import LiteratureContent from "#models/LiteratureContent";

export default async function (req, res) {
  try {
    await db_connect();

    res.status(200).json({ results: await LiteratureContent.find().populate("picture").populate("file") });
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
