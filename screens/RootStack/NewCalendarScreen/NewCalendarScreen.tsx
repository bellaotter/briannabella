import React, { useState, useEffect } from "react";
import { Platform, View } from "react-native";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { getFileObjectAsync } from "../../../Utils";

// See https://docs.expo.io/versions/latest/sdk/imagepicker/
// Most of the image picker code is directly sourced from the example
import * as ImagePicker from "expo-image-picker";
import { styles } from "./NewCalendarScreen.styles";

import firebase from "firebase/app";
import "firebase/firestore";
import { CalendarModel } from "../../../models/calendar";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackScreen";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "NewCalendarScreen">;
}

export default function NewCalendarScreen({ navigation }: Props) {
  // Event details.

  const [postedDate, setPostedDate] = useState("May 20, 2020");
  const [caption, setCaption] = useState("");
  const [calTitle, setCalTitle] = useState("");
  const [eventImage, setEventImage] = useState<string | undefined>(undefined);



  const [visible, setVisible] = useState(false);
  // Snackbar.
  const [message, setMessage] = useState("");
  // Loading state for submit button
  const [loading, setLoading] = useState(false);

  // Code for ImagePicker (from docs)
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  // Code for ImagePicker (from docs)
  const pickImage = async () => {
    console.log("picking image");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("done");
    if (!result.cancelled) {
      setEventImage(result.uri);
    }
  };


  // Code for SnackBar (from docs)
  const onDismissSnackBar = () => setVisible(false);
  const showError = (error: string) => {
    setMessage(error);
    setVisible(true);
  };

  // This method is called AFTER all fields have been validated.
  const saveEvent = async () => {
    if (!calTitle) {
      showError("Please enter a Title.");
      return;
    } else if (!caption) {
      showError("Please enter a caption.");
      return;
    } else if (!eventImage) {
      showError("Please choose an event image.");
      return;
    } else {
      setLoading(true);
    }

    try {
      // Firestore wants a File Object, so we first convert the file path
      // saved in eventImage to a file object.
      console.log("getting file object");
      const object: Blob = (await getFileObjectAsync(eventImage)) as Blob;
      // Generate a brand new doc ID by calling .doc() on the calendarss node.
      const calendarRef = firebase.firestore().collection("calendars").doc();
      console.log("putting file object");
      const result = await firebase
        .storage()
        .ref()
        .child(calendarRef.id + ".jpg")
        .put(object);
      console.log("getting download url");
      const downloadURL = await result.ref.getDownloadURL();
      const doc: CalendarModel = {
        calImage: downloadURL,
        calTitle: calTitle,
        caption: caption,
        id: "55555",
        owner: firebase.auth().currentUser!.uid,
        postedDate: postedDate,
      };
      console.log("setting download url");
      await calendarRef.set(doc);
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      console.log("Error: " + error.toString());
      setLoading(false);
      showError(error.toString());
    }
  };

  const Bar = () => {
    return (
      <Appbar.Header style = {{backgroundColor: '#003262'}}>
        <Appbar.Action onPress={navigation.goBack} icon="close" />
        <Appbar.Content title="Calendars" />
      </Appbar.Header>
    );
  };

  return (
    <>
      <Bar />
      <View style={{ ...styles.container, padding: 20 }}>
        <TextInput
          label="Title"
          value={calTitle}
          onChangeText={(title) => setCalTitle(title)}
          style={{ backgroundColor: "white", marginBottom: 10 }}
        />
        <TextInput
          label="Caption"
          value={caption}
          onChangeText={(caption) => setCaption(caption)}
          style={{ backgroundColor: "white", marginBottom: 10 }}
        />
        
        <Button mode="outlined" onPress={pickImage} 
          color = '#003262'
          style={{ marginTop: 20, borderRadius: 15, backgroundColor: '#FDB515', marginBottom:10 }}>
          {eventImage ? "Change Image" : "Upload an image of your schedule"}
        </Button>
        <Button
          mode="contained"
          onPress={saveEvent}
          color = '#003262'
          style={{ marginTop: 20, borderRadius: 15, backgroundColor: '#FDB515', marginBottom:10 }}
          loading={loading}
          
        >
          Save Event
        </Button>
        <Snackbar
          duration={3000}
          visible={visible}
          onDismiss={onDismissSnackBar}
        >
          {message}
        </Snackbar>
      </View>
    </>
  );
}
