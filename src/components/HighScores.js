import React from 'react';
import { Link } from 'react-router-dom';

export default function HighScores() {
  return (
    <>
      <Link className="back" to="/">Back</Link>
      <h1>High Scores</h1>
    </>
  )
}
