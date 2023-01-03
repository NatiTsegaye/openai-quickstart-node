import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import { BarLoader } from "react-spinners";
export default function Home() {
  const [videoURL, setVideoURL] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    setResult(<BarLoader color="#10a37f" loading={true} />);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoURL: videoURL, language: "en" }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setResult(data.result);
      setVideoURL("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
      setResult("");
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Video Summary Generator</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter the YouTube Video URL"
            value={videoURL}
            onChange={(e) => setVideoURL(e.target.value)}
          />
          <input type="submit" value="Generate Summary" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
