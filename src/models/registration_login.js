const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const registerForm = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25
    },
    lname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        // maxlength: 20
    },
    confirm_pass: {
        type: String,
        required: true,
        minlength: 8,
        // maxlength: 20
    },
    gender: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email id already present"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email");
            }
        }
    },
    Phone: {
        type: Number,
        required: true,
        unique: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

// //jwt
// registerForm.methods.generateAuthToken = async function () {
//     try {
//         // console.log(this._id);
//         const token = jwt.sign({ _id: this._id.toString() }, "mynameisshivanshvermasoftwareengineer");
//         this.tokens = this.tokens + ({ token });
//         // await this.save();
//         console.log(this.tokens);
//         return token;
//     } catch (error) {
//         res.send("error part" + error);
//     }
// }
//password hasing
registerForm.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bycrypt.hash(this.password, 12);
        this.confirm_pass = await bycrypt.hash(this.password, 12);
    }
    next();
})

const register = new mongoose.model("register_list", registerForm);
module.exports = register;
