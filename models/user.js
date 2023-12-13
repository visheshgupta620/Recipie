const mongoose = require('mongoose');
const passportlocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    // password: {        //schema me password nhi daalre , vo bhi lenge user se form me frontend me but passport se krdenge link pass ko uss user se rather than yha db me dene ke
    //     type: string,
    //     required: true
    // },
    role: {
        type: String,
        required: true
    }
})

userSchema.plugin(passportlocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;