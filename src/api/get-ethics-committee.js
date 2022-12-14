import { db_handle_error, db_connect } from "#lib/db";
import EthicsCommitteeMember from "#models/EthicsCommitteeMember";

export default async function (req, res) {
  try {
    await db_connect();

    res.status(200).json({ results: await EthicsCommitteeMember.find() });
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
