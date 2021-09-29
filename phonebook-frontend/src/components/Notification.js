import React from "react"

const Notification = ({ message, type }) => {
  if (!message) {
    return null
  }

  if (type === "success") {
    return <div className="success">{message}</div>
  }

  if (type === "error") {
    return <div className="error">{message}</div>
  }
}

export default Notification
