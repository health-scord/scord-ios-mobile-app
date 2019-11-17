export interface MetaInputProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  label: string;
  type: string;
  value: any;
  details?: any;
  formProps: any;
  clickable?: boolean;
  extraText?: string;
  extraComp?: any;
  defaultOpen?: boolean;
  selectItems?: any;
  defaultItem?: any;
  componentId?: string;
  name: string;
}
