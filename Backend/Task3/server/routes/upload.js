import express from 'express';
import multer from 'multer';
import { deleteFile, getFiles, uploadFile } from '../controllers/uploadController.js';

const router = express.Router();

// Use memory storage (ImageKit needs buffer)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Routes
router.post('/', upload.single('file'), uploadFile);
router.get('/', getFiles);
router.delete('/:id', deleteFile);

export default router;