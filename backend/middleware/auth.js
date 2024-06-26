const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
  
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
        // Verify the existing token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Create a token with a very distant future expiration time
        const newToken = jwt.sign({ user: decoded.user }, process.env.JWT_SECRET); // Example: set expiration to 100 years
        
        // Attach the new token to the response headers if needed
        res.setHeader('Authorization', `Bearer ${newToken}`);

        // Optionally, you can also send the new token in the response body
        // res.json({ newToken });

        req.user = decoded.user; // Set the decoded user to the request object
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
