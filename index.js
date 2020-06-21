const app = require('express')();
const URL = "https://scientia-9d421.firebaseio.com";
const key = require("./key.json");
const admin = require("./database");
const apiHelper = new (require('ambrosentk-api-helper').create)();
const db = new admin(key, URL);
const port = 3000;
app.use(require('cors')());
app.use(require('body-parser')());

    // test port
    app.listen(port, () => {
        console.log(`Scientia is listening on port ${port}`);
    });

    app.get("courses/getCourse", async (req, res) => {
        if(result.status){
        let status = await db.getAll();
        
        res.send(status);
        } else {
            res.send("Get fail!");
        }
    });

    app.post("/courses/createCourse", async (req, res) => {
        let result = await apiHelper.validate(req.body, [
            { link: "title" },
            { link: "desc" },
            { link: "content" },
            { link: "course" }
        ]);
        if (result.status) {
            let status = await db.createCourse(req.body);
            console.log(req.body);
            res.send({ status: status });
        }
        else
            res.send({ status: "Created fail!" });
    });

    app.post("courses/updateCourse", async (req, res) => {
        let uid = req.body.uid;
        let docId = req.body.key;
        let result = await apiHelper.validate(req.body, [
            { link: "uid" },
            { link: "key" },
            { link: "title" },
            { link: "content" }
        ]);
        if (result.status) {
            let status = await db.updateCourse(uid, docId, req.body);
            res.send({ status: status });
        } else {
            res.send({ status: "Updated fail" });
        }
    });

    app.post("/courses/deleteCourse", async (req, res) => {
        let uid = req.body.uid;
        let docId = req.body.key;
        let result = await apiHelper.validate(req.body, [
            { link: "uid" },
            { link: "key" }
        ]);
        if (result.status) {
            let status = await db.deleteCourse(uid, docId);
            res.send({ status: status });
        } else {
            res.send({ status: "Deleted fail" });
        }
    });