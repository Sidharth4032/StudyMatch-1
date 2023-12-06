javascript
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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

/**
 * Encrypts text using AES algorithm.
 * @param {string} text - Text to be encrypted.
 * @param {string} secretKey - Secret key for encryption.
 * @returns {string} Encrypted text.
 */
const encryptText = (text, secretKey) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-ctr', secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

/**
 * Decrypts text using AES algorithm.
 * @param {string} text - Text to be decrypted.
 * @param {string} secretKey - Secret key for decryption.
 * @returns {string} Decrypted text.
 */
const decryptText = (text, secretKey) => {
    const parts = text.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const encryptedText = Buffer.from(parts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-ctr', secretKey, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    return decrypted.toString();
};

/**
 * Generates a secure hash from a string.
 * @param {string} data - Data to hash.
 * @returns {string} The resulting hash.
 */
const generateHash = (data) => {
    return crypto.createHash('sha256').update(data).digest('hex');
};

/**
 * Compares a raw string to a hash to check if they match.
 * @param {string} raw - Raw string.
 * @param {string} hash - Hash to compare to.
 * @returns {boolean} True if they match, otherwise false.
 */
const compareHash = (raw, hash) => {
    const generatedHash = generateHash(raw);
    return generatedHash === hash;
};

/**
 * Converts a date to a formatted string.
 * @param {Date} date - The date to format.
 * @returns {string} Formatted date string.
 */
const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};

