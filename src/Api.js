export async function fetchMovies(apiKey) {
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    //console.log('Response', response);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    //console.log('Data', data);
    return data.results;
  } catch (error) {
    //console.error('Hubo un problema con la solicitud fetch:', error);
    return [];
  }
}
