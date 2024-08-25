// On page load, check localStorage for theme preference
function onPageLoaded() {
    const storedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-bs-theme', storedTheme)
    localStorage.setItem('theme', storedTheme);
}

function switchTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', newTheme)
    localStorage.setItem('theme', newTheme);
}

export {onPageLoaded, switchTheme};