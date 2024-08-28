// On page load, check localStorage for theme preference
function onPageLoaded() {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const storedTheme = localStorage.getItem('theme') || systemTheme;

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