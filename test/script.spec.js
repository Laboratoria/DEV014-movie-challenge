import { createCards } from "../src/cards.js";

describe("createCards", () => {
  test("creates movie cards", () => {
    document.body.innerHTML = `<div id="root"></div>`;
    //cuando no encuentres el div root, te condicionaré para que lo pases o 
    const data = [
      { original_title: "Movie 1", poster_path: "/path1.jpg", release_date: "2023-05-01" },
      { original_title: "Movie 2", poster_path: "/path2.jpg", release_date: "2022-04-01" }
    ];

    const root = document.getElementById("root");
    const resultados = createCards(data, () => { });
    root.appendChild(resultados); // Añade la lista al div root
    const ul = root.querySelector("ul.movie-grid");
    expect(ul).not.toBeNull();
    expect(ul.children.length).toBe(2);

    const firstCard = ul.children[0];
    expect(firstCard.querySelector("h2").textContent).toBe("Movie 1");
    expect(firstCard.querySelector("img").src).toContain("/path1.jpg");
    expect(firstCard.querySelector("p").textContent).toBe("2023");

    const secondCard = ul.children[1];
    expect(secondCard.querySelector("h2").textContent).toBe("Movie 2");
    expect(secondCard.querySelector("img").src).toContain("/path2.jpg");
    expect(secondCard.querySelector("p").textContent).toBe("2022");
  });
});
