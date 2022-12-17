import { db_handle_error, db_connect } from "#lib/db";
import Company from "#models/Company";

export default async function (req, res) {
  try {
    await db_connect();

    if (req.body.name) {
      req.body.name = req.body.name.toUpperCase();
    }

    res.status(200).json({ results: await Company.find({ ...req.body }) });
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
