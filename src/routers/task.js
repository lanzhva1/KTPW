const express = require('express')
const Task = require('../module/task')
const auth = require('../middleware/auth')

const router = new express.Router()


// operace Create
// požadavek POST
//app.post('/tasks', async (req, res) => {
router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


// operace Read
// požadavek GET
// app.get('/tasks', async (req, res) => {
router.get('/tasks', auth, async (req, res) => {
        // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
    try {
        const tasks = await Task.find({})
        //res.send(tasks)
        res.render('tasks.hbs', {
            title: 'Vaše úlohy', //header.hbs
            tasks: tasks,
            user: req.user.name            
        })
    } catch (e) {
        res.status(500).send()
    }
})


// operace Read
// požadavek GET
// app.get('/tasks/:id', async (req, res) => {
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send()
    //     }

    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send()
    // })

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

// operace Update
// požadavek PATCH
// app.patch('/tasks/:id', async (req, res) => {
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Neplatná aktualizace!' })
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false, new : true, runValidators : true})
        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)

    }

})



// operace Delete
// požadavek DELETE
// app.delete('/tasks/:id', async (req, res) => {
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        //const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})
 
module.exports = router