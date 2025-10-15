import { Client } from '@replit/object-storage';
import multer from 'multer';
import { promisify } from 'util';

export const config = {
  api: {
    bodyParser: false,
  },
};

const client = new Client();

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('فقط الصور مسموحة (JPEG, PNG, GIF, WebP)'));
    }
  }
});

const uploadMiddleware = upload.single('image');
const runMiddleware = promisify(uploadMiddleware);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const authHeader = req.headers.authorization;
  
  if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
    return res.status(401).json({ error: 'Unauthorized - Admin access required' });
  }

  try {
    await runMiddleware(req, res);
    
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const ext = req.file.originalname.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
    
    await client.uploadFromBytes(fileName, req.file.buffer);
    
    const downloadUrl = await client.downloadUrl(fileName);
    
    res.status(200).json({ 
      success: true, 
      url: downloadUrl,
      fileName: fileName 
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Error uploading image: ' + error.message });
  }
}
