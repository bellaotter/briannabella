import React, { useState, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import { Appbar, Button, Card } from "react-native-paper";
import firebase from "firebase/app";
import "firebase/firestore";
import { CalendarModel } from "../../../../models/calendar.js";
import { styles } from "./FeedScreen.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../MainStackScreen.js";

/* 
  Remember the navigation-related props from Project 2? They were called `route` and `navigation`,
  and they were passed into our screen components by React Navigation automatically.  We accessed parameters 
  passed to screens through `route.params` , and navigated to screens using `navigation.navigate(...)` and 
  `navigation.goBack()`. In this project, we explicitly define the types of these props at the top of 
  each screen component.

  Now, whenever we type `navigation.`, our code editor will know exactly what we can do with that object, 
  and it'll suggest `.goBack()` as an option. It'll also tell us when we're trying to do something 
  that isn't supported by React Navigation!
*/
interface Props {
  navigation: StackNavigationProp<MainStackParamList, "FeedScreen">;
}

export default function FeedScreen({ navigation }: Props) {
  // List of calendar objects
  const [calendars, setCalendars] = useState<CalendarModel[]>([]);

  const currentUserId = firebase.auth().currentUser!.uid;

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db
      .collection("calendars")
      .orderBy("postedDate", "asc")
      .onSnapshot((querySnapshot) => {
        console.log("It worked");
        var newCalendars: CalendarModel[] = [];
        querySnapshot.forEach((calendar) => {
          const newCalendar = calendar.data() as CalendarModel;
          newCalendar.id = calendar.id;
          newCalendars.push(newCalendar);
        });
        setCalendars(newCalendars);
      });
    return unsubscribe;
  }, []);


 /* 
  const toggleInterested = (calendar: CalendarModel) => {
    if (!calendar.interested) {
      calendar.interested = {};
    }
    if (calendar.interested[currentUserId]) {
      calendar.interested[currentUserId] = false;
    } else {
      calendar.interested[currentUserId] = true;
    }

    firebase
      .firestore()
      .collection("calendars")
      .doc(calendar.id)
      .set({
        ...calendar,
        id: null,
      })
      .then(() => {})
      .catch((error) => {
        console.log("Error writing node:", error);
      });
  };
  */
  
  const deleteCalendar = (calendar: CalendarModel) => {
    firebase.firestore().collection("calendars").doc(calendar.id).delete();
  };

  const isInterested = (calendar: CalendarModel) => {
  return (true);
  }
  const toggleInterested = (calendar: CalendarModel) => {
    return (true);
    }

  const renderCalendar = ({ item }: { item: CalendarModel }) => {
    const onPress = () => {
      navigation.navigate("DetailScreen", {
        social: item,
      });
    };

    return (
      <Card onPress={onPress} style={ styles.card }>
        <Card.Title
          title={item.calTitle}
          subtitle={item.caption}

        />
        <Card.Cover source={{ uri: item.calImage }} style={styles.cover} />
        
        <Card.Actions>
          <Button onPress={() => toggleInterested(item)} color="#C4820E">
            {isInterested(item)
              ? "♥ Liked"
              : "♡ Like"}
          </Button>
          {item.owner === currentUserId && (
            <Button color="red" onPress={() => deleteCalendar(item)}>
              {"Delete"}
            </Button>
          )}
        </Card.Actions>
      </Card>
    );
  };

  const Bar = () => {
    return (
      <Appbar.Header style = {styles.header}>
        <Appbar.Action
          icon="exit-to-app"
          onPress={() => firebase.auth().signOut()}
        />
        <Appbar.Content title="RateMySchedule"/>
        <Appbar.Action
          icon="plus"
          onPress={() => {
            navigation.navigate("NewCalendarScreen");
          }}
        />
      </Appbar.Header>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View>
        <Text style={{ color: "gray", margin: 30, textAlign: "center" }}>
          {
            "Welcome! To get started, use the plus button in the top-right corner to create a new calendar."
          }
        </Text>
      </View>
    );
  };

  return (
    <>
      <Bar />
      <View style={styles.container}>
        <FlatList
          data={calendars}
          renderItem={renderCalendar}
          keyExtractor={(_, index) => "key-" + index}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
    </>
  );
}
