import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    padding: 10,
    marginTop: 8,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    // remove color here — use colors.text from ThemeContext
  },
});
