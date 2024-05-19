import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Pressable, Platform, StyleSheet } from "react-native";
import { Switch } from "react-native";
import wordList from "../assets/data";
import { ScrollView } from "react-native";

export default function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);
  const [checkboxes, setCheckboxes] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(wordList.map((word) => word.category))
    );

    const checkboxList = uniqueCategories.map((category, index) => ({
      id: index + 1,
      label: category,
      isChecked: false,
    }));

    setCategoryList(uniqueCategories);
    setCheckboxes(checkboxList);
  }, []);

  const handleCheckboxChange = (checkboxID) => {
    const updatedCheckboxes = checkboxes.map((checkbox) => {
      if (checkbox.id === checkboxID) {
        return { ...checkbox, isChecked: !checkbox.isChecked };
      }
      return checkbox;
    });
    setCheckboxes(updatedCheckboxes);
  };

  const renderCheckboxOrSwitch = (checkbox) => {
    if (Platform.OS === "ios") {
      return (
        <Switch
          value={checkbox.isChecked}
          onValueChange={() => handleCheckboxChange(checkbox.id)}
        ></Switch>
      );
    } else {
      return (
        <input
          type="checkbox"
          checked={checkbox.isChecked}
          onChange={() => handleCheckboxChange(checkbox.id)}
        ></input>
      );
    }
  };

  return (
    <>
      <ScrollView style={styles.scrollView}>
        {checkboxes.map((checkbox) => {
          return (
            <View key={checkbox.id} style={styles.checkboxContainer}>
              {renderCheckboxOrSwitch(checkbox)}
              <Text>{checkbox.label}</Text>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
}

/*

import React from "react";
import { useState, useEffect } from "react";
import { Text, ScrollView, Platform, View, StyleSheet } from "react-native-web";
import { Switch } from "react-native";
import Checkbox from "expo-checkbox";
import Button from "./Button";
import wordList from "../assets/data";

export default function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);
  const [checkboxes, setCheckboxes] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(wordList.map((word) => word.category))
    );

    const checkboxList = uniqueCategories.map((category, index) => ({
      id: index + 1,
      label: category,
      isChecked: false,
    }));

    setCategoryList(uniqueCategories);
    setCheckboxes(checkboxList);
  }, []);

  const handleCheckBoxChange = () => {
    return true;
  };

  return (
    <>
      <View style={styles.categoryListContainer}>
        <Text>Select categories to include</Text>
        <View style={styles.selectDeselectContainer}>
          <Button theme={"dark"}>Select All</Button>
          <Button theme={"dark"}>Deselect All</Button>
        </View>
        <ScrollView style={styles.scrollView}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              alert("hi");
            }}
            value={isEnabled}
          />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  categoryListContainer: {
    flexDirection: "column",
  },
  selectDeselectContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  scrollView: {
    width: "100%",
    height: 225,
    flexDirection: "column",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  label: {
    marginLeft: 8,
  },
});


*/

const styles = StyleSheet.create({
  categoryListContainer: {
    flexDirection: "column",
  },
  selectDeselectContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  scrollView: {
    width: "100%",
    height: 225,
    flexDirection: "column",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  label: {
    marginLeft: 8,
  },
});
