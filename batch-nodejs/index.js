const path = require("path");
const fs = require("fs");
const { setTimeout } = require("timers/promises");
const axios = require("axios");
const FormData = require("form-data");

const API_KEY = "INSERT_API_KEY_HERE";
const DESIGN_ID = "eb8f2c0b-0d0b-49d5-827c-cf6898d5e093"; // Set the design id

const inputImagesDirectoryPath = path.join(__dirname, "/input-images");
const outputImagesDirectoryPath = path.join(__dirname, "/output-images");
const imageExtensionRegex = new RegExp("(.png|.jpg|.jpeg)$");
const fileNames = fs.readdirSync(inputImagesDirectoryPath);
const imageNames = fileNames.filter((fileName) =>
  imageExtensionRegex.test(fileName)
);

async function process() {
  for (const [index, imageName] of imageNames.entries()) {
    const form = new FormData();

    form.append(
      "image_file",
      fs.createReadStream(path.join(inputImagesDirectoryPath, imageName))
    );

    try {
      console.log(`Processing image "${imageName}".`);

      const response = await axios({
        method: "post",
        url: `https://api.designify.com/v1.0/designify/${DESIGN_ID}`,
        data: form,
        responseType: "arraybuffer",
        encoding: null,
        headers: {
          ...form.getHeaders(),
          "X-Api-Key": API_KEY,
        },
      });

      fs.writeFileSync(
        path.join(outputImagesDirectoryPath, `${index}.png`),
        response.data
      );

      console.log(`Generated design for image "${imageName}".`);

      // delaying next request to avoid hitting rate limits
      await setTimeout(1000);
    } catch (error) {
      console.log(
        `Error when trying to generate design for input image "${imageName}".`
      );

      if (error.response) {
        const decoder = new TextDecoder();
        console.log(decoder.decode(error.response.data));
      } else {
        console.log(error);
      }
    }
  }
}

process();
