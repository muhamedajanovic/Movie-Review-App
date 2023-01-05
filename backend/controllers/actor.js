const Actor = require("../models/actor");
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
  const { secure_url, public_id } = await cloudinary.uploader.upload(file.path);

  newActor.avatar = { url: secure_url, public_id };
  newActor.save;
  res.status(201).json(newActor);
};
