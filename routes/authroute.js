const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usermodel = require("../models/auth");
const properymodel = require("../models/property.model");

const secret = "Mynameisnipun";

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, Phone } = req.body;
    const ph = Phone;
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);

    const result = await usermodel.create({
      Name: name,
      Email: email,
      Password: hashedPassword,
      Phone: ph,
    });

    console.log(result);

    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { Username, Password } = req.body;

    const user = await usermodel.findOne({ Name: Username });
    console.log(user);

    if (user == null) {
      return res.status(400).json({ message: "Username not found.." });
    }

    const matchParrsword = await bcrypt.compare(Password, user.Password);

    if (!matchParrsword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    req.session.isAuthenticated = true;

    res.status(200).json({ result: user, isauth: true });
  } catch (error) {
    res.status(401).json("wrong");
  }
});

router.post("/setotp", async (req, res) => {
  console.log(req.body);
  const { phone } = req.body;
  console.log(phone);
  try {
    const existinguser = await usermodel.findOne({ Phone: phone });
    console.log(existinguser);
    if (!existinguser) {
      return res.status(404).json("user doesnot exist");
    }
    req.session.isAuthenticated = true;
    res.status(200).json({ result: existinguser, isauth: true });
  } catch (error) {
    res.status(500).json("something went wrong");
  }
});

router.post("/comment", async (req, res) => {
  const { content, username, id } = req.body;
  try {
    const existingDocument = await properymodel.findOne({ _id: id });
    console.log(existingDocument);

    // console.log(req.user._id);
    const newComment = {
      // id: generateUniqueId(), // Generate a unique ID for the comment (you can use any method to generate IDs)
      // userId: req.user._id, // Assuming you have user authentication and 'req.user' contains the authenticated user's data
      userName: username,
      content: content,
      timestamp: new Date(),
      replies: [],
    };
    console.log(newComment);
    if (!existingDocument) {
      // Handle the scenario where the document doesn't exist
      return res.status(404).json({ error: "Post not found" });
    }
    existingDocument.comments.push(newComment);
    console.log(existingDocument);

    await existingDocument.save();
    res
      .status(201)
      .json({ message: "Comment saved successfully", comment: newComment });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/getcomments", async (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  try {
    const existingDocument = await properymodel.findOne({ _id: id });
    console.log(existingDocument.comments);
    const data = existingDocument.comments;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/postreply", async (req, res) => {
  const { content1, username, id, commentId } = req.body;
  console.log(req.body);
  try {
    const existingDocument = await properymodel.findOne({ _id: id });
    console.log(existingDocument);

    const comment = existingDocument.comments.find(
      (c) => c._id.toString() === commentId
    );

    const reply = {
      userName: username,
      content: content1,
    };
    comment.replies.push(reply);
    await existingDocument.save();
    console.log('Reply added successfully!');
    return res.status(200).json(comment)
  } catch (error) {
    console.error('Error adding reply:', error.message);
  }
});

module.exports = router;
