const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const htmlParserAgent = require('./agents/HTMLParserAgent');
const componentPlannerAgent = require('./agents/ComponentPlannerAgent');
const tailwindNormalizerAgent = require('./agents/TailwindNormalizerAgent');
const jsxConverterAgent = require('./agents/JSXConverterAgent');
const stateAnalyzerAgent = require('./agents/StateAnalyzerAgent');
const reactComponentWriterAgent = require('./agents/ReactComponentWriterAgent');
const optimizationAgent = require('./agents/OptimizationAgent');
const finalReviewerAgent = require('./agents/FinalReviewerAgent');
const fileWriterAgent = require('./agents/FileWriterAgent');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.post('/convert', async (req, res) => {
  try {
    const { html } = req.body;

    const parsed = await htmlParserAgent(html);
    const planned = await componentPlannerAgent(parsed);
    const tailwinded = await tailwindNormalizerAgent(planned);
    const jsx = await jsxConverterAgent(tailwinded);
    const withState = await stateAnalyzerAgent(jsx);
    const written = await reactComponentWriterAgent(withState);
    const optimized = await optimizationAgent(written);
    const reviewed = await finalReviewerAgent(optimized);

    console.log('--- Final reviewed code ---');
    console.log(reviewed);

    const files = await fileWriterAgent(reviewed);

    res.json({files});
  } catch (err) {
    console.error(err);
    res.status(500).send('Conversion failed.');
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});