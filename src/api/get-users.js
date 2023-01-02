import { db_handle_error, db_connect } from "#lib/db";
import User from "#models/User";

export default async function (req, res) {
  try {
    await db_connect();

    if (req.body.name || req.body.city || req.body.certificate_number) {
      const cap = (x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();

      const s = req.body.full_name.split(" ");
      req.body.first_name = cap(s[0]);
      req.body.middle_name = cap(s[1]);
      req.body.last_name = cap(s[2]);

      let query = {};
      if (req.body.name) query.name = req.body.name;
      if (req.body.city) query.city = req.body.city;
    } else {
      res.status(200).json({
        results: await User.find().populate("invalid_certificates").populate("current_valid_certificate"),
      });
    }

    res.status(200).json({ results: await User.find({ ...req.body }) });
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}

// export default async function (req, res) {
//   try {
//     await db_connect();

//     if (req.body.name || req.body.city || req.body.certificate_number) {

//       let result = await Company.find(query)
//         .populate("capacity")
//         .populate("valuers")
//         .populate("current_valid_certificate");

//       if (req.body.certificate_number) {
//         result = result.filter((x) => x.current_valid_certificate.certificate_number === req.body.certificate_number);
//       }

//       res.status(200).json({ results: result });
//     } else {
//       res.status(200).json({
//         results: await Company.find().populate("capacity").populate("valuers").populate("current_valid_certificate"),
//       });
//     }
//   } catch (e) {
//     if (db_handle_error(e, res)) return;
//   }
// }
