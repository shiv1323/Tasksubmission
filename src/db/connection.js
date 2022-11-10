const mongoose = require('mongoose');
uri = "mongodb+srv://gemini1323:PQbOd7KGGWZROHsJ@cluster0.giqij6u.mongodb.net/Contactus?retryWrites=true&w=majority"
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
        console.log("connection successful");
    }).catch(() => {
        console.log("no connection");
    })