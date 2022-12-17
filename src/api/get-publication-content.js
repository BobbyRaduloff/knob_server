import { db_handle_error, db_connect } from "#lib/db";
import PublicationContent from "#models/PublicationContent";

export default async function (req, res) {
  try {
    await db_connect();

    res.status(200).json({ results: await PublicationContent.find() });
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
