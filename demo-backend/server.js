//import express, { static } from 'express';
import express from 'express';
import { readdir } from 'fs';
import { join } from 'path';
import cors from 'cors';

const VITE_PORT = 5173;

const app = express();
const __dirname = import.meta.dirname;

app.use(cors({
  origin: `http://localhost:${VITE_PORT}`,
  // credentials: true // if you use cookies or sessions
}));

// API route to get file names
app.get('/api/list-files/:artistName/:albumName', (req, res) => {

  console.log(`got GET req on: ${req.params.artistName}/${req.params.albumName}`);
  let FOLDER_PATH = join(__dirname, '..', 'lofium-react-front', 'public','artists', req.params.artistName, req.params.albumName);

  readdir(FOLDER_PATH, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read directory' });
    }
    console.log(files);
    res.status(200).json({ files });
  });
});

// Also serve static files from public
//app.use(static(join(__dirname, 'public')));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend listening at http://localhost:${PORT}`);
});
