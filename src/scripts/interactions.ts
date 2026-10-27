const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktopQuery = window.matchMedia('(min-width: 1000px)');

function openProjectFromHash() {
  let id: string;
  try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
  if (!id) return;
  const project = document.getElementById(id);
  if (!project?.matches('[data-project]')) return;
  const details = project.querySelector('details');
  if (details) details.open = true;
  requestAnimationFrame(() => project.scrollIntoView({ block: 'start', behavior: 'instant' }));
}

openProjectFromHash();
window.addEventListener('hashchange', openProjectFromHash);

document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    if (link.hash === window.location.hash) openProjectFromHash();
  });
});

document.querySelectorAll<HTMLButtonElement>('.close-project').forEach(button => {
  button.addEventListener('click', () => {
    const details = button.closest('details');
    if (!details) return;
    const summary = details.querySelector('summary');
    details.open = false;
    summary?.focus({ preventScroll: true });
    summary?.scrollIntoView({ block: 'center', behavior: 'instant' });
  });
});

const layers = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
let scheduled = false;
function updateLayers() {
  const enabled = !motionQuery.matches && desktopQuery.matches;
  const offset = Math.min(window.scrollY, 1000);
  for (const layer of layers) {
    layer.style.translate = enabled ? `0 ${offset * Number(layer.dataset.parallax)}px` : '';
  }
  scheduled = false;
}
function scheduleLayers() {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateLayers); }
}
window.addEventListener('scroll', scheduleLayers, { passive: true });
motionQuery.addEventListener('change', updateLayers);
desktopQuery.addEventListener('change', updateLayers);
updateLayers();

let printState: boolean[] = [];
window.addEventListener('beforeprint', () => {
  const details = [...document.querySelectorAll('details')];
  printState = details.map(item => item.open);
  details.forEach(item => { item.open = true; });
});
window.addEventListener('afterprint', () => {
  document.querySelectorAll('details').forEach((item, i) => { item.open = printState[i] ?? false; });
});
