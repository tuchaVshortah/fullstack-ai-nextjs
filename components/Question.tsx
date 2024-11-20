'use client'

import React, { useState } from 'react'

const Question = () => {
  const [value, setValue] = useState('')
  const onChange = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <form>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Ask a question"
          className="border border-black/20 px-4 py-6 text-lg rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-400 px-4 py-2 rounded-lg text-lg"
        >
          Ask
        </button>
      </form>
    </div>
  )
}

export default Question
