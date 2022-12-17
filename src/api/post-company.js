import { db_handle_error, db_connect } from "#lib/db";
import Company from "#models/Company";
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

  if (!req.body.name || !req.body.capacity || !req.body.is_knob_member || !req.body.city) {
    res.status(400).json({ error: "Непълна информация." });
    return;
  }

  if (BulgarianCitiesCyrilic.indexOf(req.body.city) === -1) {
    res.status(400).json({ error: "Невалиден град." });
    return;
  }

  let company = {
    name: req.body.name,
    capacity: req.body.capacity,
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
    company.address = req.body.address;
  }

  if (req.body.mobile_phone) {
    company.mobile_phone = req.body.mobile_phone;
  }

  if (req.body.landline) {
    company.landline = req.body.landline;
  }

  if (req.body.specialty) {
    company.specialty = req.body.specialty;
  }

  if (req.body.eik) {
    company.eik = req.body.eik;
  }

  if (req.body.valuers) {
    company.valuers = req.body.valuers;
  }

  try {
    await db_connect();

    for (let i = 0; i < company.valuers.length; i++) {
      const valuer = await User.findOne({ id: company.valuer[i]._id });
      if (!valuer) {
        res.status(400).json({ error: "Невалиден оценител." });
        return;
      }
    }

    const number = (await Company.countDocuments()) + 1;
    company.number = number;

    const c = await Company.create(company);

    let certificate = null;
    if (certificate_number) {
      const certificate_num = (await Certificate.countDocuments()) + 1;
      certificate = await Certificate.create({
        number: certificate_num,
        owner: c._id,
        owner_type: "Company",
        is_valid: true,
        certificate_type: req.body.certificate_type,
      });

      await Company.findOneAndUpdate({ _id: c._id }, { $set: { current_valid_certificate: certificate._id } });
    }

    res.status(200).json({});
  } catch (e) {
    console.log(e);
    if (db_handle_error(e, res)) return;
  }
}
