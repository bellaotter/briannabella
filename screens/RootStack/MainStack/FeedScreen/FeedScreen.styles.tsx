import { StyleSheet } from "react-native";
import { AppStyles } from "../../../../AppStyles";

export const styles = StyleSheet.create({
  ...AppStyles,
  header: {
    backgroundColor: '#C4C4C4',
    fontFamily: "American Typewriter",
    fontSize: 20
  },
  content: {
    fontFamily: 'American Typewriter',
    fontSize: 35
  },
  card: {
    height: 276,
    margin: 16, 
    borderRadius: 24, 
    borderTopEndRadius: 24,
    borderTopLeftRadius: 24,
    backgroundColor: '#E5E5E5',
    shadowRadius: 4,
    shadowColor: '#000000',
    shadowOffset: {width: 5, height: 10},
  },
  cover: {
    height: 144,
    marginLeft: 10,
    marginRight: 10
  },
  title: {
    fontFamily: 'American Typewriter',
    fontSize: 20
  }

});
