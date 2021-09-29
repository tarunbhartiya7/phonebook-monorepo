import React from "react"

const Person = ({ person, handleDelete }) => (
  <li>
    {person.name} {person.number}
    <button onClick={handleDelete}>Delete</button>
  </li>
)

export default Person
