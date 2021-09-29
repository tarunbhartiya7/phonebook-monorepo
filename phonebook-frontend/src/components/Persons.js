import React from "react"
import Person from "./Person"

const Persons = ({ persons, handleDelete }) => (
  <>
    <ul>
      {persons.map((person) => (
        <Person
          key={person.id}
          person={person}
          handleDelete={() => handleDelete(person)}
        />
      ))}
    </ul>
  </>
)

export default Persons
