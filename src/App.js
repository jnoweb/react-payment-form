import React, { useState } from "react";
import styles from "./App.module.css";
import Form from "./Form";
import { ThankYou } from "./ThankYou";

function App() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className={styles.container}>{!submitted ? <Form submit={() => setSubmitted(true)} /> : <ThankYou />}</div>
  );
}

export default App;