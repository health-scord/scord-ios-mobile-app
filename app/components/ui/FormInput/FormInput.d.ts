export interface FormInputProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  label: string;
  placeholder: string;
  name: string;
  type: string;
  error: any;
  value: any;
  setFieldValue: any;
  secureTextEntry: any;
  style: any;
}
