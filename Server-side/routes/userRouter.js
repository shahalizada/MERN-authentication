const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  const { name, username, password, password2 } = req.body;

  //validation....

  if (!name || !username || !password || !password2) {
    return res.status(400).json({ msg: "Please fill in all the fields!" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ msg: "Password can't be less than 6 characters!" });
  }
  if (password !== password2) {
    return res.status(400).json({ msg: "Passwords must match!" });
  }

  const existingUser = await User.findOne({ username: username });
  if (existingUser) {
    return res.status(400).json({ msg: "User already exsit, try new one!" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    username,
    password: hashPassword,
  });
  const userSaved = await newUser.save();
  res.json({ msg: "User was successfully created!" });
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    ///validation
    if (!username || !password) {
      return res.status(400).json({ msg: "Please fill in all the fields!" });
    }

    const user = await User.findOne({ username: username });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "No associated accounts were found!" });
    }

    //pasword match...
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET3);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json({ msg: "User was successfully deleted!", deletedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/validToken", async (req, res) => {
  try {
    const token = req.header("user-token");
    if (!token) {
      return res.json(false);
    }
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET3);
    if (!verifiedToken) {
      return res.json(false);
    }
    const user = await User.findById(verifiedToken.id);
    if (!user) {
      return res.json(false);
    }
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    name: user.name,
    id: user._id,
  });
});

module.exports = router;
