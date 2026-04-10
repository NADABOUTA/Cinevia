// ---- Données ----

const filmsAction = [
  { titre: "La Casa de Papel", image: "images/FILM3.jfif",    description: "Un braquage spectaculaire à Madrid",    categorie: "Action" },
  { titre: "Dune",             image: "images/film1.jpg",     description: "Un héros sur une planète désertique",   categorie: "Action" },
  { titre: "John Wick",        image: "images/JOHN WIK.avif", description: "Un ancien tueur à gages se venge",      categorie: "Action" },
  { titre: "Mad Max",          image: "images/MAD MAX.webp",  description: "Survie dans un monde post-apocalyptique", categorie: "Action" },
  { titre: "Spider-Man",       image: "images/FILM4.webp",    description: "Un lycéen devient un super-héros",      categorie: "Action" }
];

const filmsDrama = [
  { titre: "La Casa de Papel", image: "images/FILM3.jfif",   description: "Tension et trahison à chaque épisode", categorie: "Drama" },
  { titre: "Dune",             image: "images/film1.jpg",    description: "Épopée épique dans le désert",          categorie: "Drama" },
  { titre: "Inception",        image: "images/FILM 5.webp",  description: "Un voleur entre dans les rêves",        categorie: "Drama" },
  { titre: "Avatar",           image: "images/AVATAR.jpg",   description: "Un monde extraterrestre",               categorie: "Drama" }
];


// ---- Favoris ----

let favoris = [];

function ajouterFavori(film) {
  if (favoris.find(f => f.titre === film.titre)) return;
  favoris.push(film);
  afficherFavoris();
}

function supprimerFavori(titre) {
  favoris = favoris.filter(f => f.titre !== titre);
  afficherFavoris();
}


// ---- Modal ----

function ouvrirModal(film) {
  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("modal-img").src = film.image;
  document.getElementById("modal-title").textContent = film.titre;
  document.getElementById("modal-desc").textContent = film.description;
  document.getElementById("modal-cat").textContent = film.categorie;

  const btnFav = document.getElementById("modal-btn-fav");
  const dejaAjoute = favoris.find(f => f.titre === film.titre);

  if (dejaAjoute) {
    btnFav.textContent        = "♥ Déjà dans les favoris";
    btnFav.style.background   = "#555";
  } else {
    btnFav.textContent        = "♥ Ajouter aux favoris";
    btnFav.style.background   = "#e50914";
  }

  btnFav.onclick = () => {
    ajouterFavori(film);
    btnFav.textContent      = "♥ Ajouté aux favoris";
    btnFav.style.background = "#555";
  };
}

function fermerModal() {
  document.getElementById("modal").classList.add("hidden");
}


// ---- Cartes ----

function createCard(film, isFavori = false) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${film.image}" alt="${film.titre}">
    <div class="card-info">
      <h3>${film.titre}</h3>
      <p>${film.description}</p>
    </div>
    <div class="card-buttons">
      <button class="btn-details">Voir détails</button>
      <button class="btn-fav ${isFavori ? "active" : ""}">
        ${isFavori ? "✕ Supprimer" : "♡ Favori"}
      </button>
    </div>
  `;

  card.querySelector(".btn-details").addEventListener("click", () => ouvrirModal(film));

  const btnFav = card.querySelector(".btn-fav");
  if (isFavori) {
    btnFav.addEventListener("click", () => supprimerFavori(film.titre));
  } else {
    btnFav.addEventListener("click", () => ajouterFavori(film));
  }

  return card;
}


// ---- Affichage ----

function afficherFilms(liste, id) {
  const conteneur = document.getElementById(id);
  conteneur.innerHTML = "";
  liste.forEach(film => conteneur.appendChild(createCard(film)));
}

function afficherFavoris() {
  const conteneur = document.getElementById("favoris-container");
  conteneur.innerHTML = "";

  if (favoris.length === 0) {
    conteneur.innerHTML = "<p class='empty-msg'>Aucun favori.</p>";
    return;
  }

  favoris.forEach(film => conteneur.appendChild(createCard(film, true)));
}


// ---- Filtres ----

function initFiltres() {
  const boutons  = document.querySelectorAll(".filters button");
  const sections = document.querySelectorAll(".movies[data-section]");

  boutons.forEach(btn => {
    btn.addEventListener("click", () => {
      boutons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filtre = btn.dataset.filter;
      sections.forEach(section => {
        section.classList.toggle(
          "hidden",
          filtre !== "tous" && section.dataset.section !== filtre
        );
      });
    });
  });
}


// ---- Recherche ----

document.querySelector(".navbar input").addEventListener("input", function () {
  const value = this.value.toLowerCase();

  afficherFilms(
    filmsAction.filter(film => film.titre.toLowerCase().includes(value)),
    "action-container"
  );
  afficherFilms(
    filmsDrama.filter(film => film.titre.toLowerCase().includes(value)),
    "drama-container"
  );
});


// ---- Fermeture modal ----

document.addEventListener("click", e => {
  if (e.target.id === "modal") fermerModal();
});

document.getElementById("close-modal").onclick = fermerModal;


// ---- Démarrage ----

afficherFilms(filmsAction, "action-container");
afficherFilms(filmsDrama,  "drama-container");
initFiltres();