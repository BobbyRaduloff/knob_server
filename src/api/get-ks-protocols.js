import { db_handle_error, db_connect } from "#lib/db";
import KSProtocol from "#models/KSProtocol";
import { is_logged_in } from "#lib/user_checks";

export default async function (req, res) {
  try {
    is_logged_in(req, res);
  } catch (e) {
    console.log(e);
    return;
  }

  try {
    await db_connect();

    res.status(200).json({ results: await KSProtocol.find() });
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
