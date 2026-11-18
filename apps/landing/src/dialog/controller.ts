export interface ModalDialog {
  open(opener: HTMLElement | null): void;
}

/**
 * Native modal behavior shared by requests and plan features. The browser supplies focus containment,
 * Escape and the inert background; this adds what it does not:
 * - a click on the backdrop closes it, but only when the press began there too, so dragging a text selection out of a
 *   field and letting go outside does not;
 * - focus goes back to the link that opened it (Safari does not focus a link on click, so the browser's own return can
 *   miss it);
 * - the page behind stops scrolling while it is open (`data-dialog-open` on the root, styled in dialog.css).
 */
export function createDialog(dialog: HTMLDialogElement, signal?: AbortSignal): ModalDialog | null {
  if (typeof dialog.showModal !== 'function') return null;
  const page = dialog.ownerDocument.documentElement;
  const options = signal ? { signal } : undefined;
  let opener: HTMLElement | null = null;
  let pressedOnBackdrop = false;

  dialog.addEventListener(
    'pointerdown',
    (event) => {
      pressedOnBackdrop = event.target === dialog;
    },
    options,
  );
  dialog.addEventListener(
    'click',
    (event) => {
      if (event.target === dialog && pressedOnBackdrop) dialog.close();
      pressedOnBackdrop = false;
    },
    options,
  );
  for (const button of dialog.querySelectorAll<HTMLElement>('[data-close]'))
    button.addEventListener(
      'click',
      () => {
        dialog.close();
      },
      options,
    );
  dialog.addEventListener(
    'close',
    () => {
      if (!dialog.ownerDocument.querySelector('dialog[open]'))
        page.removeAttribute('data-dialog-open');
      if (opener?.isConnected) opener.focus({ preventScroll: true });
      opener = null;
    },
    options,
  );

  return {
    open: (from) => {
      if (dialog.open) return;
      opener = from;
      page.setAttribute('data-dialog-open', '');
      dialog.showModal();
    },
  };
}
