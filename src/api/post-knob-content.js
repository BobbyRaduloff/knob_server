import { db_handle_error, db_connect } from "#lib/db";
import KNOBContent from "#models/KNOBContent";
import File from "#models/File";
import { is_curator } from "#lib/user_checks";
import { v4 as uuidv4 } from "uuid";
import { unlinkSync, copyFileSync } from "fs";

export default async function (req, res) {
  try {
    await is_curator(req, res);
  } catch (e) {
    console.log(e);
    return;
  }

  console.log(req.body);
  console.log(req.files);

  if (
    !req.body.title ||
    !req.files.picture ||
    !req.files.file ||
    !req.body.short_description ||
    !req.body.description
  ) {
    res.status(400).json({ error: "Непълна информация." });
    return;
  }

  if (req.files.picture[0].mimetype.split("/")[0] !== "image") {
    res.status(400).json({ error: "Невалидно изображение." });
    return;
  }

  //check if file type is pdf, docx, or pptx
  if (
    req.files.file[0].mimetype != "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
    req.files.file[0].mimetype != "application/pdf" &&
    req.files.file[0].mimetype != "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  ) {
    res.status(400).json({ error: "Incorrect file type" });
    return;
  }

  const picture_id = uuidv4();
  const picture_new_path = "uploads/" + picture_id + "." + req.files.picture[0].originalname.split(".").pop();
  copyFileSync(req.files.picture[0].path, picture_new_path);
  unlinkSync(req.files.picture[0].path);

  const file_id = uuidv4();
  const file_new_path = "uploads/" + file_id + "." + req.files.file[0].originalname.split(".").pop();
  copyFileSync(req.files.file[0].path, file_new_path);
  unlinkSync(req.files.file[0].path);

  try {
    await db_connect();

    const picture = await File.create({
      name: req.files.picture[0].originalname,
      path: picture_new_path,
      mimetype: req.files.picture[0].mimetype,
    });

    const file = await File.create({
      name: req.files.file[0].originalname,
      path: file_new_path,
      mimetype: req.files.file[0].mimetype,
    });

    await KNOBContent.create({
      title: req.body.title,
      picture: picture._id,
      file: file._id,
      short_description: req.body.short_description,
      description: req.body.description,
    });

    res.status(200).json({});
  } catch (e) {
    console.log(e);
    if (db_handle_error(e, res)) return;
  }
}
