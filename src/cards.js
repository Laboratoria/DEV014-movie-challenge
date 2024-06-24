export function createCards(dataResult, onMovieClick) {
  const ulElement = document.createElement('ul');
  ulElement.classList.add('movie-grid');

  dataResult.forEach(item => {
    const liElement = document.createElement('li');
    liElement.classList.add('card');
    liElement.addEventListener('click', () => onMovieClick(item.id));

    const imagePoster = document.createElement('img');
    imagePoster.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    imagePoster.alt = item.original_title;
    imagePoster.classList.add('poster');

    const originalTitle = document.createElement('h2');
    originalTitle.textContent = item.original_title;

    const releaseYear = item.release_date.split('-')[0];
    const releaseDate = document.createElement('p');
    releaseDate.textContent = releaseYear;

    liElement.appendChild(imagePoster);
    liElement.appendChild(originalTitle);
    liElement.appendChild(releaseDate);
    ulElement.appendChild(liElement);
  });
  return ulElement;
}
