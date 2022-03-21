import nc from 'next-connect';
import client from '../../../utiles/client';

const handler = nc();
handler.get(async (req, res) => {
  const item = await client.fetch(`*[_type =='product' &&  _id==$id][0]`, {
    id: req.query.id,
  });
  res.send(item)
});
export default handler;
