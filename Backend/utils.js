const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isStrongPassword = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(password);
};

const logToFile = (message) => {
    const logFile = path.join(__dirname, 'app.log');
    fs.appendFile(logFile, new Date().toISOString() + ' - ' + message + '\n', err => {
        if (err) throw err;
    });
};

const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const sanitizeInput = (input) => {
    return input.replace(/[&<>"']/g, match => {
        const replacements = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
        return replacements[match] || match;
    });
};

const encryptText = (text, secretKey) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-ctr', secretKey, iv);
    return iv.toString('hex') + ':' + Buffer.concat([cipher.update(text), cipher.final()]).toString('hex');
};

const decryptText = (text, secretKey) => {
    const [iv, encryptedText] = text.split(':').map(part => Buffer.from(part, 'hex'));
    const decipher = crypto.createDecipheriv('aes-256-ctr', secretKey, iv);
    return Buffer.concat([decipher.update(encryptedText), decipher.final()]).toString();
};

const generateHash = (data) => {
    return crypto.createHash('sha256').update(data).digest('hex');
};

const compareHash = (raw, hash) => {
    return generateHash(raw) === hash;
};

const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};

module.exports = {
    isValidEmail,
    isStrongPassword,
    logToFile,
    generateRandomString,
    sanitizeInput,
    encryptText,
    decryptText,
    generateHash,
    compareHash,
    formatDate
};
