import jwt from 'jsonwebtoken';

const secretKey = 'your-secret-key';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { token } = req.body;

    try {
      const decoded = jwt.verify(token, secretKey);
      res.status(200).json({ valid: true, decoded });
    } catch (err) {
      res.status(401).json({ valid: false, message: 'Invalid Token' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
