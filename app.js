const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const socketIO = require('socket.io');
const http = require('http');


const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/recipies')
    .then(() => {
        console.log('DB connected');
    })
    .catch((err) => {
        console.log(err);
    })


//for flash messages (connect-flash);
app.use(session({
    secret: 'Haan Haan',
    resave: false,
    saveUninitialized: true,
}))

app.use(flash());

app.use(passport.initialize());
app.use(passport.authenticate('session'));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.info = req.flash('info');
    res.locals.currentuser = req.user;    //locals bnaya kyunki ejs files me req.user nhi use kar skte to currentuser bnaya taki use kar ske
    next();                               //req.user passport ki vagah se banta jisme current session vale user ka sara data hota (jo user logged in ho uska data)
})


const dishRoutes = require('./routes/dishes');
const reviewRoutes = require('./routes/reviews');
const authroutes = require('./routes/auth');
const primeroutes = require('./routes/primemember');
app.use(dishRoutes);
app.use(reviewRoutes);
app.use(authroutes);
app.use(primeroutes);

const server = http.createServer(app);         //to use socketIO
const io = new socketIO.Server(server);

io.on("connection", (socket) => {
    socket.on('send-msg', (data) => {
        // console.log(data);
        io.emit('recieve-msg', {
            msg: data.msg,
            id: socket.id,
            name: data.name
        })
    })
});

const port = 3000;
server.listen(port, () => {
    console.log('Server started at port :', port);
})