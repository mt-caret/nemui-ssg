//import '!style!css!../vendor/highlight.js/highlight.min.css';
import '../css/main.css';

document.addEventListener('DOMContentLoaded', () => {
  const about = document.getElementById('about');
  const text = document.getElementById('about-text');
  about.addEventListener('click', (e) => {
    e.preventDefault();
    text.style.display = text.style.display === 'none' ? 'inline' : 'none';
  });
});

