import React from "react"

const PersonForm = ({
  addPerson,
  newName,
  newNumber,
  setNewName,
  setNewNumber,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    addPerson(newName.trim(), newNumber.trim())
  }

  const handleNoteChange = (event) => setNewName(event.target.value)

  const handlePhoneNumberChange = (event) => setNewNumber(event.target.value)

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNoteChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handlePhoneNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default PersonForm
