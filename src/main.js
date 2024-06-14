import { fetchMovies } from './Api.js';
import { createCards } from './cards.js';
import { showMovieDetails } from './details.js';

const apiKey = "09e6da3af06aae9bf2a911affce95600";

const state = {
  currentPage: 1
};

async function loadMovies(page) {
  const data = await fetchMovies(apiKey, page);
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

  // Botón "Anterior"
  if (state.currentPage > 1) {
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.addEventListener('click', () => {
      state.currentPage--;
      loadMovies(state.currentPage);
    });
    paginationDiv.appendChild(prevButton);
  }

  // Botones de páginas
  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.classList.toggle('active', i === state.currentPage);
    pageButton.addEventListener('click', () => {
      if (i !== state.currentPage) {
        state.currentPage = i;
        loadMovies(state.currentPage);
      }
    });
    paginationDiv.appendChild(pageButton);
  }

  // Botón "Siguiente"
  if (state.currentPage < totalPages) {
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', () => {
      state.currentPage++;
      loadMovies(state.currentPage);
    });
    paginationDiv.appendChild(nextButton);
  }

  return paginationDiv;
}

loadMovies(state.currentPage);
