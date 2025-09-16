import express from 'express';
import cors from 'cors';
import path, { join } from 'path';
import { fileURLToPath } from 'url';
import { readdir } from 'fs';
import { getTree } from './utils.js';
import { log } from 'console';

const VITE_PORT = 5173;
let tree = null;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const artistsFolderPath = join(__dirname, 'artists');
const assetsFolderPath = join(__dirname, 'dist');

const app = express();

// --- Guard: detect accidental filesystem paths used as mount paths ---
const origAppUse = express.application.use;
express.application.use = function(...args) {
  const first = args[0];
  if (typeof first === 'string' && /^[A-Za-z]:[\\/]/.test(first)) {
    console.error('Invalid mount path (filesystem path passed as route):', first);
    // throw to stop startup and show stack to find caller
    throw new TypeError('Invalid mount path (filesystem path passed as route): ' + first);
  }
  return origAppUse.apply(this, args);
};

// load tree asynchronously
getTree(artistsFolderPath).then((t) => { tree = t; });

app.use(cors({
  origin: `http://localhost:${VITE_PORT}`
}));

app.use('/lib', express.static(artistsFolderPath));
//we have to also serve serve static the 'assets' folder
app.use(express.static(assetsFolderPath));

// specific routes first
app.get('/', (req, res) => res.status(200).sendFile(join(__dirname, 'dist', 'index.html')));

app.get('/api/tree', async (req, res) => {
  console.log('got GET req on /api/tree');
  if (tree === null) {
    return res.status(404).send('Tree not loaded yet!');
  }
  res.status(200).json(tree);
});

app.get('/api/list-files/:artistName/:albumName', async (req, res) => {
  console.log(`got GET req on: ${req.params.artistName}/${req.params.albumName}`);
  const FOLDER_PATH = join(__dirname, '..', 'frontend', 'public', 'artists', req.params.artistName, req.params.albumName);

  readdir(FOLDER_PATH, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read directory' });
    }
    console.log(files);
    res.status(200).json({ files });
  });
});
// console.log('#### im befor get(*)')
// SPA fallback — must be after other routes
// app.get('*', (req, res) => {                               //ERROR was here
//   res.sendFile(join(__dirname, 'dist', 'index.html'));
// });

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend listening at http://localhost:${PORT}`);
});
