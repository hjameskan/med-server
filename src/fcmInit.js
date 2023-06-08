// const admin = require('firebase-admin');

// admin.initializeApp({
//   credential: admin.credential.cert(JSON.parse(process.env.FCM_SERVICE_KEY)),
// });

// const message = {
//   notification: {
//     title: 'Notification title',
//     body: 'Notification body',
//   },
//   data: {
//     // additional data to send with the notification
//   },
//   token: deviceToken, // the FCM token of the device you want to send the notification to
// };

// admin.messaging().send(message)
//   .then((response) => {
//     console.log('Successfully sent message:', response);
//   })
//   .catch((error) => {
//     console.log('Error sending message:', error);
//   });

const apn = require('apn');

let options = {
  token: {
    key: "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQguLhgxBaXxLt/Kxc6\n0amS2Xi0Wxkyh4IHqYzeCQp7eD6gCgYIKoZIzj0DAQehRANCAAQTcUQ4igZ2I2ri\nRupA3SdedCtTYy7fsCXpwMDkjczddPxPWvK1NNh2/9oigf9tu4gGxK/FqIIVw77g\nBiiMnUbB\n-----END PRIVATE KEY-----",
    keyId: "87C82X68B9",
    teamId: "D7QPDMZRUR",
  },
  production: false
};

let apnProvider = new apn.Provider(options);

let deviceToken = "abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123";

let note = new apn.Notification();
note.expiry = Math.floor(Date.now() / 1000) + 3600; 
note.sound = "ping.aiff";
note.alert = "You have a new message";
note.payload = {'messageFrom': 'John Appleseed'};
note.topic = "<your-app-bundle-id>";

apnProvider.send(note, deviceToken).then( (result) => {
  console.log(result.failed);
});
