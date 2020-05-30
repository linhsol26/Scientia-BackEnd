const firebase = require("firebase-admin");
const Database = function (credentials, databaseURL) {
    this.app = firebase.initializeApp({ credential: firebase.credential.cert(credentials), databaseURL: databaseURL });
    this.db = this.app.firestore();
    this.auth = this.app.auth();

}
module.exports = Database;