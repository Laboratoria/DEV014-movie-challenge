// Api.js
export async function fetchMovies(apiKey, page = 1, genre = '', sortBy = 'popularity.desc') {
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}&with_genres=${genre}&sort_by=${sortBy}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Hubo un problema con la solicitud fetch:', error);
    return { results: [], total_pages: 1 };
  }
}

export async function fetchGenres(apiKey) {
  const apiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error('Hubo un problema con la solicitud fetch:', error);
    return [];
  }
}

export async function fetchMovieDetails(apiKey, movieId) {
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Hubo un problema con la solicitud fetch:', error);
    return null;
  }
}
