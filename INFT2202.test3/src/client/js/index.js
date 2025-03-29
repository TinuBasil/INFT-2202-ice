document.addEventListener("DOMContentLoaded", () => {
    const genreSelector = document.getElementById("genre-selector");
    const ratingSelector = document.getElementById("rating-selector");
    const table = document.getElementById("movies-table");
    const alertMessage = document.getElementById("no-movies-alert");

    // Static movie database
    const moviesData = [
        { name: "Inception", genre: "Sci-Fi", releaseDate: 1277942400, director: "Christopher Nolan", rating: 9 },
        { name: "The Godfather", genre: "Drama", releaseDate: 1004486400, director: "Francis Ford Coppola", rating: 10 },
        { name: "Superbad", genre: "Comedy", releaseDate: 1186012800, director: "Greg Mottola", rating: 7 },
        { name: "Paranormal Activity", genre: "Horror", releaseDate: 1224201600, director: "Oren Peli", rating: 5 },
        { name: "Mad Max: Fury Road", genre: "Action", releaseDate: 1430438400, director: "George Miller", rating: 8 }
    ];

    function insertMoviesIntoTable(movies) {
        const tbody = table.querySelector("tbody");
        tbody.innerHTML = "";

        if (movies.length === 0) {
            alertMessage.classList.remove("d-none");
            table.classList.add("d-none");
            return;
        }

        alertMessage.classList.add("d-none");
        table.classList.remove("d-none");

        movies.forEach(movie => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${movie.name}</td>
                <td>${movie.genre}</td>
                <td>${new Date(movie.releaseDate * 1000).toLocaleDateString()}</td>
                <td>${movie.director}</td>
                <td>${movie.rating}</td>
            `;

            // Apply color coding based on rating
            if (movie.rating <= 2) row.style.backgroundColor = "red";
            else if (movie.rating <= 5) row.style.backgroundColor = "orange";
            else if (movie.rating <= 8) row.style.backgroundColor = "blue";
            else row.style.backgroundColor = "green";

            tbody.appendChild(row);
        });
    }

    function updateMovies() {
        const genre = genreSelector.value;
        const rating = parseInt(ratingSelector.value) || 0;

        // Filter movies based on selected genre and rating
        const filteredMovies = moviesData.filter(movie => 
            (genre === "" || movie.genre === genre) &&
            (rating === 0 || movie.rating >= rating)
        );

        insertMoviesIntoTable(filteredMovies);
    }

    genreSelector.addEventListener("change", updateMovies);
    ratingSelector.addEventListener("change", updateMovies);

    updateMovies();
});
