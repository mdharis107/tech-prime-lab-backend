const bcrypt = require("bcrypt");
const { UserModel } = require("../models/User.model");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (user) {
    const hash = user.password;

    bcrypt.compare(password, hash, function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send({ msg: "Invalid Credentials" });
      }
      if (result) {
        res.status(200).send({ msg: "Login Successful" });
      } else {
        res.status(400).send({ msg: "Invalid Credentials" });
      }
    });
  } else {
    bcrypt.hash(password, 6, async function (err, hash) {
      if (err) {
        res
          .status(400)
          .send({ msg: "Something went wrong, Please login again" });
      }

      const user = new UserModel({
        email,
        password: hash,
      });
      try {
        await user.save();
        res.status(200).send({ msg: "Signup Successful" });
      } catch (err) {
        console.log(err);
        res.status(400).send({ msg: "Invalid Credentials" });
      }
    });
  }
};

module.exports = {
  login
};
