document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM READY");

    const forms = document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', (event) => {
            console.log("FORM SUBMIT");

            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        });
    });
});