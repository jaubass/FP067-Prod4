// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.addmessage = onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into Firestore using the Firebase Admin SDK.
    const writeResult = await getFirestore()
        .collection("messages")
        .add({original: original});
    // Send back a message that we've successfully written the message
    res.json({result: `Message with ID: ${writeResult.id} added.`});
  });

const dataCollection = 'data/{docId}';

const sendNotification = (title, body, data) => {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    data: data,
    topic: 'travels',
  };

  return admin.messaging().send(message)
    .then(response => {
      console.log('Notification sent successfully:', response, message);
      return response;
    })
    .catch(error => {
      console.error('Error sending notification:', error, message);
    });
};

exports.onDocumentWrite = functions.firestore
  .document(dataCollection)
  .onWrite((change, context) => {
    const document = change.after.exists ? change.after.data() : null;
    const title = 'Document Changed onDocumentWrite';
    const body = 'Final Data: ' + JSON.stringify(document);

    return sendNotification(title, body, { type: 'write' });
  });

exports.onDocumentUpdated = functions.firestore
  .document(dataCollection)
  .onUpdate((change, context) => {
    const newValue = change.after.data();
    const title = 'Document Updated onDocumentUpdated';
    const body = 'Final Data: ' + JSON.stringify(newValue);

    return sendNotification(title, body, { type: 'update' });
  });
