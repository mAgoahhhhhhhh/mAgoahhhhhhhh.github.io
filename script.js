document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize the Swiper Image Slider
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        effect: 'fade', // A nice cross-fade effect
        fadeEffect: {
            crossFade: true
        },
    });

    // 2. Handle Form Submission Securely
    const form = document.getElementById('contact-form');
    const feedbackEl = document.getElementById('form-feedback');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default browser submission

        const submitButton = form.querySelector('.form__submit-btn');
        
        // --- Get form data ---
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;
        const facebook = document.getElementById('facebook').value;
        const instagram = document.getElementById('instagram').value;
        const twitter = document.getElementById('twitter').value;

        // --- Simple validation ---
        if (!name || !message) {
            showFeedback('Please fill out your name and message.', 'error');
            return;
        }
        
        // --- Show loading state ---
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
        hideFeedback();

        try {
            // --- Send data to our secure serverless function ---
            // NOTE: The URL '/api/create-issue' depends on your hosting setup.
            // This is a common path for Vercel or Netlify functions.
            const response = await fetch('/api/create-issue', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, message, facebook, instagram, twitter }),
            });

            if (!response.ok) {
                // If server returns an error, throw an error to be caught below
                throw new Error(`Server responded with status: ${response.status}`);
            }

            // --- Handle success ---
            const result = await response.json();
            showFeedback('Thank you! Your message has been sent.', 'success');
            form.reset(); // Clear the form fields

        } catch (error) {
            // --- Handle errors (network or server-side) ---
            console.error('Submission error:', error);
            showFeedback('Sorry, something went wrong. Please try again later.', 'error');

        } finally {
            // --- Reset button state ---
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        }
    });

    // --- Helper functions for user feedback ---
    function showFeedback(message, type) {
        feedbackEl.textContent = message;
        feedbackEl.className = type; // 'success' or 'error'
        feedbackEl.style.display = 'block';
    }

    function hideFeedback() {
        feedbackEl.style.display = 'none';
    }
});