
import {getTree} from "./utils.js";
import express from 'express';
import {readdir} from 'fs';
import {join} from 'path';
import cors from 'cors';

const VITE_PORT = 5173;

let tree = null;


const app = express();
const __dirname = import.meta.dirname;
const artistsFolderPath = join(__dirname, 'artists');

console.log('im here!')
//asynchronously browse the 'artists' folder and make the object 'tree'
//based on that then serve the 'tree'
getTree(artistsFolderPath).then((t) => {
  tree = t;
})

app.use(cors({
  origin: `http://localhost:${VITE_PORT}`,
  // credentials: true // if you use cookies or sessions
}));
console.log(artistsFolderPath)

// with these two lines (keep them exactly where the original line was, so ordering is unchanged):
app.use('/lib', (req, res, next) => {
  // prevent caches and revalidation from client/proxy
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.use('/lib', express.static(artistsFolderPath, {
  etag: false,
  lastModified: false,
  cacheControl: false,
  setHeaders(res /*, path, stat */) {
    // make sure express/send doesn't add caching headers back
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
}));


app.get('/',
  (req, res) => {
    res.status(200).send('Demo Backend');
  }
)
//to get the global tree
app.get('/api/tree',
  async (req, res) => {
    console.log('got GET req on /api/tree');
    if (tree === null) {
      res.status(404).send('Tree not loaded yet!');
    }
    res.status(200).json(tree)
  })

// API route to get file names
app.get('/api/list-files/:artistName/:albumName',
  async (req, res) => {

    console.log(`got GET req on: ${req.params.artistName}/${req.params.albumName}`);
    let FOLDER_PATH = join(__dirname, '..', 'frontend', 'public', 'artists', req.params.artistName, req.params.albumName);

    readdir(FOLDER_PATH, (err, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({error: 'Failed to read directory'});
      }
      console.log(files);
      res.status(200).json({files});
    });
  });

// Also serve static files from public
//app.use(static(join(__dirname, 'public')));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend listening at http://localhost:${PORT}`);
});
