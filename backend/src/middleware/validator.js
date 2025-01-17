const { validationResult, body } = require('express-validator');
const moment = require('moment');
const { AppError } = require('./errorHandler');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new AppError(400, errors.array()[0].msg);
    }
    next();
};

const scheduleMessageValidation = [
    body('content')
        .trim()
        .notEmpty()
        .withMessage('Message content is required')
        .isLength({ max: 4096 })
        .withMessage('Message content must not exceed 4096 characters'),

    body('scheduleTime')
        .notEmpty()
        .withMessage('Schedule time is required')
        .custom((value) => {
            const scheduledTime = moment(value);
            if (!scheduledTime.isValid()) {
                throw new Error('Invalid schedule time format');
            }
            if (scheduledTime.isBefore(moment())) {
                throw new Error('Schedule time must be in the future');
            }
            return true;
        }),

    body('recipients')
        .isArray({ min: 1 })
        .withMessage('At least one recipient is required')
        .custom((recipients) => {
            const validRecipients = recipients.every(recipient => 
                /^\d+@s\.whatsapp\.net$/.test(recipient) || /^\d+-\d+@g\.us$/.test(recipient)
            );
            if (!validRecipients) {
                throw new Error('Invalid recipient format');
            }
            return true;
        }),

    validate
];

const messageIdValidation = [
    body('messageId')
        .notEmpty()
        .withMessage('Message ID is required')
        .isInt()
        .withMessage('Invalid message ID'),
    
    validate
];

module.exports = {
    scheduleMessageValidation,
    messageIdValidation
}; 