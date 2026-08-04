/* js/navigation.js */
import { updateRoute } from './router.js';

document.addEventListener('click', (e) => {
  const trigger = e.target.closest('a[data-area], button[data-area]');
  if (trigger) {
    e.preventDefault();
    const area = trigger.getAttribute('data-area');
    updateRoute(area);
  }
});
