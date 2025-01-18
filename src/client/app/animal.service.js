/*
    Name: Tinu Basil
    filename: app.js
    Course: INFT 2202
    Date: 10 jan 2025
    Description: This is my general application script.  Functions that are required on every page should live here.
*/

function AnimalService() {
    if (!localStorage) {
        console.error('Local storage is not supported in this browser.');
        alert('This application requires local storage to work properly.');
        return;
    }

    if (!localStorage.getItem('animals')) {
        localStorage.setItem('animals', JSON.stringify([]));
    }
}
