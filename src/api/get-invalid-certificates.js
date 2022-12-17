import { db_handle_error, db_connect } from "#lib/db";
import Certificate from "#models/Certificate";

export default async function (req, res) {
  if (!req.body.owner_type || (req.body.owner_type !== "User" && req.body.owner_type !== "Company")) {
    res.status(400).json({ error: "Невалиден тип на собственик на сертификата." });
    return;
  }

  try {
    await db_connect();

    req.body.is_valid = false;
    res.status(200).json({ results: await Certificate.find({ ...req.body }) });
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
