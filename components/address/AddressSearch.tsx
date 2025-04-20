import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { StatusBar } from "expo-status-bar";

const AddressSearch = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [Addrees, setAddress] = useState("");
  return (
    <View style={{ flex: 1 }} className="bg-red-500">
      <StatusBar style="light" />
      <ImageBackground
        // source={require("./assets/backgroundImage.jpg")}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Text style={styles.googlePlacesText}>Google Places Api</Text>
        </View>

        <View style={{ flex: 1, alignItems: "center" }}></View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "darkblue",
    paddingTop: 60,
    paddingBottom: 25,
    alignItems: "center",
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 50,
  },
  googlePlacesText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    height: 50,
    borderRadius: 25,
    paddingLeft: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  inputContainer: {
    width: "95%",
  },
  textInputFocused: {
    borderWidth: 1,
    borderColor: "darkblue",
    height: 50,
    borderRadius: 25,
    paddingLeft: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
});
export default AddressSearch;
