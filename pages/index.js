import Head from "next/head";
import { StrictMode, useState, useEffect } from "react";
import styles from "./index.module.css";
import Particles from "./particles";
import { loadSlim } from "tsparticles-slim";
import { particlesOptions } from "./config";
import { BarLoader } from "react-spinners";
import {
  Box,
  TextField,
  Button,
  Card,
  Typography,
  Grid,
  styled,
  Paper,
  Stack,
  Divider,
  AppBar,
} from "@mui/material";

const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
      borderRadius: 30,
      borderBottomColor: "grey",
    },
    fontFamily: "Papyrus",
    fontWeight: 600,
    fontSize: 19,
    width: 500,
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

export default function Home() {
  const [videoURL, setVideoURL] = useState("");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState();
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    setResult(
      <>
        <Typography variant="h5" fontFamily={"Papyrus"}>
          <mark style={{ backgroundColor: "#FFFF00" }}>Summary:</mark>
        </Typography>
        <BarLoader color="black" loading={true} />{" "}
        <Particles options={particlesOptions} />
      </>
    );
    try {
      if (!videoURL) {
        throw new Error("Please enter a video URL");
      }
      if (!prompt) {
        throw new Error("Please enter a prompt");
      }
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoURL: videoURL,
          language: "en",
          prompt: prompt,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setResult(data.result);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
      setResult("");
    }
  }

  return (
    <>
      {domLoaded && (
        <div>
          <Head>
            <title>Youtube Summary</title>
          </Head>
          <Box sx={{ display: "flex" }}>
            <Stack
              sx={{ p: 20, mx: "auto" }}
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 10, md: 10 }}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Box sx={{ display: "flex" }}>
                <Typography
                  fontFamily={"Papyrus"}
                  fontWeight={600}
                  fontSize={70}
                  letterSpacing={0.7}
                >
                  Youtube Summary
                  <Typography
                    fontFamily={"Papyrus"}
                    fontWeight={600}
                    fontSize={12}
                    letterSpacing={1}
                  >
                    <mark style={{ backgroundColor: "#FFFF00" }}>
                      Transform
                    </mark>
                    long, boring YouTube videos into digestible bites of
                    information with our innovative summarization app! Are you
                    tired of sifting through long, tedious
                    <mark style={{ backgroundColor: "#FFFF00" }}>
                      YouTube videos
                    </mark>{" "}
                    to find the information you need? Look no further! We are
                    here to help. With just a few clicks, you can easily
                    <mark style={{ backgroundColor: "#FFFF00" }}>
                      generate a summary
                    </mark>{" "}
                    of any YouTube video, saving you time and effort. Whether
                    you're a student, a professional, or just someone who loves
                    to learn, this tool is perfect for you. So why wait? Give it
                    a try today
                  </Typography>
                </Typography>
              </Box>
              <Box>
                <form onSubmit={onSubmit}>
                  <Stack direction={{ xs: "row", sm: "column" }}>
                    <CustomTextField
                      fullWidth
                      type="text"
                      name="animal"
                      placeholder="Enter Youtube URL"
                      value={videoURL}
                      onChange={(e) => setVideoURL(e.target.value)}
                    />
                    <CustomTextField
                      fullWidth
                      type="text"
                      name="animal"
                      placeholder="Enter a prompt"
                      onChange={(e) => setPrompt(e.target.value)}
                    />

                    <Button
                      variant="outlined"
                      type="submit"
                      sx={{
                        mt: 5,
                        ml: 20,
                        borderRadius: 4,
                        borderColor: "black",
                        color: "black",
                        "&:hover": {
                          color: "white",
                          backgroundColor: "#FFFF00",
                          borderColor: "#FFFF00",
                        },
                      }}
                    >
                      <Typography
                        fontFamily={"Papyrus"}
                        fontWeight={600}
                        fontSize={13}
                        letterSpacing={0.7}
                      >
                        <mark style={{ backgroundColor: "#FFFF00" }}>
                          Generate Summary
                        </mark>
                      </Typography>
                    </Button>
                  </Stack>
                </form>
              </Box>
            </Stack>
          </Box>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 5, sm: 5, md: 10 }}
            divider={
              <Divider sx={{ height: 700 }} orientation="vertical" flexItem />
            }
          >
            <Grid>
              <Box sx={{ p: 3, mt: 2, mx: 15 }}>
                <Typography
                  fontWeight={900}
                  fontSize={16}
                  fontFamily={"Papyrus"}
                >
                  {result}
                </Typography>
              </Box>
            </Grid>
          </Stack>
        </div>
      )}
    </>
  );
}
