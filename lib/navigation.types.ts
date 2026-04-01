export type NavItem = {
  label: string;
  href: string;
};

export type ExtraNavItem = {
  label: string;
  href: string;
  variant:
    | "link"
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | null
    | undefined;
};
