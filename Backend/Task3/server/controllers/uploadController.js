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
      fileId: response.fileId,
    });

    res.status(200).json({ message: 'File uploaded', file: savedFile });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Get all uploaded files
export const getFiles = async (req, res) => {
  try {
    const files = await File.find().sort({ uploadedAt: -1 });
    res.status(200).json({ files });
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Could not fetch files' });
  }
};

// Detete a file by ID
export const deleteFile = async (req, res) => {
  try {
    const fileDoc = await File.findById(req.params.id);

    if (!fileDoc) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Delete from ImageKit using fileId
    await imagekit.deleteFile(fileDoc.fileId);

    // Delete from MongoDB
    await File.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete file', details: error.message });
  }
};
