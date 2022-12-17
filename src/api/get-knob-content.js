import { db_handle_error, db_connect } from "#lib/db";
import KNOBContent from "#models/KNOBContent";

export default async function (req, res) {
  try {
    await db_connect();

    res.status(200).json({ results: await KNOBContent.find() });
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
