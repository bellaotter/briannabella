import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ScrollView, Image, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import { MainStackParamList } from "../MainStackScreen";
import { styles } from "./DetailScreen.styles";

interface Props {
  navigation: StackNavigationProp<MainStackParamList, "DetailScreen">;
  route: RouteProp<MainStackParamList, "DetailScreen">;
}

export default function DetailScreen({ route, navigation }: Props) {
  const calendar = route.params.social;

  const Bar = () => {
    return (
      <Appbar.Header style = {styles.header}>
        <Appbar.BackAction onPress={() => navigation.navigate("FeedScreen")} />
        <Appbar.Content title="Details" />
      </Appbar.Header>
    );
  };

  return (
    <>
      <Bar />
      <ScrollView style={styles.container}>
        <View style={styles.view}>
          <View style={{flexDirection: "row"}}>
            <Text style={{ ...styles.h1, fontWeight: '600' , fontSize: 25, flex: 1, alignContent: 'flex-start' , marginVertical: 10, fontFamily: "American Typewriter" }}>
              {calendar.calTitle}
            </Text>
            <Text style={{ ...styles.subtitle, alignContent:'flex-end', marginTop: 5, marginBottom: 10, fontFamily: "American Typewriter" }}>
            {calendar.postedDate}
          </Text>
          </View>
        
    
          <Text style={{...styles.body, marginBottom: 20, fontFamily: "American Typewriter"}}>Caption: {calendar.caption}</Text>
          <Image style={styles.image} source={{ uri: calendar.calImage }} />
          <View style={{backgroundColor: '#E5E5E5', height: 50, marginBottom: 20}}>

          </View>
          <Text style={{...styles.body, marginBottom: 20, fontFamily: "American Typewriter"}}>Comments</Text>
          <Text style = {styles.texting}>Go Bears</Text>
        </View>
      </ScrollView>
    </>
  );
}
