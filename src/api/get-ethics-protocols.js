import { db_handle_error, db_connect } from "#lib/db";
import EthicsProtocol from "#models/EthicsProtocol";
import { is_logged_in } from "#lib/user_checks";

export default async function (req, res) {
  try {
    await is_logged_in(req, res);
  } catch (e) {
    console.log(e);
    return;
  }

  try {
    await db_connect();

    res.status(200).json({ results: await EthicsProtocol.find().populate("picture").populate("file") });
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
