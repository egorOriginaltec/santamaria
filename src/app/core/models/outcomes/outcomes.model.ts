export interface OutcomeItem {
  readonly id: number;
  readonly code: string;
  readonly title: string;
  readonly text: string;
  /** Optional short demo video path, e.g. `/assets/outcomes/maps.mp4` */
  readonly videoSrc?: string;
  readonly videoPoster?: string;
}
