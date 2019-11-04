export interface SearchInputProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  phrase: string;
  setPhrase: any;
  onSearch: any;
  debounce?: number;
  type?: string;
  placeholder?: string;
}
