/** Move keyboard focus with a hash jump, without changing the browser's normal scrolling. */
function focusDestination(link: HTMLAnchorElement): void {
  if (link.origin !== location.origin || link.pathname !== location.pathname || !link.hash) return;
  const target = document.getElementById(link.hash.slice(1));
  if (!target) return;
  if (!target.hasAttribute('tabindex')) {
    target.setAttribute('tabindex', '-1');
    target.addEventListener(
      'blur',
      () => {
        target.removeAttribute('tabindex');
      },
      { once: true },
    );
  }
  target.focus({ preventScroll: true });
}

/** Keep keyboard order aligned with the compact row and the links beneath it. */
function arrangeLinks(root: HTMLElement, trigger: HTMLElement, compact: boolean): void {
  const navigation = root.querySelector('#site-navigation');
  const request = root.querySelector('#site-request');
  if (!navigation) return;
  if (compact) {
    trigger.after(navigation);
    if (request) navigation.after(request);
    return;
  }
  root.insertBefore(navigation, root.querySelector('.site-language') ?? trigger);
  if (request) trigger.before(request);
}

interface Menu {
  readonly root: HTMLElement;
  readonly trigger: HTMLButtonElement;
  readonly compact: MediaQueryList;
  readonly close: (returnFocus?: boolean) => void;
}

function watchLayout({ root, trigger, compact, close }: Menu): void {
  // Hiding a control can blur it before the media-query change event is delivered.
  let lastFocused: HTMLElement | null = null;
  document.addEventListener('focusin', (event) => {
    lastFocused =
      event.target instanceof HTMLElement && root.contains(event.target) ? event.target : null;
  });
  document.addEventListener('pointerdown', (event) => {
    if (event.target instanceof Node && !root.contains(event.target)) lastFocused = null;
  });
  compact.addEventListener('change', () => {
    const focused = document.activeElement === document.body ? lastFocused : document.activeElement;
    const withinHeader = root.contains(focused);
    const onTrigger = focused === trigger;
    arrangeLinks(root, trigger, compact.matches);
    if (document.querySelector('dialog[open]')) {
      root.toggleAttribute('data-menu-open', compact.matches);
      trigger.setAttribute('aria-expanded', String(compact.matches));
      return;
    }
    close(withinHeader && compact.matches);
    if (onTrigger && !compact.matches) root.querySelector<HTMLAnchorElement>('a')?.focus();
    else if (withinHeader && !compact.matches && focused instanceof HTMLElement) focused.focus();
  });
}

function watchDismissal({ root, trigger, compact, close }: Menu): void {
  const canDismiss = (): boolean =>
    compact.matches &&
    root.hasAttribute('data-menu-open') &&
    !document.querySelector('dialog[open]');
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || event.defaultPrevented || !canDismiss()) return;
    event.preventDefault();
    close(true);
  });
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element) || !canDismiss()) return;
    if (!root.contains(event.target)) {
      close(root.contains(document.activeElement));
      return;
    }
    const link = event.target.closest<HTMLAnchorElement>('a[href]');
    // The enquiry dialog returns focus here when it closes; keep its opener visible.
    if (!link || link.hasAttribute('data-request-kind')) return;
    close();
    focusDestination(link);
  });
  watchLayout({ root, trigger, compact, close });
}

/** Enhance only this header; without this script its original links remain available. */
export function mountSiteNavigation(): void {
  const root = document.querySelector<HTMLElement>('[data-site-header]');
  const trigger = root?.querySelector<HTMLButtonElement>('[data-site-menu]');
  if (!root || !trigger || root.hasAttribute('data-menu-ready')) return;
  const compact = matchMedia('(max-width: 63.9375rem)');
  const setOpen = (open: boolean, returnFocus = false): void => {
    root.toggleAttribute('data-menu-open', open);
    trigger.setAttribute('aria-expanded', String(open));
    if (returnFocus) trigger.focus({ preventScroll: true });
  };
  trigger.addEventListener('click', () => {
    setOpen(!root.hasAttribute('data-menu-open'));
  });
  watchDismissal({
    root,
    trigger,
    compact,
    close: (focus = false) => {
      setOpen(false, focus);
    },
  });
  trigger.hidden = false;
  arrangeLinks(root, trigger, compact.matches);
  root.setAttribute('data-menu-ready', '');
}
