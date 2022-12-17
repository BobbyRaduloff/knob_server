import { db_handle_error, db_connect } from "#lib/db";
import MethodologyCommitteeMember from "#models/MethodologyCommitteeMember";
import { is_curator } from "#lib/user_checks";

export default async function (req, res) {
  try {
    await is_curator(req, res);
  } catch (e) {
    console.log(e);
    return;
  }

  if (!req.body.email || !req.body.full_name || !req.body.is_representative) {
    res.status(400).json({ error: "Непълна информация." });
    return;
  }

  try {
    await db_connect();

    await MethodologyCommitteeMember.create({
      email: req.body.email,
      full_name: req.body.full_name,
      is_representative: req.body.is_representative,
    });

    res.status(200).json({});
  } catch (e) {
    console.log(e);
    if (db_handle_error(e, res)) return;
  }
}
