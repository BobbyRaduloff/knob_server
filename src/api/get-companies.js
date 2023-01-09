import { db_handle_error, db_connect } from "#lib/db";
import Company from "#models/Company";

export default async function (req, res) {
  try {
    await db_connect();

    if (req.query.name || req.query.city || req.query.certificate_number) {
      let query = {};
      if (req.query.name) query.name = req.query.name;
      if (req.query.city) query.city = req.query.city;

      let result = await Company.find(query)
        .populate("capacity")
        .populate("valuers")
        .populate("current_valid_certificate");

      if (req.query.certificate_number) {
        result = result.filter((x) => x.current_valid_certificate.certificate_number === req.query.certificate_number);
      }

      res.status(200).json({ results: result });
    } else {
      res.status(200).json({
        results: await Company.find()
          .populate("capacity")
          .populate("valuers")
          .populate("current_valid_certificate")
          .populate({
            path: "valuers",
            populate: {
              path: "current_valid_certificate",
            },
          })
          .populate({
            path: "valuers",
            populate: {
              path: "invalid_certificates",
            },
          }),
      });
    }
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
