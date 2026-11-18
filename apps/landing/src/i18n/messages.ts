export interface Group {
  readonly title: string;
  readonly body: string;
}
/** A visitor need: what it does, then who it helps, on a secondary line. */
export interface Need extends Group {
  readonly helps: string;
}
export interface Messages {
  readonly languageName: string;
  readonly siteName: string;
  readonly skipToContent: string;
  readonly meta: { readonly title: string; readonly description: string };
  readonly nav: {
    readonly menu: string;
    readonly features: string;
    readonly signLanguage: string;
    readonly installation: string;
    readonly dashboard: string;
    readonly liveDemo: string;
    readonly demo: string;
    readonly contact: string;
    readonly label: string;
  };
  readonly hero: {
    /** A line break splits the lead-in from the promise. */
    readonly title: string;
    readonly lede: string;
  };
  readonly preview: {
    readonly textSize: string;
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
  readonly visit: {
    readonly title: string;
    readonly intro: string;
    readonly cards: readonly Need[];
    readonly signLink: string;
  };
  readonly sign: {
    readonly title: string;
    readonly intro: string;
    readonly cards: readonly Group[];
    /** The badge on the call scene. */
    readonly live: string;
    readonly partner: string;
  };
  readonly benefits: {
    readonly title: string;
    readonly cards: readonly Group[];
    readonly source: string;
  };
  readonly installation: {
    readonly title: string;
    readonly intro: string;
    readonly request: Group;
    readonly steps: readonly Group[];
    readonly snippet: string;
    readonly caption: string;
    /** `{attribute}` marks where the attribute name appears, set as code. */
    readonly ignore: string;
    readonly previewLabel: string;
    readonly preferencesTitle: string;
  };
  readonly dashboard: {
    readonly title: string;
    readonly intro: string;
    readonly cards: readonly Group[];
  };
  readonly final: {
    readonly title: string;
    readonly reply: string;
    readonly email: string;
    readonly subject: string;
  };
  readonly footer: {
    readonly about: string;
    readonly navLabel: string;
    readonly badge: string;
    readonly note: string;
    readonly byline: string;
    readonly copyright: string;
  };
}
