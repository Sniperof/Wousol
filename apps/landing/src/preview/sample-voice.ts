import { voiceFor } from '../../../../packages/sdk/src/features/read-aloud/voices';

const naturalRank = 2;
const defaultRank = 1;
function rank(voice: SpeechSynthesisVoice): number {
  if (/enhanced|premium|natural/i.test(`${voice.name} ${voice.voiceURI}`)) return naturalRank;
  return voice.default ? defaultRank : 0;
}
export function sampleVoice(synth: SpeechSynthesis, language: string): SpeechSynthesisVoice | null {
  const voices = [...synth.getVoices()].sort((left, right) => rank(right) - rank(left));
  return voiceFor(voices, language);
}
