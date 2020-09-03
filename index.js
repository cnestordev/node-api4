const express = require('express')
const app = express()

const cors = require('cors')

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 8000
const newTodo = require('./helpers/newTodo')

let todos = [{
    todo: 'First todo',
    isComplete: false,
    id: 1
}]


app.get('/', (req, res) => {
    res.status(200).json({ data: todos })
})

app.post('/api/post', (req, res) => {
    const newItem = newTodo(req.body, todos)
    // console.log(newItem)
    todos.push(newItem)
    res.status(201).json({ data: todos })
})

app.put('/api/put/:id', (req, res) => {
    const id = Number(req.params.id)
    todos = todos.map(item => {
        if (item.id === id) {
            return {
                ...item,
                todo: req.body.todo
            }
        }
        return item
    })
    res.status(200).json({ data: todos })
})

app.patch('/api/patch/:id', (req, res) => {
    const id = Number(req.params.id)
    todos = todos.map(item => {
        if (item.id === id) {
            return {
                ...item,
                isComplete: !item.isComplete
            }
        }
        return item
    })
    res.status(201).json({ data: todos })
})

app.delete('/api/delete/:id', (req, res) => {
    console.log('entered', req.params.id)
    const id = Number(req.params.id)
    todos = todos.filter(n => n.id !== id)
    res.status(201).json({ data: todos })
})



app.listen(port, () => {
    console.log(`Sever running on port ${port}`)
})