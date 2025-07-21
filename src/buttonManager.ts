// Button creation and management logic for DID Agent

const buttonContainerClass = "didagent__main__container";
const buttonClasses =
  "didagent__chat__toggle didagent__button didagent__button__controller didagent__button__dark";

// Function to create button
const createCustomButton = (): boolean => {
  // Look for shadow DOM hosts that might contain our container
  const shadowHosts = document.querySelectorAll("*");
  let buttonContainer: Element | null = null;

  for (const host of shadowHosts) {
    if (host.shadowRoot) {
      buttonContainer = host.shadowRoot.querySelector(
        `.${buttonContainerClass}`
      );
      if (buttonContainer) {
        break;
      }
    }
  }

  // Also try regular DOM as fallback
  if (!buttonContainer) {
    buttonContainer = document.querySelector(`.${buttonContainerClass}`);
  }

  if (buttonContainer) {
    const button = document.createElement("button");
    button.className = buttonClasses;

    // Set onclick action - handle optional interrupt function safely
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const interruptFn = (window as any).DID_AGENTS_API?.functions?.interrupt;
    if (interruptFn) {
      button.onclick = interruptFn;
    }

    // Add x.svg content to button
    button.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
              d="M5.37568 5.46967C5.66857 5.17678 6.14344 5.17678 6.43634 5.46967L11.906 10.9394L17.3757 5.46972C17.6686 5.17683 18.1434 5.17683 18.4363 5.46972C18.7292 5.76261 18.7292 6.23749 18.4363 6.53038L12.9667 12L18.4363 17.4696C18.7292 17.7625 18.7292 18.2374 18.4363 18.5303C18.1434 18.8232 17.6685 18.8232 17.3756 18.5303L11.906 13.0607L6.43639 18.5303C6.14349 18.8232 5.66862 18.8232 5.37573 18.5303C5.08283 18.2374 5.08283 17.7626 5.37573 17.4697L10.8454 12L5.37568 6.53033C5.08278 6.23744 5.08278 5.76256 5.37568 5.46967Z"
              fill="white" />
      </svg>
    `;

    // Append button to container
    buttonContainer.appendChild(button);
    return true; // Success
  }
  return false; // Container not found
};

// Function to start the button creation process
export const startButtonCreation = (): void => {
  // Try to add button every 100ms until successful
  const interval = setInterval(() => {
    if (createCustomButton()) {
      clearInterval(interval);
    }
  }, 100);

  // Safety timeout - stop trying after 10 seconds
  setTimeout(() => {
    clearInterval(interval);
  }, 20000);
};
