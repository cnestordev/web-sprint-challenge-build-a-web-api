const express = require('express')
const app = express()

const projectRouter = require('./router/projectRouter')
const actionRouter = require('./router/actionRouter')

app.use(express.json())
app.use('/api/projects', projectRouter)
app.use('/api/actions', actionRouter)

const port = process.env.PORT || 8000



app.get('/', (req, res) => {
    res.status(200).json({ hello: 'world' })
})



app.listen(port, () => {
    console.log(`running on port ${port}`)
})