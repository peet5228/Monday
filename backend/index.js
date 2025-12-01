require('dotenv').config()
const express = require('express')
const fileupload = require('express-fileupload')
const path = require('path')
const cors = require('cors')
const app = express()

app.use(cors ({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use(express.json())
app.use(fileupload())
app.use('/uploads',express.static(path.join('uploads')))

const auth = require('./routes/auth')
app.use('/api/auth',auth)

const profile = require('./routes/profile')
app.use('/api/profile',profile)


//Commit
const show_eva = require('./routes/Commit/show_eva')
app.use('/api/Commit/show_eva',show_eva)

const score_eva = require('./routes/Commit/score_eva')
app.use('/api/Commit/score_eva',score_eva)

const save_score = require('./routes/Commit/save_score')
app.use('/api/Commit/save_score',save_score)

const dashboard = require('./routes/dashboard')
app.use('/api/dashboard',dashboard)

//eva
const me = require('./routes/Eva/me')
app.use('/api/Eva/me',me)

const selfeva = require('./routes/Eva/selfeva')
app.use('/api/Eva/selfeva',selfeva)

const check_eva = require('./routes/Eva/check_eva')
app.use('/api/Eva/check_eva',check_eva)

// Staff ================
const member = require('./routes/Staff/member')
app.use('/api/Staff/member',member)

const topic = require('./routes/Staff/topic')
app.use('/api/Staff/topic',topic)

const indicate = require('./routes/Staff/indicate')
app.use('/api/Staff/indicate',indicate)

const round_eva = require('./routes/Staff/round_eva')
app.use('/api/Staff/round_eva',round_eva)

const eva = require('./routes/Staff/eva')
app.use('/api/Staff/eva',eva)

const commit = require('./routes/Staff/commit')
app.use('/api/Staff/commit',commit)

const statusCommit = require('./routes/Staff/statusCommit')
app.use('/api/Staff/statusCommit',statusCommit)

const document = require('./routes/Staff/document')
app.use('/api/Staff/document',document)

const checkEva = require('./routes/Staff/checkEva')
app.use('/api/Staff/checkEva',checkEva)

app.use((req,res) => res.status(404).json({message:'ปิดปรับปรุง'}))

app.listen(3001 , () => console.log('Server Running On Port 3001'))