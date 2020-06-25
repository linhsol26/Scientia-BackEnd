const firebase = require("firebase-admin"); 
const Database = function (credentials, databaseURL) {
     
    this.app = firebase.initializeApp({ credential: firebase.credential.cert(credentials), databaseURL: databaseURL }); 
    this.db = this.app.firestore(); 
    this.auth = this.app.auth(); 

    Database.prototype.getAll = function () { 
        return new Promise((resolve, reject) => { 
            this.db.collection('courses').get().then((snapshot) => {
                resolve(snapshot.docs.map((doc) => { 
                    return { 
                        id: doc.id, 
                        ...doc.data() 
                    } 
                })); 
            }) 
        }) 
    } 

    Database.prototype.createCourse = function (courses) { 
        this.db.collection('courses').doc((Math.round(new Date().getTime() / 1000)).toString()).set(courses); 
    } 

    Database.prototype.updateCourse = function (uid, docId, course) { 
        return new Promise((resovle, reject) => { 
            this.db.collection('/courses').doc(docId).get().then((data) => { 
                let chosenCourse = data.data(); 
                if (chosenCourse.ownerId === uid) { 
                    this.db.collection('/courses').doc(docId).update({
                        title: course.title,
                        desc: course.desc,
                        content: course.content
                    }); 
                    resovle("Update successfully"); 
                } 
                resovle("Permission denied"); 
            }) 
        });
    }

    Database.prototype.deleteCourse = function (uid, docId) { 
        return new Promise((resolve, reject) => { 
            this.db.collection('/courses').doc(docId).get().then((data) => { 
                let chosenCourse = data.data(); 
                if (chosenCourse.ownerId === uid) { 
                    this.db.collection('/courses').doc(docId).delete(); 
                    resolve("Delete successfully");  
                } 
                resolve("Permission denied"); 
            });
        });
    } 
} 
module.exports = Database; 