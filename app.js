const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const dbConnection = require('./database');
const MongoStore = require('connect-mongo')(session);
const passport = require('./passport');
const app = express();
const PORT = process.env.PORT || 8080
const verifySession = require('./util/verifySession');

// Route requires
const user = require('./routes/user');
const hackathon = require('./routes/hackathon');
const project = require('./routes/project')
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');

// MIDDLEWARE
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(helmet({
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'",],
			styleSrc: ["'self'", "https://*.googleapis.com/", "https://*.gstatic.com/", "'unsafe-inline'"],
			scriptSrc: ["'self'", "data:", "'unsafe-inline'",],
			fontSrc: ["'self'", "data:", "https://*.googleapis.com/", "https://*.gstatic.com/"],
			imgSrc: ["'self'", "data:", "https://ui-avatars.com", "https://*.unsplash.com/"],
			mediaSrc: ["'self'"],
			objectSrc: ["'self'"],
		}
	}
}))

// Sessions
app.use(
	session({
		secret: process.env.SECRET, //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false, //required
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser


// seed.seedDB()

// Routes
app.use('/user', user)
app.use('/hackathon', hackathon)
app.use('/project', project)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, 'build')));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname + '/build/index.html')); // Serve the static file in production
	});
} 

// Starting Server 
app.listen(PORT, () => {
	console.log(`\n\n====App listening on PORT: ${PORT}====\n\n`)
})