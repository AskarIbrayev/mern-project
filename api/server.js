const express = require('express');
const mongoose = require('mongoose');
const config = require('config')
const cors = require('cors');

const app = express();
const PORT = config.get("serverPort")

app.use(express.json());
app.use(cors());


mongoose.connect(config.get("dbUrl")
// , {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }
)
    .then(() => console.log("Connected to DB"))
    .catch(console.error)


const Text = require('./models/Text')

app.get('/texts', async (req, res) => {
    const texts = await Text.find()

    res.json(texts)
})

app.post('/text/new', (req, res) => {
    const text = new Text({
        text: req.body.text,
        timestamp: req.body.timestamp
    })

    text.save()
    res.json(text)
})

app.delete('/text/delete/:id', async (req, res) => {
    const result = await Text.findByIdAndDelete(req.params.id)
    
    res.json(result)
})

app.post('/text/update/:id', async (req, res) => {
    const result = await Text.findByIdAndUpdate(req.params.id, {
        text: req.body.text
    })
    result.save()
    res.json(result)
})
    
app.listen(PORT, () => console.log("Server started on port", PORT));

