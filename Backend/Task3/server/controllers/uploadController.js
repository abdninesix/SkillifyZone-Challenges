import imagekit from '../config/imagekit.js';
import File from '../models/File.js';

export const uploadFile = async (req, res) => {
  try {
    const file = req.file;

    // Validate MIME type
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ error: 'Invalid file type' });
    }

    // Upload to ImageKit
    const response = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
      folder: '/fileuploader',
      useUniqueFileName: true,
    });

    // Save metadata to MongoDB
    const savedFile = await File.create({
      name: file.originalname,
      type: file.mimetype,
      size: file.size,
      url: response.url,
    });

    res.status(200).json({ message: 'File uploaded', file: savedFile });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
