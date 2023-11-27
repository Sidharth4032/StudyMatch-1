// utils.js
const fs = require('fs');
const path = require('path');

/**
 * Validates email format.
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email is valid, otherwise false.
 */
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates password strength.
 * @param {string} password - The password to validate.
 * @returns {boolean} True if the password is strong, otherwise false.
 */
const isStrongPassword = (password) => {
    // Example: At least one uppercase, one lowercase, one digit, 8-20 characters
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    return passwordRegex.test(password);
};

/**
 * Logs message to a specific log file.
 * @param {string} message - The message to log.
 */
const logToFile = (message) => {
    const logFile = path.join(__dirname, 'app.log');
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}\n`;

    fs.appendFile(logFile, logMessage, (err) => {
        if (err) throw err;
    });
};

/**
 * Generates a random string of specified length.
 * @param {number} length - The length of the string.
 * @returns {string} The generated string.
 */
const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

/**
 * Sanitizes input to prevent injection attacks.
 * @param {string} input - The input string to sanitize.
 * @returns {string} The sanitized string.
 */
const sanitizeInput = (input) => {
    return input.replace(/[&<>"']/g, (match) => {
        switch (match) {
            case '&': return '&amp;';
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '"': return '&quot;';
            case "'": return '&#039;';
            default: return match;
        }
    });
};

// Export the utility functions
module.exports = {
    isValidEmail,
    isStrongPassword,
    logToFile,
    generateRandomString,
    sanitizeInput
};
