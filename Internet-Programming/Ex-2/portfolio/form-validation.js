// Form validation function
function validateContactForm() {
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();
    var error = '';
    if (name === '') error += 'Name is required.\n';
    if (email === '' || !email.includes('@')) error += 'Valid email is required.\n';
    if (message === '') error += 'Message is required.';
    if (error) {
        alert(error);
        return false;
    }
    return true;
}
