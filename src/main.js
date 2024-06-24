import { fetchMovies, fetchGenres } from './Api.js';
import { createCards } from './cards.js';
import { showMovieDetails } from './details.js';

const apiKey = "09e6da3af06aae9bf2a911affce95600";

const state = {
  currentPage: 1,
  selectedGenre: '',
  sortBy: 'popularity.desc'
};

async function loadGenres() {
  const genres = await fetchGenres(apiKey);
  const genreSelect = document.getElementById('genreSelect');
  genres.forEach(genre => {
    const option = document.createElement('option');
    option.value = genre.id;
    option.textContent = genre.name;
    genreSelect.appendChild(option);
  });
}

async function loadMovies() {
  const { currentPage, selectedGenre, sortBy } = state;
  const data = await fetchMovies(apiKey, currentPage, selectedGenre, sortBy);
  const divRoot = document.getElementById('root');
  divRoot.innerHTML = ''; // Clear the root

  const resultados = createCards(data.results, handleMovieClick);
  divRoot.appendChild(resultados);

  const pagination = createPagination(data.total_pages, state.currentPage);
  divRoot.appendChild(pagination);
}

function handleMovieClick(movieId) {
  showMovieDetails(apiKey, movieId);
}

function handleGenreChange(event) {
  state.selectedGenre = event.target.value;
  state.currentPage = 1;
  loadMovies();
}

function handleSortChange(event) {
  state.sortBy = event.target.value;
  state.currentPage = 1;
  loadMovies();
}

function createPagination(totalPages, currentPage) {
  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('pagination');

  const maxPagesToShow = 10;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  if (state.currentPage > 1) {
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.addEventListener('click', () => {
      state.currentPage--;
      loadMovies();
    });
    paginationDiv.appendChild(prevButton);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.classList.toggle('active', i === state.currentPage);
    pageButton.addEventListener('click', () => {
      if (i !== state.currentPage) {
        state.currentPage = i;
        loadMovies();
      }
    });
    paginationDiv.appendChild(pageButton);
  }

  if (state.currentPage < totalPages) {
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', () => {
      state.currentPage++;
      loadMovies();
    });
    paginationDiv.appendChild(nextButton);
  }

  return paginationDiv;
}

document.getElementById('genreSelect').addEventListener('change', handleGenreChange);
document.getElementById('sortSelect').addEventListener('change', handleSortChange);

loadGenres();
loadMovies();
