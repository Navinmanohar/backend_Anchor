const model = require("../models/Schema");
const verification = require("../models/verification");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  generateOtp,
  MailTransport,
  EmailTemplate,
  PlainEmailTemplate,
} = require("../utils/mail");
const { sendError } = require("../utils/helper");
const { isValidObjectId } = require("mongoose");

const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newUser = new model(req.body);
  const { username } = req.body;
  try {
    // addition new
    const oldUser = await model.findOne({ username });

    // if (oldUser)
    //   return res.status(400).json({ message: "User already exists" });

    // changed
    const otp = generateOtp();
    const verificationData = new verification({
      username: newUser.username,
      otp: otp,
    });
    MailTransport().sendMail({
      from: "no-reply@anchor.com",
      to: newUser.username,
      subject: "Please verify your email",
      html: EmailTemplate(otp),
    });


    const user = await newUser.save();
    const verificationUser = await verificationData.save();
    const token = jwt.sign({ username: user.username, id: user._id }, "MERN", {
      expiresIn: "1h",
    });
    res.status(200).json({ user, token,otp });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 const verifyEmail = async (req, res) => {
  console.log(req.body)
  const { username, otp } = req.body;
  if (!username || !otp.trim())
    return sendError(res, "Invalid request,missing parameter");
// username=owner
  // if (!isValidObjectId(username)) return sendError(res, "Invalid userId");

  const user = await model.findOne({ username });
// console.log( "this is owner",)

  if (!user) return sendError(res, "User not found");

  if (user.verified) return sendError(res, "user is already verify");
console.log(verification.model)
  // const token = await verificationToken.findOne({owner});
  const token = await verification.findOne({username });
  if (!token) return sendError(res, "user not found in token");

  const isMatched = await token.compareToken(otp);
  if (!isMatched) return sendError(res, "please provide a valid token");

  user.varified = true;
  await verification.findByIdAndDelete(token._id);
  await user.save();
  MailTransport().sendMail({
    from: "no-reply@anchor.com",
    to: user.owner,
    subject: "Please verify your email",
    html: PlainEmailTemplate(
      "Email varified succesfully",
      "Thanks for connecting with us"
    ),
  });
};

// Login User

// Changed
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await model.findOne({ username: username });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      if (!validity) {
        res.status(400).json("wrong password");
      } else {
        const token = jwt.sign(
          { username: user.username, id: user._id },
          "MERN",
          { expiresIn: "1h" }
        );
        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { registerUser, loginUser,verifyEmail };
