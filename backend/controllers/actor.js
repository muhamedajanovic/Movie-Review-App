const { isValidObjectId } = require("mongoose");
const Actor = require("../models/actor");
const { sendError } = require("../utils/helper");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "ddeixizf1",
  api_key: "574124421836938",
  api_secret: "IuSuqKagZcV6K-wp6XiPfh3apFY",
  secure: true,
});

exports.createActor = async (req, res) => {
  const { name, about, gender } = req.body;
  const { file } = req;
  const newActor = new Actor({ name, about, gender });

  if (file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path,
      { gravity: "face", height: 500, width: 500, crop: "thumb" }
    );
    newActor.avatar = { url: secure_url, public_id };
  }

  newActor.save();
  res.status(201).json(newActor);
};

exports.updateActor = async (req, res) => {
  const { name, about, gender } = req.body;
  const { file } = req;
  const { actorId } = req.params;

  if (!isValidObjectId(actorId)) return sendError(res, "Invalid request");
  const actor = await Actor.findById(actorId);
  if (!actor) return sendError(res, "Invalid request, record not found");

  const public_id = actor.avatar?.public_id;

  if (public_id && file) {
    const { result } = await cloudinary.uploader.destroy(public_id);
    if (result !== "ok")
      return sendError(res, "Cloud not remove image from cloud");
  }
  if (file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path,
      { gravity: "face", height: 150, width: 150, crop: "thumb" }
    );
    actor.avatar = { url: secure_url, public_id };
  }

  actor.name = name;
  actor.about = about;
  actor.gender = gender;

  await actor.save();
  res.status(201).json(actor);
};
