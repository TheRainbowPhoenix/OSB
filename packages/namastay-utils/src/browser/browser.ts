export function isInIframe() {
  try {
    if (typeof window === 'undefined') return true;
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
