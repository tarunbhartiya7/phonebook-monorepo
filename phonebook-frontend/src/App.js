import React, { useState, useEffect } from "react"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/phonebook"

const checkIfNameExist = (arr, str) =>
  arr.find(
    (item) => item.name.trim().toLowerCase() === str.trim().toLowerCase()
  )

const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState("")
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((initialNotes) => {
      setPersons(initialNotes)
    })
  }, [])

  const personsToShow = search
    ? persons.filter((person) =>
        person.name.trim().toLowerCase().includes(search.trim().toLowerCase())
      )
    : persons

  const addPerson = (newName, newNumber) => {
    if (!newName || !newNumber) {
      setMessage({
        message: "name or number is missing",
        type: "error",
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return
    }
    const person = checkIfNameExist(persons, newName)
    if (person) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const changedPerson = { ...person, number: newNumber }

        personService
          .update(changedPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== changedPerson.id ? person : returnedPerson
              )
            )
            setMessage({ message: `Updated ${person.name}`, type: "success" })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch((error) => {
            setMessage({
              message: error.response.data.error,
              type: "error",
            })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }

      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setMessage({
            message: `Added ${returnedPerson.name}`,
            type: "success",
          })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch((error) => {
          setMessage({
            message: error.response.data.error,
            type: "error",
          })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const handleSearch = (event) => setSearch(event.target.value)

  const handleDelete = ({ name, id }) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .deleteRecord(id)
        .then((_) => {
          setPersons(persons.filter((person) => person.id !== id))
          setMessage({ message: `Deleted ${name}`, type: "success" })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch((error) => {
          setMessage({
            message: `Information of ${name} has already been removed from server`,
            type: "error",
          })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter((person) => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification {...message} />
      <Filter search={search} handleSearch={handleSearch} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
