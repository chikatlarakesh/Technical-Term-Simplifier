require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- /api/extract: as before ---
app.post('/api/extract', async (req, res) => {
  console.log('📥 Received request at /api/extract');
  const { text } = req.body;
  if (!text || !text.trim()) {
    console.warn('⚠️ No text provided');
    return res.status(400).json({ error: 'No text provided' });
  }

  console.log('📝 Extracting text:', text.slice(0, 100), '...');
  try {
    const params = new URLSearchParams();
    params.append('extractors', 'entities,topics,words');
    params.append('text', text);

    console.log('🚀 Sending request to TextRazor API...');
    const response = await axios.post(
      'https://api.textrazor.com',
      params,
      {
        headers: {
          'x-textrazor-key': process.env.TEXT_RAZOR_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
    );

    console.log('✅ Response received from TextRazor');
    const rawWords = response.data.response?.words || [];
    const entities = response.data.response?.entities || [];
    const topics = response.data.response?.topics || [];

    console.log(`📦 Extracted ${rawWords.length} words, ${entities.length} entities, ${topics.length} topics`);

    const words = rawWords.map(w => w.token);
    const entityNames = entities.map(e => e.matchedText);
    const topicNames = topics.map(t => t.label);

    // dedupe
    const combined = [...new Set([ ...words, ...entityNames, ...topicNames ])];
    console.log('🧹 Final unique list:', combined.slice(0,10), '...');

    res.json({ words: combined });
  } catch (err) {
    console.error('❌ Error during extraction:', err.response?.data || err.message);
    res.status(500).json({ error: 'Extraction failed' });
  }
});

// --- NEW /api/define: fetch definitions ---
app.post('/api/define', async (req, res) => {
  console.log('📥 Received request at /api/define');
  const { words } = req.body;
  if (!Array.isArray(words) || words.length === 0) {
    console.warn('⚠️ No words provided');
    return res.status(400).json({ error: 'No words provided' });
  }

  const results = [];
  for (const word of words) {
    try {
      console.log(`🔍 Fetching definition for "${word}"`);
      const resp = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
      const entry = resp.data[0];
      const def = entry.meanings?.[0]?.definitions?.[0]?.definition || 'No definition found';
      results.push({ word, definition: def });
    } catch {
      console.warn(`⚠️ Definition not found for "${word}"`);
      results.push({ word, definition: 'Definition not available' });
    }
  }

  res.json({ definitions: results });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`▶️ Server listening on http://localhost:${PORT}`));
