/** Opens the floating TransactAI mentor drawer with an optional pre-filled prompt. */
export function openAIMentor(prompt?: string) {
  window.dispatchEvent(
    new CustomEvent('dtma:open-ai-mentor', { detail: { prompt } }),
  );
}
