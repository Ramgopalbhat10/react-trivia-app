import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SaveScoreForm({ score }) {
  const [username, setUsername] = useState('');

  const saveHighScore = (e) => {
    e.preventDefault();
    const record = {
      name: username,
      score
    }
  }

  return (
    <>
      <h1>Score: {score}</h1>
      <form onSubmit={saveHighScore}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" className="btn" disabled={!username}>Save</button>
      </form>
      <Link className="back" to="/">Go Home</Link>
    </>
  )
}
