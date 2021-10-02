const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  )
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://mongodb-admin:${password}@cluster0.auypa.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model("Person", personSchema)

if (name && number) {
  const person = new Person({
    name,
    number,
  })
  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`)
    console.log(result)
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log(result)
    mongoose.connection.close()
  })
}

// Note.find({ content: "React is awesome" }).then((result) => {
//   console.log(result)
//   mongoose.connection.close()
// })
