const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

var fs = require('fs')
var http = require('http')

const path = require('path')
const exphbs = require('express-handlebars')

//const db = require('./db')
require('./db/index')


const taskController = require('./controllers/task-crtl')
const SimuController = require('./controllers/simu-crtl')
const radiationController = require('./controllers/radiationEffect-ctrl')

/*
const taskRouter = require('./routes/api/task-router')
const taskSetRouter = require('./routes/api/task_set-router')
const SimuRouter = require('./routes/api/simu-router')
const RadiationRouter = require('./routes/api/radiation-router')
const SchedulingRouter = require('./routes/api/schedulingPolicy-router')*/

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())


//db.on('error', console.error.bind(console, 'MongoDB connection error:'))

//public folder
app.use(express.static('public'))

//
app.set('views', path.join(__dirname, '/views/'))
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }))
app.set('view engine', 'hbs')

app.get('/', function (req,res){
    res.sendFile(__dirname + '/page/overview.html')
})

/*
app.get('/', (req, res) => {
    res.send('Hello World!')
})*/


//use routes
app.use('/task', taskController)
app.use('/simu', SimuController)
app.use('/radiation', radiationController)
/*
app.use('/api', taskRouter)
app.use('/api', taskSetRouter)
app.use('/api', SimuRouter)
app.use('/api', RadiationRouter)
app.use('/api', SchedulingRouter)*/

app.listen(apiPort, function () {
    console.log(`Server running on port ${apiPort}`)
})

//app.use('/api', movieRouter)

//app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))

