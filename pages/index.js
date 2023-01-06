import Head from "next/head";
import { StrictMode, useState, useEffect } from "react";
import logo2 from "../public/logo2.png";
import Particles from "./particles";
import { loadSlim } from "tsparticles-slim";
import { particlesOptions } from "../config/config.js";
import { BarLoader } from "react-spinners";
import {
  Box,
  TextField,
  Button,
  Link,
  Typography,
  Grid,
  styled,
  Stack,
  Divider,
  AppBar,
  Toolbar,
} from "@mui/material";
import { borderRadius } from "@mui/system";

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
      borderRadius: 10,
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
          <AppBar
            maxWidth={"90vw"}
            sx={{
              backgroundColor: "white",
              borderColor: "white",
              opacity: 0.9,
              boxShadow: 0,
            }}
            position="static"
            fullWidth
          >
            <Toolbar>
              <Box
                component="img"
                sx={{
                  height: 64,
                  opacity: 1,
                }}
                alt="Your logo."
                src={"logo2.png"}
              />
              <Box ml={"auto"} mr={{ xs: -20, md: 0 }}>
                <Link href="https://www.linkedin.com/in/gedion-alemayehu/">
                  <Button
                    sx={{
                      borderRadius: 10,
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
                      fontSize={11}
                      letterSpacing={1}
                      sx={{ color: "black" }}
                    >
                      Contact Us
                    </Typography>
                  </Button>
                </Link>
              </Box>
            </Toolbar>
          </AppBar>
          <Box
            maxWidth={"90vw"}
            sx={{ display: "flex" }}
            padding={{ xs: "auto" }}
          >
            <Stack
              sx={{ mx: "auto" }}
              padding={{ xs: "auto", sm: 1, md: 20 }}
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 10, sm: 10, md: 10 }}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Box sx={{ display: "flex" }}>
                <Typography
                  fontFamily={"Papyrus"}
                  fontWeight={900}
                  fontSize={70}
                  letterSpacing={2}
                >
                  VINSIGHT
                  <Typography
                    fontFamily={"Papyrus"}
                    fontWeight={600}
                    fontSize={12}
                    letterSpacing={1}
                  >
                    <mark style={{ backgroundColor: "#FFFF00" }}>
                      Transform
                    </mark>{" "}
                    long, boring YouTube videos into digestible bites of
                    information with our innovative summarization app! It works
                    with any YouTube video!
                    <mark style={{ backgroundColor: "#FFFF00" }}>
                      GPT-3 powered
                    </mark>{" "}
                  </Typography>
                </Typography>
              </Box>
              <Box>
                <form onSubmit={onSubmit}>
                  <Stack direction={{ xs: "column", sm: "column" }}>
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
                    <Typography
                      fontFamily={"Papyrus"}
                      fontWeight={600}
                      fontSize={10}
                      letterSpacing={1}
                      color="grey"
                    >
                      <mark style={{ backgroundColor: "#FFFF00" }}>Try:</mark>{" "}
                      "Summarize the follwing in a first person narrative",
                      "Creat a bullet-point list"
                    </Typography>

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
          <Grid>
            <Box
              mx={{ xs: 0, sm: 0, md: 15 }}
              mt={{ xs: 0, sm: 0, md: 0 }}
              p={{ xs: 0, sm: 0, md: 3 }}
            >
              <Typography fontWeight={900} fontSize={16} fontFamily={"Papyrus"}>
                {result}
              </Typography>
            </Box>
          </Grid>
        </div>
      )}
    </>
  );
}
