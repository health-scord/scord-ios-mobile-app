export interface CalloutProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  title: string;
  intent: string;
}
