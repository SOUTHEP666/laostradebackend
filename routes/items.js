import cloudinary from '../utils/cloudinary.js';
import multer from 'multer';
import { Readable } from 'stream';
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', authenticateToken, requireAdmin, upload.single('image'), async (req, res) => {
  const { name, description, price } = req.body;
  const stream = cloudinary.uploader.upload_stream({ folder: 'products' }, async (err, result) => {
    if (err) return res.status(500).send('Upload failed');
    const image_url = result.secure_url;
    const dbRes = await pool.query(
      'INSERT INTO items (name, description, price, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, price, image_url]
    );
    res.json(dbRes.rows[0]);
  });
  Readable.from(req.file.buffer).pipe(stream);
});
