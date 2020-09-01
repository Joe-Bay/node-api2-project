const express = require('express')
const postsRouter = require('./posts/posts-router')
const database = require('./data/db')

const server = express()

const port = 8000
server.use(express.json())
server.use('/api/posts', postsRouter)

server.get('/', (req, res) => {
    res.send('Its working!')
})

server.listen(port, () => console.log(`the server is listening on port ${port}`))