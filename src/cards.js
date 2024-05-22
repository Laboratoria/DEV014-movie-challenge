export function createCards(dataResult) {
  const divRoot = document.getElementById('root');
  const ulElement = document.createElement('ul');
  ulElement.classList.add('movie-grid'); // Añade la clase para el grid

  divRoot.innerHTML = ''; // Elimina todos los hijos del nodo 'root'

  dataResult.forEach(item => {
    const liElement = document.createElement('li');
    liElement.classList.add('card');

    const imagePoster = document.createElement('img');
    imagePoster.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    imagePoster.alt = item.original_title;
    imagePoster.classList.add('poster'); // Añado la clase para el estilo de la imagen

    const originalTitle = document.createElement('h2'); // Creo los elementos de HTML para el contenido de cada item
    originalTitle.textContent = item.original_title;

    const releaseYear = item.release_date.split('-')[0];// Necesito mostrar solo el año de release_date, no la fecha completa
    const releaseDate = document.createElement('p');
    releaseDate.textContent = releaseYear;

    liElement.appendChild(imagePoster);
    liElement.appendChild(originalTitle);
    liElement.appendChild(releaseDate);
    ulElement.appendChild(liElement);
  });

  divRoot.appendChild(ulElement); // Añade la lista al div root
}
