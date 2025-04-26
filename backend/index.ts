import express from 'express';
import axios from 'axios';
import { JSDOM } from 'jsdom';

const app = express();
const PORT = 3000;

// enable cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// api endpoint
app.get('/api/scrape', async (req, res) => {
  try {
    const { keyword, page = '1' } = req.query; // Novo parâmetro de página
    if (!keyword) return res.status(400).json({ error: 'Keyword required' });

    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}&page=${page}`;
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      'Accept-Language': 'en-US,en;q=0.9',
    };
    
    const response = await axios.get(url, { headers });
    const dom = new JSDOM(response.data);

    const products = Array.from(
      dom.window.document.querySelectorAll('div[data-component-type="s-search-result"]')
    );

    const results = products.map(product => ({
      title: product.querySelector('h2 span')?.textContent?.trim() || 'N/A',
      rating: product.querySelector('.a-icon-alt')?.textContent?.split(' ')[0] || 'N/A',
      reviews: product.querySelector('.a-size-base.s-underline-text')?.textContent?.trim() || '0',
      imageUrl: product.querySelector('img.s-image')?.src || ''
    }));

    res.json(results);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return res.status(502).json({ 
        error: 'Failed to fetch Amazon data',
        details: error.message
      });
    }
    console.error(`[${new Date().toISOString()}] Error:`, error);
    res.status(500).json({ 
      error: 'Internal server error'
    });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));