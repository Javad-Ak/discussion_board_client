// On page load, check localStorage for theme preference
document.addEventListener('DOMContentLoaded', function () {
    const storedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-bs-theme', storedTheme)
});