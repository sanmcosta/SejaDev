const mongoose = require('mongoose')

let conn = null

const URI = 'mongodb+srv://secret:t5hqiEHj5c5WFfaZ@cluster0.9s1u8.mongodb.net/secret?retryWrites=true&w=majority'

module.exports = async () => {
    if (!conn) {
      conn = mongoose.connect(URI, {
          useNewUrlParser: true,
          useCreateIndex: true,
      })

      await conn
    } 
}