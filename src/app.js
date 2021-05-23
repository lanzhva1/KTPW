const express = require('express')
const path = require('path')
const hbs = require('hbs')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// public a template jsou sourozenecké složky pro složku src, proto ../
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

hbs.registerPartials(partialsPath)

//jaký stroj používáme pro generování pohledů --> hbs
app.set('view engine', 'hbs')
//kde má hledat pohledy
app.set('views', viewsPath)

//info pro express, kde najde soubory pro prohlížeč
app.use(express.static(publicDirectoryPath))
app.use(express.json())

// app.use((req, res, next) => {
//     console.log('Porucha')
//     res.status(503).send('Stránky jsou dočasně mimo provoz. Vraťte se brzy!')
//     next()
// })

app.use(taskRouter)
app.use(userRouter)

app.get('', (req,res) => {
    res.render('home.hbs', {
        title: 'Přihlášení'
    })
})

app.get('/register', async (req,res) => {
    res.render('register.hbs', {
        title: 'Registrace'
    })
})

app.get('/login', (req, res) => {
    res.render('login.hbs', {
        title: 'Příhlášení'
    })
})

app.get('/user', (req, res) => {
    res.render('user.hbs', {
        title: 'Můj profil'
    })
})

app.get('/tasks', (req, res) => {
    res.render('task.hbs', {
        title: 'Úlohy'
    })
})

app.listen(port, () => {
    console.log('Server poslouchá na portu ' + port)
})

const bcrypt = require('bcryptjs')

// zkouška hašování
const mojeFunkce = async () => {
    const heslo = 'Sparta123*45'
    const hasovaneHeslo = await bcrypt.hash(heslo, 8)

    console.log(heslo)
    console.log(hasovaneHeslo)

    const hesloSedi = await bcrypt.compare('Sparta123*45', hasovaneHeslo)
    console.log(hesloSedi)
}

//mojeFunkce()

//spusteni DB serveru
//C:\MongoDB\Server\4.4\bin\mongod.exe --dbpath=C:\MongoDB\Server\4.4\mongodb-data        