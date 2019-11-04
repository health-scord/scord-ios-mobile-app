import * as React from "react";

import { SearchInputProps } from "./SearchInput.d";
import { View, TextInput } from "react-native";

import styles from "../../../../build/styles";

import Search from "../../../../assets/svg/search.svg";

const SearchInput: React.FC<SearchInputProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
  phrase = "",
  setPhrase = null,
  onSearch = null,
  debounce = 300,
  type = "grey",
  placeholder = "Search"
}) => {
  const clickHandler = e => onClick(e);

  const [lastKeyTime, setLastKeyTime] = React.useState(Date.now());

  const wrapperStyles = type === "white" ? styles.whiteWrapper : styles.greyWrapper;
  const inputStyles = type === "white" ? styles.whiteInput : styles.greyInput;
  const iconStyles = type === "white" ? styles.whiteIcon : styles.greyIcon;
  
  return (
    <View style={{ ...styles.searchInputWrapper, ...wrapperStyles }}>
      <TextInput 
        style={{ ...styles.searchInput, ...inputStyles }}
        placeholder={placeholder}
        selectTextOnFocus={true}
        value={phrase}
        onChangeText={(text) => {
          setLastKeyTime(Date.now());
          setPhrase(text);
          clearInterval(global["searchTimeout"]);
          global["searchTimeout"] = setTimeout(() => {
            if ((lastKeyTime + debounce) <= Date.now()) {
              onSearch(text);
            }
          }, debounce);
        }}
      />
      <View style={{ ...styles.searchInputIcon, ...iconStyles }}>
        <Search width="18" height="18" />
      </View>
    </View>
  );
};

export default SearchInput;
