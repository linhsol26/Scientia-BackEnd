const firebase = require("firebase-admin");
const Database = function (credentials, databaseURL) {
    this.app = firebase.initializeApp({ credential: firebase.credential.cert(credentials), databaseURL: databaseURL });
    this.db = this.app.firestore();
    this.auth = this.app.auth();
    let schema = {
        title: '',
        desc: '',
        action: '',
        pic: '../../../assets/system.svg',
        course: 'lthdh',
        content: [
            {
                name: 'FCFS',
                inf: ''
            },
            {
                name: 'SJF',
                inf: ''
            },
            {
                name: 'Round Robin',
                inf: ''
            },
            {
                name: 'SRTF',
                inf: ''
            }
        ]
    };
    Database.prototype.getAll = function () {
        return new Promise((resolve, reject) => {
            this.db.collection('/courses').get().then((snapshot) => {
                resolve(snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                }));
            })
        })
    }
    Database.prototype.createCourse = function () {
        this.db.collection('courses').doc().set(schema);
    }
    Database.prototype.updateCourse = function (uid, docId, course) {
        return new Promise((resovle, reject) => {
            this.db.collection('/courses').doc(docId).get().then((data) => {
                let chosenCourse = data.data();
                if (chosenCourse.ownerId == uid) {
                    this.db.collection('/courses').doc(docId).update(course);
                    resovle("Update successfully");
                }
                resovle("Permission denied");
            })
        })
    }
    Database.prototype.deleteCourse = function (uid, docId) {
        return new Promise((resolve, reject) => {
            this.db.collection('/courses').doc(docId).get().then((data) => {
                let chosenCourse = data.data();
                if (chosenCourse.ownerId == uid) {
                    this.db.collection('/courses').doc(docId).delete();
                    resolve("Delete successfully");
                }
                resolve("Permission denied");
            });
        });
    }
}
module.exports = Database;