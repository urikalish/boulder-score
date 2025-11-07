function checkPWASupport() {
    if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('App is running in standalone mode');
    }
    window.addEventListener('beforeinstallprompt', (event) => {
        console.log('App can be installed');
        event.preventDefault();
        window.deferredPrompt = event;
    });
    window.addEventListener('appinstalled', () => {
        console.log('App was installed successfully');
    });
}
function setViewportHeight() {
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
}
window.addEventListener('error', (event) => {
    console.error('An error occurred:', event.error);
});
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});
document.addEventListener('DOMContentLoaded', () => {
    checkPWASupport();
    setViewportHeight();
    showUI();
});
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(registration => {
            console.log('Service Worker registered:', registration);
        })
        .catch(error => {
            console.log('Service Worker registration failed:', error);
        });
}
