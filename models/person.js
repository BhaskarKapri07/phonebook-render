const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to MongoDB')

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB: ', error.message)
  })



const numberValidator = [
  {
    validator:(number) => {
      if ((number[2]==='-'|| number[3] ==='-') && number.length < 9){
        return false
      }
      return true
    },
    message: 'must be atleast 8 digits',
  },
  {
    validator:(number) => {
      return /^\d{2,3}-\d+$/.test(number)
    },
    message: 'invalid phone number'
  },
]
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength:3,
    required:true,
  },
  number: {
    type:String,
    validate: numberValidator,
    required:true,
  },
})

personSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
