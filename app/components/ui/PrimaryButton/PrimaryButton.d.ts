export interface PrimaryButtonProps {
  ref?: React.Ref<any>;
  className?: string;
  onPress?: (e: MouseEvent) => void;
  label: string;
  style?: any;
}
