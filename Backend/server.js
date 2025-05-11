require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

console.log("MongoDB URI from .env:", process.env.MONGODB_URI); 

// --- /api/extract: Extract entities, topics, and words ---
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

    const combined = [...new Set([ ...words, ...entityNames, ...topicNames ])];
    console.log('🧹 Final unique list:', combined.slice(0,10), '...');

    res.json({ words: combined });
  } catch (err) {
    console.error('❌ Error during extraction:', err.response?.data || err.message);
    res.status(500).json({ error: 'Extraction failed' });
  }
});

// --- /api/define: Fetch definitions for each word ---
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

// --- /api/check-db: Check DB Connection ---
app.get('/api/check-db', async (req, res) => {
  try {
    const db = mongoose.connection;
    const admin = db.db.admin();
    const status = await admin.ping();
    res.json({ status: 'success', message: 'Database is connected', ping: status });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Database connection failed', error: err.message });
  }
});

console.log('📦 MongoDB URI:', process.env.MONGODB_URI);

// Connect to the database
connectDB();

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`▶️ Server listening on http://localhost:${PORT}`));
