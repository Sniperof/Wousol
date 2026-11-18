// Designer handoff: only the function of the widget's `voices.ts` that the landing's read-aloud preview calls.
// The widget's own file holds more. Read-only: never edit this file or merge it back.

/**
 * An on-device voice for `language`: the same tag first, else the same primary language. A voice
 * the browser reports as remote is never used, so DAP sends no page text anywhere (spec AC38).
 */
export function voiceFor(
  voices: readonly SpeechSynthesisVoice[],
  language: string,
): SpeechSynthesisVoice | null {
  const local = voices.filter((voice) => voice.localService);
  const wanted = normalised(language);
  const primary = primaryOf(wanted);
  return (
    local.find((voice) => normalised(voice.lang) === wanted) ??
    local.find((voice) => primaryOf(normalised(voice.lang)) === primary) ??
    null
  );
}

/** Android reports tags such as `ar_SA`. */
function normalised(tag: string): string {
  return tag.replace('_', '-').toLowerCase();
}

function primaryOf(tag: string): string {
  return tag.split('-')[0] ?? '';
}
