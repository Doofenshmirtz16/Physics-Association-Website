document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");
    const submitBtn = document.getElementById("submit-btn");
    const messageDiv = document.getElementById("form-message");

    form.addEventListener("submit", async function(e) {
        e.preventDefault();
        
        messageDiv.textContent = '';
        messageDiv.className = 'form-message';
        
        const formData = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            subject: form.subject.value.trim(),
            message: form.message.value.trim()
        };
        
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showMessage('Please fill in all fields', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        try {
            const response = await fetch('/submit-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData)
            });
            
            const data = await response.json();
            
            if (data.success) {
                showMessage('Thank you! Your message has been successfully submitted.', 'success');
                form.reset();
            } else {
                showMessage(data.error || 'Error submitting form. Please try again.', 'error');
            }
        } catch (error) {
            showMessage('Network error. Please check your connection and try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
    
    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `form-message ${type}`;
    }
});