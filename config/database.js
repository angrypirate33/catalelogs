const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('connected', function () {
	console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
})

db.on('error', function (error) {
	console.log(error)
})
