import express from 'express';
import { loadModel, completion, LLAMA_3_2_1B_INST_Q4_0 } from '@qvac/sdk';

const app = express();
app.use(express.json());
app.use(express.static('public'));

console.log('Loading language model, please wait...');
const modelId = await loadModel({
  modelSrc: LLAMA_3_2_1B_INST_Q4_0,
  onProgress: (p) => process.stderr.write(`Downloading model: ${p.percentage?.toFixed(0)}%\r`)
});
console.log('\nModel loaded. Server ready.');

app.post('/recipe', async (req, res) => {
  try {
    const dish = (req.body.dish || '').trim();
    if (!dish) {
      return res.status(400).json({ error: 'Dish name cannot be empty' });
    }

    console.log(`Generating recipe for: "${dish}"`);
    console.time('recipe-generation-time');

    const history = [
      {
        role: 'user',
        content: `Give me a complete recipe for "${dish}". Include a short intro about which cuisine it's from, a list of ingredients with quantities, and numbered step-by-step cooking instructions.`
      }
    ];

    const result = completion({ modelId, history, stream: true });

    res.set('Content-Type', 'text/plain; charset=utf-8');
    for await (const token of result.tokenStream) {
      res.write(token);
    }
    res.end();

    console.timeEnd('recipe-generation-time');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});