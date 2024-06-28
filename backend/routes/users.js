// routes/users.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticateToken = require('../middleware/auth');
const multer = require('multer');
const router = express.Router();

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key';

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Register a new user
router.post('/register', async (req, res) => {
    const { fullName, email, password } = req.body;
    console.log("register is triggered");
    
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ fullName, email, password });
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Sign in a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, JWT_SECRET, { expiresIn: 84600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update profile route
router.post('/profile', authenticateToken, upload.single('profileImage'), async (req, res) => {
    const { username, contactNo, institution, bio, language, gender } = req.body;
    const profileImage = req.file ? req.file.path : null;
    const userId = req.user.id;

    try {
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if fullName is available in the retrieved user data
        const fullName = user.fullName || ''; // Default to empty string if fullName is undefined

        user.username = username;
        user.contactNo = contactNo;
        user.institution = institution;
        user.bio = bio;
        user.language = language;
        user.gender = gender || user.gender;

        if (profileImage) {
            user.profileImage = profileImage;
        }

        await user.save();
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error updating profile' });
    }
});




// Get profile route
router.get('/profile', authenticateToken, async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error retrieving profile' });
    }
});

router.put('/updateSolvedProblems', authenticateToken, async (req, res) => {
    const { problemId } = req.body; // The ID of the problem being solved
    const userId = req.user.id; // Assuming you have user authentication and `req.user` is populated

    // Validate problemId
    if (!problemId) {
        return res.status(400).json({ message: 'Invalid problem ID' });
    }
    
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.solvedProblems.includes(problemId)) {
            user.solvedProblems.push(problemId);
            await user.save();
        }

        // After saving the updated solvedProblems, recalculate ranks for all users
        const users = await User.find({})
            .sort({ solvedProblems: -1 }) // Sort by solved problems descending
            .select('username solvedProblems');

        // Recalculate rank based on sorted order (1-based index)
        users.forEach(async (user, index) => {
            user.rank = index + 1;
            await user.save();
        });

        res.status(200).json({ message: 'Solved problems updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating solved problems', error });
    }
});



// Verify token
router.post('/verifyToken', async (req, res) => {
    const token = req.body.token;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(400).json({ message: 'Invalid token.' });
    }
});

module.exports = router;
