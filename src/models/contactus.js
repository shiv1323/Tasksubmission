const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 25
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
    country: {
        type: String,
        required: true,
        trim: true
    },
    num: {
        type: Number,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 12,
        unique: [true, "number already present in our db"]
    },
    sub: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
    }

})
const contact = new mongoose.model("contactus", contactSchema);

module.exports = contact;
