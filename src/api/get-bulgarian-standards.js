import { db_handle_error, db_connect } from "#lib/db";
import BulgarianStandard from "#models/BulgarianStandard";

export default async function (req, res) {
  try {
    await db_connect();

    res.status(200).json({ results: await BulgarianStandard.find().populate("files") });
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
