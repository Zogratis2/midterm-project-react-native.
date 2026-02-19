import React from 'react';
import { View, TextInput } from 'react-native';
import styles from './SearchBarStyles';

interface Props {
  search: string;
  setSearch: (text: string) => void;
}

const SearchBar: React.FC<Props> = ({ search, setSearch }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by Job Title..."
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />
    </View>
  );
};

export default SearchBar;
