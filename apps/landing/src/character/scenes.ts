export const featureScenes = ['sign-language', 'read-aloud', 'reading', 'navigation'] as const;
export type CharacterScene = (typeof featureScenes)[number];

export interface CharacterPersona {
  readonly gender: 'female' | 'male';
  readonly style: 'blazer' | 'cardigan' | 'turtleneck' | 'bomber';
}

const personas: Record<CharacterScene, CharacterPersona> = {
  'sign-language': { gender: 'female', style: 'blazer' },
  'read-aloud': { gender: 'male', style: 'cardigan' },
  reading: { gender: 'female', style: 'turtleneck' },
  navigation: { gender: 'male', style: 'bomber' },
};

export function personaFor(scene: CharacterScene): CharacterPersona {
  return personas[scene];
}
