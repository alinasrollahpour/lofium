import { createContext } from "react";

let GlobalContext = createContext({
  chosenArtist: null,
  chosenAlbum: null,
  chosenSong: null,
  tree: {}, //a nested object of artist -> album -> song
})

export default GlobalContext;
