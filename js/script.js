//INDEX
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validación
    if (!emailRegex.test(email)) {
        showError('Por favor, introduce un correo electrónico válido.');
        return;
    }
    
    // Simular envío (en un caso real sería una petición AJAX)
    setTimeout(() => {
        // Mostrar modal de éxito
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        document.getElementById('successMessage').textContent = `¡Gracias por suscribirte con ${email}!`;
        successModal.show();
        
        // Resetear formulario
        this.reset();
        
        // Guardar en localStorage
        localStorage.setItem('subscribedToNewsletter', 'true');
    }, 800); // Pequeño retraso para simular procesamiento
});

// Función para mostrar errores de forma elegante
function showError(message) {
    const errorToast = `
        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header bg-danger text-white">
                    <strong class="me-auto">Error</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        </div>
    `;
    
    // Crear y mostrar el toast
    const toastContainer = document.createElement('div');
    toastContainer.innerHTML = errorToast;
    document.body.appendChild(toastContainer);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        toastContainer.remove();
    }, 5000);
}

// Cerrar toast al hacer click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-close')) {
        e.target.closest('.position-fixed').remove();
    }
});








