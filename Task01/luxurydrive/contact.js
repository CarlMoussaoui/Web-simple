const CONTACT_CONFIRMATION_MESSAGE = '¡Gracias por tu mensaje! Te contactaremos en breve.';

const showContactConfirmation = () => {
    alert(CONTACT_CONFIRMATION_MESSAGE);
};

const handleContactSubmit = (event) => {
    event.preventDefault();
    const contactForm = event.currentTarget;
    // Here the form data would normally be sent to a server.
    showContactConfirmation();
    contactForm.reset();
};

const toggleFaqAnswer = (questionButton) => {
    const isExpanded = questionButton.getAttribute('aria-expanded') === 'true';
    questionButton.setAttribute('aria-expanded', String(!isExpanded));
};

const initContactForm = () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
};

const initFaqToggle = () => {
    const questionButtons = document.querySelectorAll('.faq-question');
    questionButtons.forEach((questionButton) => {
        questionButton.addEventListener('click', () => toggleFaqAnswer(questionButton));
    });
};

const initContactPage = () => {
    initContactForm();
    initFaqToggle();
};

document.addEventListener('DOMContentLoaded', initContactPage);
