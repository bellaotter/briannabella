import { StyleSheet } from "react-native";
import { AppStyles } from "../../../AppStyles";

export const styles = StyleSheet.create({
  ...AppStyles,
  header: {
    backgroundColor: '#C4C4C4',
  },
  inputBar: {
    backgroundColor: '#FFFFFF',
    height: 50,
    marginTop: 10,
    marginBottom: 15,
    alignContent: 'center',
    borderRadius: 15,
    borderTopEndRadius: 15,
    borderTopLeftRadius: 15,
    borderWidth: 1, 
    borderStyle: 'solid',
    borderColor: '#D0D4D9',
  
  },
  Button: {
    marginTop: 20, 
    fontFamily: "American Typewriter",
    borderColor: 'black',
    borderWidth: 1,
    shadowColor: 'black',
    shadowRadius: 8,
    shadowOffset: {width: 5, height: 10},
    backgroundColor: '#C4C4C4', 
    marginBottom: 20, 
    color: '#fff'
    
  },
  Text: {
    fontFamily: "American Typewriter",
    fontStyle: 'normal',
    fontWeight:'400',
    fontSize: 20,
    marginTop: 15,
    marginBottom: 2
  }
});
