import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
import YoutubeTranscript from "youtube-transcript";

const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  try {
    const transcriptList = await getTranscript(
      req.body.videoURL,
      req.body.language
    );
    const prompt = req.body.prompt;
    const result = await Promise.all(
      transcriptList.map((transcript) => {
        return handlePrompt(transcript, prompt);
      })
    );
    res.status(200).json({ result: result.join(" ") });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

const getTranscript = async (videoURL, language) => {
  const transcript = await YoutubeTranscript.fetchTranscript(videoURL, {
    lang: language,
  }).then((res) => {
    const transcript = res.map((item) => item.text).join(" ");
    return transcript;
  });
  const transcriptList = [];
  const words = transcript.split(" ");
  let i = 0;
  while (i < words.length) {
    transcriptList.push(words.slice(i, (i += 1000)).join(" "));
  }
  return transcriptList;
};

const handlePrompt = async (transcript, prompt) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${prompt}: ${transcript}}`,
    temperature: 0.6,
    max_tokens: 200,
  });
  return response.data.choices[0].text;
};
