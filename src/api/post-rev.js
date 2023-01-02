import { db_handle_error, db_connect } from "#lib/db";
import REV from "#models/REV";
import { is_curator } from "#lib/user_checks";
import { BulgarianCitiesLatin, BulgarianCitiesCyrilic } from "#constants/cities";

export default async function (req, res) {
  try {
    await is_curator(req, res);
  } catch (e) {
    console.log(e);
    return;
  }

  if (
    !req.body.certificate_number ||
    !req.body.issued_on ||
    !req.body.valid_until ||
    !req.body.latin_name ||
    !req.body.cyrilic_name ||
    !req.body.latin_city ||
    !req.body.cyrilic_city
  ) {
    res.status(400).json({ error: "Непълна информация." });
    return;
  }

  if (new Date(req.body.issued_on) > new Date(req.body.valid_until)) {
    res.status(400).json({ error: "Невалидна дата." });
    return;
  }

  if (BulgarianCitiesLatin.indexOf(req.body.latin_city) === -1) {
    res.status(400).json({ error: "Невалиден град." });
    return;
  }

  if (BulgarianCitiesCyrilic.indexOf(req.body.cyrilic_city) === -1) {
    res.status(400).json({ error: "Невалиден град." });
    return;
  }

  try {
    await db_connect();

    await REV.create({
      certificate_number: req.body.certificate_number,
      issued_on: req.body.issued_on,
      valid_until: req.body.valid_until,
      latin_name: req.body.latin_name,
      cyrilic_name: req.body.cyrilic_name,
      latin_city: req.body.latin_city,
      cyrilic_city: req.body.cyrilic_city,
    });

    res.status(200).json({});
  } catch (e) {
    console.log(e);
    if (db_handle_error(e, res)) return;
  }
}
