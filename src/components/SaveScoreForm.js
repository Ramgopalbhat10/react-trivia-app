import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "./firebase/FirebaseContext";

export default function SaveScoreForm({ score, scoreSaved }) {
  const [username, setUsername] = useState("");
  const [islowScore, setIsLowScore] = useState(false);
  const firebase = useFirebase();

  useEffect(() => {
    firebase.scores().once("value", snapshot => {
      const data = snapshot.val();
      if (Object.keys(data).length > 4) {
        const lowScore = Object.values(data).reduce((prev, curr) =>
          prev.score < curr.score ? prev.score : curr.score
        );
        if (lowScore > score) {
          setIsLowScore(true);
        }
      }
    });
  }, [firebase, score]);

  const saveHighScore = e => {
    e.preventDefault();
    const record = {
      name: username,
      score
    };

    firebase.scores().push(record, () => {
      console.log("score saved");
      scoreSaved();
    });
  };

  return (
    <>
      {islowScore ? (
        <h1>Your score is less than top 5 users. Play again</h1>
      ) : (
        <>
          <h1>Score: {score}</h1>
          <form onSubmit={saveHighScore}>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <button type="submit" className="btn" disabled={!username}>
              Save
            </button>
          </form>
        </>
      )}
      <Link className="back" to="/">
        Go Home
      </Link>
    </>
  );
}
