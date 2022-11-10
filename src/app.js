const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs');
const contact = require('./models/contactus');
const register = require('./models/registration_login');
const port = process.env.PORT || 3030;
require('./db/connection');

const hbsPath = path.join(__dirname, "../templetes/views");
const hbsPath1 = path.join(__dirname, "../templetes/partial");
const staticPath = path.join(__dirname, "../public");
hbs.registerPartials(hbsPath1);
app.use(express.static(staticPath));


app.set('view engine', "hbs");
app.set("views", hbsPath);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//contact us
app.post("/", async (req, res) => {
    try {
        const contact45 = new contact({
            name: req.body.name,
            email: req.body.email,
            country: req.body.country,
            num: req.body.num,
            sub: req.body.sub,
            desc: req.body.desc,
        })
        const vivo = await contact45.save();
        // window.alert("Message send success")
        res.status(201).render("index");
    } catch (e) {
        res.status(404).send(e);
    }
})
//registration
app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const confirm_pass = req.body.confirm_pass;
        if (password === confirm_pass) {
            const registerEmpl = new register({
                fname: req.body.fname,
                lname: req.body.lname,
                password: req.body.password,
                confirm_pass: req.body.confirm_pass,
                gender: req.body.gender,
                email: req.body.email,
                Phone: req.body.Phone,
            })
            // console.log(token);
            const the = await registerEmpl.save();
            res.status(201).render("index");
        }
        else {
            window.alert("password not matching");
        }
    } catch (e) {
        res.status(404).send(e);
    }
})

//login
app.post('/login', async (req, res) => {
    try {
        const password = req.body.password;
        const email = req.body.email;
        const mouse = await register.findOne({ email: email });
        const isMatch = await bycrypt.compare(password, mouse.password);
        if (isMatch) {
            res.status(201).render("index");
        }
        else {
            res.status(404).send("password are not matching")
            // alert("password or email are not matching");
        }
    } catch (error) {
        res.status(404).send("invalid email or password" + error);
    }
})


app.get("/", (req, res) => {
    res.render("login");
})
app.get("/register", (req, res) => {
    res.render("registration");
})




//listening
app.listen(port, () => {
    console.log(`the server listen on localhost:${port}`);
})