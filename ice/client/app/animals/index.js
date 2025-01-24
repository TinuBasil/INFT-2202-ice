// Import animalService (mocked service for now)
import animalService from "./animal.service.mock.js";

function animal() {
    const form = document.createElement('form');
    let description = 'Add Animal';

    // Create content for the form
    function createContent() {
        const container = document.createElement('div');
        container.classList.add('mb-2');

        // Add input fields for the form
        const fields = [
            { id: 'name', label: 'Animal Name' },
            { id: 'breed', label: 'Animal Breed' },
            { id: 'legs', label: 'Number of Legs' },
            { id: 'eyes', label: 'Number of Eyes' },
            { id: 'sound', label: 'Sound this animal makes' }
        ];

        fields.forEach(field => {
            const fieldDiv = document.createElement('div');
            fieldDiv.classList.add('mb-3');

            const label = document.createElement('label');
            label.setAttribute('for', field.id);
            label.classList.add('form-label');
            label.textContent = field.label;

            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('id', field.id);
            input.setAttribute('name', field.id);
            input.classList.add('form-control');

            const error = document.createElement('p');
            error.classList.add('text-danger', 'd-none');
            error.textContent = 'This field is required';

            fieldDiv.appendChild(label);
            fieldDiv.appendChild(input);
            fieldDiv.appendChild(error);

            container.appendChild(fieldDiv);
        });

        const submitButton = document.createElement('button');
        submitButton.setAttribute('type', 'submit');
        submitButton.classList.add('btn', 'btn-primary');
        submitButton.textContent = 'Save Animal';

        container.appendChild(submitButton);
        form.appendChild(container);

        return form;
    }

    // Form validation logic
    function validate() {
        let valid = true;
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            const error = input.nextElementSibling;
            if (!input.value.trim()) {
                error.classList.remove('d-none');
                valid = false;
            } else {
                error.classList.add('d-none');
            }
        });
        return valid;
    }

    // Form submission handler
    function submit() {
        if (validate()) {
            const animalData = {
                name: form.querySelector('#name').value.trim(),
                breed: form.querySelector('#breed').value.trim(),
                legs: form.querySelector('#legs').value.trim(),
                eyes: form.querySelector('#eyes').value.trim(),
                sound: form.querySelector('#sound').value.trim(),
            };

            // Save animal data using the animal service (mocked for now)
            animalService
                .addAnimal(animalData)
                .then(response => {
                    alert('Animal added successfully!');
                    form.reset(); // Clear the form after successful submission
                })
                .catch(error => {
                    console.error('Error adding animal:', error);
                    alert('Failed to add the animal. Please try again.');
                });
        }
    }

    // Assign handler to the submit event
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission
        submit();
    });

    return {
        description,
        element: createContent()
    };
}

export default animal;
