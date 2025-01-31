import { movies } from "../data/movies.js";

// Selectors
const allMoviesTable = document.querySelector("#all-movies-container table");
const allMoviesAlert = document.querySelector("#all-movies-container .alert");
const allMoviesBody = allMoviesTable.querySelector("tbody");

const pinnedMoviesTable = document.querySelector("#pinned-movies-container table");
const pinnedMoviesAlert = document.querySelector("#pinned-movies-container .alert");
const pinnedMoviesBody = pinnedMoviesTable.querySelector("tbody");

// Retrieve pinned movies from local storage
function getPinnedMoviesFromStorage() {
    return JSON.parse(localStorage.getItem("pinnedMovies")) || [];
}

// Save pinned movies to local storage
function savePinnedMoviesToStorage(movies) {
    localStorage.setItem("pinnedMovies", JSON.stringify(movies));
}

// Insert movies into the specified table
function insertMoviesIntoTable(tableBody, movies, isPinnedTable = false) {
    tableBody.innerHTML = ""; // Clear existing rows
    movies.sort((a, b) => b.rating - a.rating); // Sort by rating (highest first)

    movies.forEach((movie) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.genre}</td>
            <td>${new Date(movie.datetime * 1000).toLocaleDateString()}</td>
            <td>${movie.director}</td>
            <td>${movie.rating}</td>
            <td>
                <button class="btn ${isPinnedTable ? 'btn-danger' : 'btn-primary'}" data-title="${movie.title}">
                    <i class="fa ${isPinnedTable ? 'fa-times' : 'fa-thumbtack'}"></i>
                </button>
            </td>
        `;

        // Apply row color based on rating
        applyRatingColor(row, movie.rating);

        // Add event listener to pin/unpin button
        row.querySelector("button").addEventListener("click", () => togglePin(movie));
    });
}

// Apply row color based on rating
function applyRatingColor(row, rating) {
    if (rating <= 2) row.style.backgroundColor = "red";
    else if (rating <= 5) row.style.backgroundColor = "orange";
    else if (rating <= 8) row.style.backgroundColor = "blue";
    else row.style.backgroundColor = "green";
}

// Toggle pin status for a movie
function togglePin(movie) {
    let pinnedMovies = getPinnedMoviesFromStorage();
    const isPinned = pinnedMovies.some((m) => m.title === movie.title);

    if (isPinned) {
        pinnedMovies = pinnedMovies.filter((m) => m.title !== movie.title);
    } else {
        pinnedMovies.push(movie);
    }

    savePinnedMoviesToStorage(pinnedMovies);
    refreshTables();
}

// Refresh tables after changes
function refreshTables() {
    const pinnedMovies = getPinnedMoviesFromStorage();

    // Update All Movies Table
    updateTable(allMoviesTable, allMoviesAlert, allMoviesBody, movies);

    // Update Pinned Movies Table
    updateTable(pinnedMoviesTable, pinnedMoviesAlert, pinnedMoviesBody, pinnedMovies, true);
}

// Update a table based on data availability
function updateTable(tableElement, alertElement, tableBody, data, isPinnedTable = false) {
    if (data.length > 0) {
        tableElement.classList.remove("d-none");
        alertElement.classList.add("d-none");
        insertMoviesIntoTable(tableBody, data, isPinnedTable);
    } else {
        tableElement.classList.add("d-none");
        alertElement.classList.remove("d-none");
    }
}

// Initial Load
refreshTables();