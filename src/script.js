import { fetchMovies } from "./Api.js";
import { createCards } from "./cards.js";

const key = "09e6da3af06aae9bf2a911affce95600";
fetchMovies(key)
  .then(movies => {
    createCards(movies);
    console.log("Resultó", movies);
  })
  .catch(error => {
    console.error("Error fetching movies:", error);
  });
