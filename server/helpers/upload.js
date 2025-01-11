const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'profile_pictures', // Folder name in your Cloudinary account
        allowed_formats: ['jpeg', 'jpg', 'png', 'gif'], // Allowed file types
        transformation: [{ width: 500, height: 500, crop: 'limit' }], // Resize image
    },
});

// Initialize upload
const upload = multer({ storage });

module.exports = upload;
