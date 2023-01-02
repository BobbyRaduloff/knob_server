import { db_handle_error, db_connect } from "#lib/db";
import RegionalCommittee from "#models/RegionalCommittee";
import RegionalCommitteeMember from "#models/RegionalCommitteeMember";
import { is_curator } from "#lib/user_checks";
import { BulgarianCitiesLatin } from "#constants/cities";

export default async function (req, res) {
  try {
    await is_curator(req, res);
  } catch (e) {
    console.log(e);
    return;
  }

  if (!req.body.city || !req.body.email || !req.body.full_name || !req.body.is_representative) {
    res.status(400).json({ error: "Непълна информация." });
    return;
  }

  if (BulgarianCitiesLatin.indexOf(req.body.city) === -1) {
    res.status(400).json({ error: "Невалиден град." });
    return;
  }

  try {
    await db_connect();

    const x = await RegionalCommitteeMember.create({
      email: req.body.email,
      full_name: req.body.full_name,
      is_representative: req.body.is_representative,
    });

    await RegionalCommittee.findOneAndUpdate(
      { city: req.body.city },
      {
        $push: {
          members: x._id,
        },
      },
      { upsert: true }
    );

    res.status(200).json({});
  } catch (e) {
    console.log(e);
    if (db_handle_error(e, res)) return;
  }
}
