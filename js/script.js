document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector("#searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const errorMessage = document.querySelector(".errorMessage");
  const movieContainer = document.querySelector(".movieContainer");
  let movieName = "";

  const getMovieData = async () => {
    movieName = searchInput.value;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer API KEY",
      },
    };

    if (movieName) {
      errorMessage.style.visibility = "hidden";
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${movieName}`,
          options
        );
        const data = await response.json();
        console.log("movieee", data.results);
        renderMovies(data.results);
      } catch (error) {
        console.log("Error : ", error);
      }
    } else {
      errorMessage.style.visibility = "visible";
      movieContainer.textContent = "";
    }
  };

  const createElement = (movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.className = "movie";

    const movieImage = document.createElement("img");
    movieImage.className = "movieImage";
    movieImage.src = `https://image.tmdb.org/t/p/original${movie.poster_path}`;

    const movieData = document.createElement("div");
    movieData.className = "movieData";

    const movieTitle = document.createElement("h1");
    movieTitle.className = "movieTitle";
    movieTitle.textContent = movie.original_title;

    const movieReleaseDate = document.createElement("h3");
    movieReleaseDate.className = "movieReleaseDate";
    movieReleaseDate.textContent = `Release Date : ${movie.release_date}`;

    const movieOverview = document.createElement("p");
    movieOverview.className = "movieOverview";
    movieOverview.textContent = movie.overview;

    movieData.append(movieTitle);
    movieData.append(movieReleaseDate);
    movieData.append(movieOverview);

    movieDiv.append(movieImage);
    movieDiv.append(movieData);
    movieContainer.append(movieDiv);
  };

  const renderMovies = (movies) => {
    movieContainer.textContent = "";
    movies?.map((movie) => {
      createElement(movie);
    });
  };

  searchBtn.addEventListener("click", () => {
    getMovieData();
  });
});
