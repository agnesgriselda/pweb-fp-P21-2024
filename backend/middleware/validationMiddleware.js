const { body, validationResult } = require('express-validator');

// Middleware for validation
const validateFeedback = [
  body('message').notEmpty().withMessage('Message is required'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateFeedback };
