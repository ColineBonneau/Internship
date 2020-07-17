const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

var fs = require('fs')
var http = require('http')

const path = require('path')
const exphbs = require('express-handlebars')


require('./db/index')

//Controllers
const taskController = require('./controllers/task-crtl')
const SimuController = require('./controllers/simu-crtl')
const radiationController = require('./controllers/radiationEffect-ctrl')


const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())




//public folder
app.use(express.static('public'))

//
app.set('views', path.join(__dirname, '/views/'))
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }))
app.set('view engine', 'hbs')

app.get('/', function (req,res){
    res.sendFile(__dirname + '/page/overview.html')
})



//use controllers
app.use('/task', taskController)
app.use('/simu', SimuController)
app.use('/radiation', radiationController)


app.listen(apiPort, function () {
    console.log(`Server running on port ${apiPort}`)
})


