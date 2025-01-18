/*
    Name: Tinu Basil
    filename: list.js
    Course: INFT 2202
    Date: 10th of jan 2025
    Description: This is my general application script.  Functions that are required on every page should live here.
*/

import { getAnimals } from './animals.service.js';

document.addEventListener('DOMContentLoaded', () => {
    const messageBox = document.getElementById('message-box');
    const animalsListTable = document.getElementById('animals-list');
    const tableBody = animalsListTable.querySelector('tbody');

    // Fetch and display the list of animals
    getAnimals().then(drawAnimalsTable);

    function drawAnimalsTable(animals) {
        if (animals.length > 0) {
            // Hide the message box and show the table
            messageBox.classList.add('d-none');
            animalsListTable.classList.remove('d-none');

            // Add rows for each animal
            animals.forEach(animal => {
                const row = tableBody.insertRow();

                // Add Owner cell
                const ownerCell = row.insertCell();
                ownerCell.textContent = animal.owner;

                // Add Details cell
                const detailsCell = row.insertCell();
                detailsCell.textContent = `${animal.breed}, ${animal.name}`;

                // Add Controls cell
                const controlsCell = row.insertCell();
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.className = 'btn btn-warning btn-sm me-2';
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'btn btn-danger btn-sm';
                controlsCell.append(editButton, deleteButton);
            });
        } else {
            // Show the message box and hide the table
            messageBox.classList.remove('d-none');
            animalsListTable.classList.add('d-none');
        }
    }
});