export interface NavItem {
  readonly label: string;
  readonly path?: string;
  readonly exact?: boolean;
  readonly children?: readonly NavItem[];
}
