import React from 'react';
import { View, TextInput } from 'react-native';
import styles from './SearchBarStyles';
import { useThemeContext } from '../context/ThemeContext';

interface Props {
  search: string;
  setSearch: (text: string) => void;
  placeholderTextColor?: string;
  inputBackgroundColor?: string;
  inputTextColor?: string;
}

const SearchBar: React.FC<Props> = ({
  search,
  setSearch,
  placeholderTextColor,
  inputBackgroundColor,
  inputTextColor,
}) => {
  const { colors, isDark } = useThemeContext();

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by Job Title..."
        value={search}
        onChangeText={setSearch}
        placeholderTextColor={placeholderTextColor || colors.text}
        style={[
          styles.input,
          {
            backgroundColor: inputBackgroundColor || colors.card,
            color: inputTextColor || colors.text,
            borderColor: isDark ? '#fff' : '#000', // ✅ white in dark, black in light
            borderWidth: 1,
          },
        ]}
      />
    </View>
  );
};

export default SearchBar;
