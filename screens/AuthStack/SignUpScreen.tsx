import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { Text, Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { AuthStackParamList } from "./AuthStackScreen";
import firebase from "firebase";

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, "SignUpScreen">;
}

export default function SignUpScreen({ navigation }: Props) {
  // Login details.
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // Loading state for submit button
  const [loading, setLoading] = useState(false);

  // Code for snackbar
  // https://callstack.github.io/react-native-paper/snackbar.html
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const showError = (error: any) => {
    setMessage(error);
    setVisible(true);
  };

  const signUp = async () => {
    if (userEmail === "") {
      showError("Please enter an email.");
    } else if (userPassword === "") {
      showError("Please enter a password.");
    } else {
      setLoading(true);
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(userEmail, userPassword);
      } catch (error) {
        showError(error.message);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps="never"
          alwaysBounceVertical={false}
        >

          <Text style={{marginTop: 60, marginBottom: 30, textAlign: 'center', fontSize: 30, fontFamily: 'American Typewriter'}}>
            RateMySchedule
          </Text>

          <Text style={ {fontFamily: "American Typewriter", fontStyle: 'normal', fontWeight:'400', fontSize: 17, marginTop: 15, marginBottom: 2} }>
          Email:
          </Text>

          <TextInput
            value={userEmail}
            onChangeText={(text) => setUserEmail(text)}
            style={{  backgroundColor: '#FFFFFF',
            height: 50,
            marginTop: 10,
            marginBottom: 15,
            alignContent: 'center',
            borderRadius: 15,
            borderTopEndRadius: 15,
            borderTopLeftRadius: 15,
            borderWidth: 1, 
            borderStyle: 'solid',
            borderColor: '#D0D4D9', }}
          />

<         Text style={ {fontFamily: "American Typewriter", fontStyle: 'normal', fontWeight:'400', fontSize: 17, marginTop: 20, marginBottom: 2} }>
          Password:
          </Text>

          <TextInput
            value={userPassword}
            secureTextEntry={true}
            onChangeText={(text) => setUserPassword(text)}
            style={{  backgroundColor: '#FFFFFF',
            height: 50,
            marginTop: 10,
            marginBottom: 15,
            alignContent: 'center',
            borderRadius: 15,
            borderTopEndRadius: 15,
            borderTopLeftRadius: 15,
            borderWidth: 1, 
            borderStyle: 'solid',
            borderColor: '#D0D4D9', }}
          />
          <Button
            mode="contained"
            onPress={signUp}
            style={{ marginTop: 20, 
              width: 300,
              alignSelf: 'center',
              borderColor: 'black',
              borderWidth: 1,
              shadowColor: 'black',
              shadowRadius: 8,
              shadowOffset: {width: 5, height: 10},
              backgroundColor: '#C4C4C4', 
              marginBottom: 20 }}
            loading={loading}
            dark={true}
          >
            Create an Account
          </Button>
          <Button
            onPress={() => navigation.navigate("SignInScreen")}
            style={{ marginTop: 20 }}
            color = '#003262'
          >
            OR, SIGN IN INSTEAD
          </Button>
        </ScrollView>
        <Snackbar visible={visible} onDismiss={() => setVisible(false)} style={{marginBottom: 50}}>
          {message}
        </Snackbar>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: '#003262',
    fontWeight: "bold",
    fontSize: 30,
  }
});
