import { fetchMovieDetails } from './Api.js';

export async function showMovieDetails(apiKey, movieId) {
    const movieDetails = await fetchMovieDetails(apiKey, movieId);
    if (!movieDetails) return;

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('movie-details');

    detailsDiv.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movieDetails.poster_path}" alt="${movieDetails.original_title}" class="poster">
        <div class="info">
            <h2>${movieDetails.original_title}</h2>
            <p><strong>Año de estreno:</strong> ${movieDetails.release_date.split('-')[0]}</p>
            <p><strong>Género:</strong> ${movieDetails.genres.map(genre => genre.name).join(', ')}</p>
            <p><strong>Voto promedio:</strong> ${movieDetails.vote_average}</p>
            <p><strong>Votos totales:</strong> ${movieDetails.vote_count}</p>
            <button id="backButton">Volver a la lista</button>
        </div>
    `;

    const root = document.getElementById('root');
    root.innerHTML = ''; // Limpiar
    root.appendChild(detailsDiv);

    document.getElementById('backButton').addEventListener('click', () => {
        window.location.reload();
    });
}
