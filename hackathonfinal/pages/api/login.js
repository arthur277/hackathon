// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import jwt from 'jsonwebtoken';

const secretKey = 'your-secret-key';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { badgeId } = req.body;


    const token = jwt.sign({ badgeId }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ token });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

