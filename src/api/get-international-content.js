import { db_handle_error, db_connect } from "#lib/db";
import InternationalContent from "#models/InternationalContent";

export default async function (req, res) {
  try {
    await db_connect();

    res.status(200).json({ results: await InternationalContent.find() });
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
