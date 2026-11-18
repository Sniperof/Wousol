import type { Messages } from '../messages';

export const enVoice: Messages['preview']['voice'] = {
  play: 'Play sample',
  stop: 'Stop reading',
  loading: 'Preparing your voice…',
  speaking: 'Reading the sample…',
  finished: 'A little more comfortable. Your way.',
  unavailable: 'An English voice is not available on this device.',
  failed: 'The sample could not play. Try again.',
  sample: 'Welcome to Wosoul. A clearer view, a calmer place to read. Explore the web your way.',
};
