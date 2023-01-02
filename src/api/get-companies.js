import { db_handle_error, db_connect } from "#lib/db";
import Company from "#models/Company";

export default async function (req, res) {
  try {
    await db_connect();

    if (req.body.name || req.body.city || req.body.certificate_number) {
      let query = {};
      if (req.body.name) query.name = req.body.name;
      if (req.body.city) query.city = req.body.city;

      let result = await Company.find(query)
        .populate("capacity")
        .populate("valuers")
        .populate("current_valid_certificate");

      if (req.body.certificate_number) {
        result = result.filter((x) => x.current_valid_certificate.certificate_number === req.body.certificate_number);
      }

      res.status(200).json({ results: result });
    } else {
      res.status(200).json({
        results: await Company.find().populate("capacity").populate("valuers").populate("current_valid_certificate"),
      });
    }
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
