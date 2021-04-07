import firebase from "firebase";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import db from "../config";
import MyHeader from "../components/myHeader";

export default class CalendarSample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      userId: firebase.auth().currentUser.email,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
    this.getTransactionData(date);
  }

  getTransactionData = (selectedDate) => {
    console.log(selectedDate);
    var enteredText=selectedDate.split("");
    db.collection("all_transactions")
      .where("date", "==", selectedDate)
      .where("user_id", "==", this.state.userId)
      .get()
      .then((doc) => {
        doc.forEach((d) => {
            console.log(d.data())
        });
      });
  };

  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : "";
    return (
      <View style={styles.container}>
          <MyHeader title="Calendar" navigation={this.props.navigation} />
        <CalendarPicker onDateChange={this.onDateChange} />

        <View>
          <Text>SELECTED DATE:{startDate}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 100,
  },
});
