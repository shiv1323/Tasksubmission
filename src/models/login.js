const mongoose = require('mongoose')
const login = new mongoose.Schema({
    emails: {
        type: String,
        required: true,
        unique: [true, "Email id already present"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email");
            }
        }
    },
    passwords: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 20
    }
})
const login_in = new mongoose.model("login_db", login);
module.exports = login_in;