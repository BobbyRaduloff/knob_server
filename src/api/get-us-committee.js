import { db_handle_error, db_connect } from "#lib/db";
import USCommitteeMember from "#models/USCommitteeMember";

export default async function (req, res) {
  try {
    await db_connect();

    res.status(200).json({ results: await USCommitteeMember.find() });
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
