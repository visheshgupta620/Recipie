const { func } = require('joi');
const { dishSchema } = require('./joiSchema');   //destructure krna pada kyunki humne key bnake export kiya joiSchema me
const Dish = require('./models/dishes');
// const passport = require('passport')

module.exports.checkValid = async (req, res, next) => {
    const { name, image, type, time, diet, steps } = req.body;
    const { error } = await dishSchema.validate({ name, image, type, time, diet, steps });

    if (!error) {
        next();
    }
    else {
        const msg = error.message;
        res.render('error', { err: msg })
    }
}


module.exports.isloggedin = async (req, res, next) => {
    if (req.xhr && !req.isAuthenticated()) {    //req. xhr property returns a true value if the request's X-Requested-With header field is XMLHttpRequest which indicates that the request was issued by a client library such as jQuery.
        return res.status(401).json({
            msg: 'Plz login first'
        })
    }

    if (!req.isAuthenticated()) {
        req.flash('info', 'Please Login First');
        res.redirect('/login');
    }
    else {
        next();
    }
}


module.exports.iscreator = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role != 'creator') {
        req.flash('info', 'You are not authorised to do that.');
        res.redirect('back');
    }
    else {
        next();
    }
}


// module.exports.isauthor = (req,res,next)=>{
//     const {id} = req.params;
//     const dish = Dish.findById(id).populate('author');
//     if(  ||req.isAuthenticated() && req.user._id!==dish.author._id){
//         req.flash('You are not authorised to do that');
//         res.redirect('back');
//     }
//     else{
//         next();
//     }
// }