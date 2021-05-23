const express = require('express')
const User = require('../module/user')
const auth = require('../middleware/auth')

const router = new express.Router()

// operace Create
// požadavek POST
// app.post('/users', async (req, res) => {
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})


// operace Create
// požadavek POST
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        
        const token = await user.generateAuthToken()
        
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

// odhlášení uživatele
router.post('/users/logout', auth, async (req, res) => {   
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            console.log('Porovnávám token.token ('+token.token+') s req.token ('+req.token+')')
            return token.token !== req.token
        })
        
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// odhlášení uživatele ze všech zařízení
router.post('/users/logoutAll', auth, async (req, res) => {

    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


// operace Read
// požadavek GET
// app.get('/users', async (req, res) => {
router.get('/users', async (req, res) => {
        // User.find({})
    // .then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // })

    try {
        const users = await User.find({})
        res.send(users)
        
    } catch(e) {
        res.status(500).send()
    }
})

// operace Read
// požadavek GET
// app.get('/users/:id', async (req, res) => {
// router.get('/users/:id', async (req, res) => {
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
    // const _id = req.params.id

    // try {
    //     const user = await User.findById(_id)
    //     if (!user) {
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // } catch (e) {
    //     res.status(500).send()
    // }
    
})


// operace Update
// požadavek PATCH
// app.patch('/users/:id', async (req, res) => {
// router.patch('/users/:id', async (req, res) => {
router.patch('/users/me', auth, async (req, res) => {
    // kontrola, jaké atributy chceme aktualizovat
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Neplatná aktualizace!' })
    }

    try {
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, 
        //     { useFindAndModify: false, new: true, runValidators: true })
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
            
        // neúspěšná aktualizace, např. zaslané hodnoty neprošly validací
        // if (!user) {
        //     return res.status(404).send()
        // }

        // res.send(user)
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})


// operace Delete
// požadavek DELETE
// app.delete('/users/:id', async (req, res) => {
// router.delete('/users/:id', async (req, res) => {
router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.params.id)

        // if (!user) {
        //     return res.status(404).send()
        // }
        await req.user.remove()
        res.send(req.user)
        //res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router