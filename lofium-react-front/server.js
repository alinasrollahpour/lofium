//import express, { static } from 'express';
import express from 'express';
import { readdir } from 'fs';
import { join } from 'path';

const app = express();
// assuming foo is in public

// API route to get file names
app.get('/api/list-files/:artistName/:albumName', (req, res) => {

  let FOLDER_PATH = join(__dirname, 'public', req.params.artistName, req.params.albumName); 

  readdir(FOLDER_PATH, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read directory' });
    }
    res.json({ files });
  });
});

// Also serve static files from public
//app.use(static(join(__dirname, 'public')));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend listening at http://localhost:${PORT}`);
});
