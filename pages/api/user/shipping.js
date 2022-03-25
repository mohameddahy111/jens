import nc from 'next-connect';
import axios from 'axios';
import config from '../../../utiles/config';
import { signToken } from '../../../utiles/auth';

const handler = nc();

handler.post(async (req, res) => {
  const projectId = config.projectId;
  const dataset = config.dataset;
  const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;
  const createMutations = [
    {
      create: {
        _type: 'shipping',
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address,
        building: req.body.building,
        floor: req.body.floor,
        nots: req.body.nots,
      },
    },
  ];
  const { data } = await axios.post(
    `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
    { mutations: createMutations },
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${tokenWithWriteAccess}`,
      },
    }
  );
  const userId = data.results[0].id;
  const user = {
    _id: userId,
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    address: req.body.address,
    building: req.body.building,
    floor: req.body.floor,
    nots: req.body.nots,
  };
  const token = signToken(user);
  res.send({ ...user, token });
});

export default handler;
