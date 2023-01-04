import { db_handle_error, db_connect } from "#lib/db";
import EuropeanStandard from "#models/EuropeanStandard";

export default async function (req, res) {
  try {
    await db_connect();

    res.status(200).json({ results: await EuropeanStandard.find().populate("files") });
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
