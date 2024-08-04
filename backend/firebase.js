require('dotenv').config();
const admin = require('firebase-admin');

// Decode the Base64 encoded service account
const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
const serviceAccountJson = Buffer.from(serviceAccountBase64, 'base64').toString('utf-8');
const serviceAccount = JSON.parse(serviceAccountJson);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "bcc-fullstack.appspot.com"
});

const bucket = admin.storage().bucket();

module.exports = { admin, bucket };
