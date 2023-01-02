import { db_handle_error, db_connect } from "#lib/db";
import User from "#models/User";
import Certificate from "#models/Certificate";
import { BulgarianCitiesCyrilic } from "#constants/cities";
import { CertificateType } from "#constants/certificates";
import { is_admin } from "#lib/user_checks";

export default async function (req, res) {
  try {
    await is_admin(req, res);
  } catch (e) {
    console.log(e);
    return;
  }

  if (
    !req.body.first_name ||
    !req.body.middle_name ||
    !req.body.last_name ||
    !req.body.capacity ||
    !req.body.is_knob_member ||
    !req.body.city
  ) {
    res.status(400).json({ error: "Непълна информация." });
    return;
  }

  if (BulgarianCitiesCyrilic.indexOf(req.body.city) === -1) {
    res.status(400).json({ error: "Невалиден град." });
    return;
  }

  let user = {
    first_name: req.body.first_name,
    middle_name: req.body.middle_name,
    last_name: req.body.last_name,
    is_knob_member: req.body.is_knob_member,
    city: req.body.city,
  };

  let certificate_number = null;
  if (req.body.certificate_number) {
    certificate_number = req.body.certificate_number;
    if (!req.body.certificate_type || CertificateType.indexOf(req.body.certificate_type) == -1) {
      res.status(400).json({ error: "Непълна информация." });
      return;
    }
  }

  if (req.body.address) {
    user.address = req.body.address;
  }

  if (req.body.mobile_phone) {
    user.mobile_phone = req.body.mobile_phone;
  }

  if (req.body.landline) {
    user.landline = req.body.landline;
  }

  if (req.body.specialty) {
    user.specialty = req.body.specialty;
  }

  if (req.body.experience) {
    user.experience = req.body.experience;
  }

  if (req.body.education) {
    user.education = req.body.education;
  }

  try {
    await db_connect();

    const number = (await User.countDocuments()) + 1;
    user.number = number;
    user.type = "Guest";

    let capacity = [];
    req.body.capacity.forEach((c) => {
      capacity.push({ value: c });
    });
    user.capacity = capacity;

    const u = await User.create(user);

    let certificate = null;
    if (certificate_number) {
      const certificate_num = (await Certificate.countDocuments()) + 1;
      certificate = await Certificate.create({
        number: certificate_num,
        certificate_number: certificate_number,
        owner: u._id,
        owner_type: "User",
        is_valid: true,
        certificate_type: req.body.certificate_type,
      });

      await User.findOneAndUpdate({ _id: u._id }, { $set: { current_valid_certificate: certificate._id } });
    }

    res.status(200).json({});
  } catch (e) {
    console.log(e);
    if (db_handle_error(e, res)) return;
  }
}
