const User = require("../models/userModels");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });
    req.session.user = newUser
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      data: {
        error: e,
      },
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User Not Found",
      });
    }
    const isCorrect = bcrypt.compare(password, user.password);

    if (isCorrect) {
      req.session.user =user
      res.status(200).json({
        status:"success",
        data:{
          
        }
      })  
    }else{
      res.status(400).json({
        status:"fail",
        message:"incorrect password or username"
      })
    }


  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      data: {
        error: e,
      },
    });
  }
};
