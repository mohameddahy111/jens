import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import client from '../../../utiles/client';
import { signToken } from '../../../utiles/auth';

const handler = nc();

handler.post(async (req, res) => {
  const user = await client.fetch(`*[_type == "user" && email == $email][0]`, {
    email: req.body.email,
  });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      isAdmin: user.isAdmin,
    });
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      isAdmin: user.isAdmin,
      token,
    });
  } else {
    res.status(401).send({ message: 'Invalid email or password' });
  }

});

export default handler;
