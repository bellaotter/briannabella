import React from "react";
import { StyleSheet } from "react-native";
import { AppStyles } from "../../../../AppStyles";

export const styles = StyleSheet.create({
  ...AppStyles,
  view: {
    flex: 1,
    margin: 20,
  },
  subtitle: {
    color: "gray",
  },
  image: {
    height: 200,
    width: "100%",
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#003262',
  },
  texting: {
    color: '#FDB515',
    justifyContent: 'center',
    marginTop: 70,
    alignItems: 'center',
    marginLeft: 113,
    fontSize: 30,
    fontWeight:'bold',
    fontStyle: 'italic'
    
  }
});
