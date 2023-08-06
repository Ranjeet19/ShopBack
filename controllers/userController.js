const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



module.exports.userLogin = async (req, res) => {
  const { email, password } = req.body;


  try {
    const userExist = await User.findOne({ email: email });

    if (!userExist) {
      return res.status(404).json({
        status: 'error',
        message: "user doesn't exist"
      });
    } else {

      const isValid = bcrypt.compareSync(password, userExist.password);

      if (isValid) {
        const token = jwt.sign({ id: userExist._id, isAdmin: userExist.isAdmin }, 'jsonwebtoken');
        res.status(200).json({
          email,
          token,
          isAdmin: userExist.isAdmin,
          shippingAddress: userExist.shippingAddress,
          fullname: userExist.fullname
        });

      } else {
        return res.status(404).json({
          status: 'error',
          message: "credential doesn't exist"
        });
      }


    }



  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: `${err}`
    });
  }


}



module.exports.userRegister = async (req, res) => {
  const { email, password, fullname } = req.body;

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(404).json({
        status: 'error',
        message: "user already exist"
      });
    } else {
      const hashed = await bcrypt.hash(password, 10);

      await User.create({
        email,
        fullname,
        password: hashed
      });


      return res.status(201).json({
        status: 'success',
        message: "successfully registered"
      });

    }

  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: `${err}`
    });
  }
}



module.exports.userProfile = async (req, res) => {
  const id = req.userId;


  try {
    const userExist = await User.findById(id);


    if (!userExist) {
      return res.status(404).json({
        status: 'error',
        message: "user doesn't exist"
      });
    } else {

      return res.status(200).json(userExist);
    }



  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: `${err}`
    });
  }


}




module.exports.userUpdate = async (req, res) => {
  const id = req.userId;


  try {
    const userExist = await User.findById(id);


    if (!userExist) {
      return res.status(404).json({
        status: 'error',
        message: "user doesn't exist"
      });
    } else {

      userExist.fullname = req.body.fullname || userExist.fullname;
      userExist.email = req.body.email || userExist.email;
      userExist.shippingAddress = req.body.shippingAddress || userExist.shippingAddress;

      userExist.save();

      return res.status(201).json({
        status: 'success',
        message: "successfully updated"
      });



    }



  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: `${err}`
    });
  }


}
