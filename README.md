# QVAC Recipe Finder

A small web app that generates full recipes for dishes from around the world, entirely on-device using Tether's QVAC SDK — no cloud API, no usage bill, no data ever leaves your machine.

## What it does

Type the name of any dish — from any cuisine, anywhere in the world — and it generates a complete recipe (intro, ingredients, step-by-step instructions), streamed live, using a local LLM running on your own device.

## QVAC SDK functions used

- `loadModel()` — loads the `LLAMA_3_2_1B_INST_Q4_0` language model
- `completion()` — generates the recipe text from the dish name, streamed token by token

## SDK version

`@qvac/sdk` — check your installed version with `npm list @qvac/sdk` (requires 0.19.0 or newer)

## Install

npm install


## Run

node server.js


Then open `http://localhost:3000` in your browser, type the name of a dish (e.g. "Adobo", "Ramen", "Paella"), and click **Get Recipe**. The recipe streams in live as it's generated.

On first run, the model downloads automatically (a few hundred MB). Subsequent runs use the cached model and run fully offline.

## Notes

- Works for dishes from any country or cuisine since the model has broad general knowledge.
- The model stays loaded in memory between requests, so only the very first request after starting the server includes model load time.

## License

MIT