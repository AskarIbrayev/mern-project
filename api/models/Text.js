const {Schema, model} = require('mongoose')

const TextSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        default: Date.now()
    }
})
const Text = model("Text", TextSchema)

module.exports = Text