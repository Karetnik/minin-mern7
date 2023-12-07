const {model, Schema, Types} = require('mongoose')

const users = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  links: [{type: Types.ObjectId, ref: 'Link'}]
})

module.exports = model('User', users)