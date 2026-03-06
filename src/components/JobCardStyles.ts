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
    // ⭐ Removed marginTop: 8 since the parent row container now handles the spacing
    alignItems: 'center',
    justifyContent: 'center', // ⭐ Added this to ensure the text stays perfectly vertically centered
    borderRadius: 5,
  },
  buttonText: {
    // remove color here — use colors.text from ThemeContext (or inline as you have it in JobCard.tsx)
    fontWeight: '600', // ⭐ Optional: Makes the button text pop a little more!
  },
});