// Función para mostrar las secciones según el menú
function showSection(sectionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));

    // Mostrar la sección seleccionada
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }
}

// Manejo del formulario de contacto
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validación simple del formulario
    if (name && email && message) {
        document.getElementById('formMessage').innerText = `Gracias por contactarme, ${name}. He recibido tu mensaje.`;
        this.reset(); // Resetear el formulario
    } else {
        document.getElementById('formMessage').innerText = "Por favor, completa todos los campos.";
    }
});

// Mostrar la sección inicial
showSection('home');
