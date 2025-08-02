import { createContext } from "react";

let globalContext = createContext({
  chosenArtist: null,
  chosenAlbum: null,
  chosenSong: null,
  tree: {}, //a nested object of artist -> album -> song
})

export default globalContext;
