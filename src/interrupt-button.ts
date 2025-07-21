const DID_AGENT_TARGET_CLASS = "didagent_target";
const BUTTON_TEXT = "Click to interrupt";

export function observeInterruptButton() {
  const hostContainer = document.querySelector(
    `.${DID_AGENT_TARGET_CLASS} > div`
  );

  if (!hostContainer || !hostContainer.shadowRoot) {
    setTimeout(() => observeInterruptButton(), 500);
    return;
  }

  const shadowRoot = hostContainer.shadowRoot;

  updateInterruptButtonText(shadowRoot);

  const mutationObserver = new MutationObserver(() => {
    updateInterruptButtonText(shadowRoot);
  });

  mutationObserver.observe(shadowRoot, { childList: true, subtree: true });
}

function updateInterruptButtonText(shadowRoot: ShadowRoot) {
  const interruptButton = shadowRoot.querySelector(
    ".didagent__button__response__active"
  ) as HTMLSpanElement | null;

  if (!interruptButton || interruptButton?.textContent === BUTTON_TEXT) {
    return false;
  }

  interruptButton.textContent = BUTTON_TEXT;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const interruptFunction = (window as any).DID_AGENTS_API?.functions
    ?.interrupt;

  if (interruptFunction && interruptButton.onclick !== interruptFunction) {
    interruptButton.onclick = interruptFunction;
  }

  return true;
}
