const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://varsha:sykhn4AOlcvlKpm8@cluster0.f6eowtb.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected");
}).catch((err) => { console.log(err + " error in connection") });