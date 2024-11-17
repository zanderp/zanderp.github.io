import React from 'react';

function Contact() {
    return (
        <section className="contact-section">
            <h2>Contact Me</h2>
            <form action="https://formspree.io/f/{your_formspree_id}" method="POST">
                <input type="email" name="email" placeholder="Your email" required />
                <textarea name="message" placeholder="Your message" required></textarea>
                <button type="submit">Send</button>
            </form>
            <p>Or reach me at: hello@alexandru.rocks</p>
            <p>GitHub: github.com/zanderp</p>
            <p>Instagram: @zander_pope</p>
        </section>
    );
}

export default Contact;
