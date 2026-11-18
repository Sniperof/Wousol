interface Group {
  readonly title: string;
  readonly body: string;
}
export type SolutionKind = 'widget' | 'services' | 'tailored';
export interface Messages {
  readonly languageName: string;
  readonly siteName: string;
  readonly skipToContent: string;
  readonly meta: { readonly title: string; readonly description: string };
  readonly nav: {
    readonly menu: string;
    readonly features: string;
    readonly installation: string;
    readonly demo: string;
    readonly requestDemo: string;
    readonly signLanguage: string;
    readonly label: string;
  };
  readonly hero: {
    readonly title: string;
    readonly lede: string;
  };
  readonly preview: {
    readonly textSizeHint: string;
    readonly label: string;
    readonly title: string;
    readonly body: string;
    readonly voice: {
      readonly play: string;
      readonly stop: string;
      readonly loading: string;
      readonly speaking: string;
      readonly finished: string;
      readonly unavailable: string;
      readonly failed: string;
      readonly sample: string;
    };
    readonly signTitle: string;
    readonly signBody: string;
  };
  readonly solutions: {
    readonly title: string;
    readonly intro: string;
    readonly illustrations: Readonly<Record<SolutionKind, string>>;
    readonly cards: readonly {
      readonly kind: SolutionKind;
      readonly title: string;
      readonly body: string;
      readonly action: string;
    }[];
  };
  readonly features: {
    readonly title: string;
    readonly intro: string;
    readonly groups: readonly Group[];
  };
  readonly installation: {
    readonly title: string;
    readonly intro: string;
    readonly steps: readonly Group[];
    readonly snippet: string;
    readonly caption: string;
    readonly previewLabel: string;
    readonly preferencesTitle: string;
  };
  readonly privacy: {
    readonly title: string;
    readonly body: string;
    readonly points: readonly string[];
  };
  readonly final: {
    readonly contact: string;
    readonly title: string;
    readonly body: string;
    readonly subject: string;
  };
  readonly footer: {
    readonly note: string;
    readonly byline: string;
    readonly navLabel: string;
  };
}
