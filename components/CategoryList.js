import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Switch,
  ScrollView,
} from "react-native";
import Button from "./Button";

const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function CategoryList({
  categoryList,
  activeCategories,
  updateLocalCategories,
}) {
  const [checkboxes, setCheckboxes] = useState([]);
  const [localActiveCategories, setLocalActiveCategories] =
    useState(activeCategories);

  useEffect(() => {
    const checkboxList = activeCategories.map((categoryObject, index) => ({
      id: index + 1,
      label: capitalizeFirstLetter(categoryObject.categoryName),
      isChecked: categoryObject.active,
    }));

    setCheckboxes(checkboxList);
  }, [activeCategories]);

  const selectAllCategories = () => {
    const updatedCheckboxes = checkboxes.map((checkbox) => ({
      ...checkbox,
      isChecked: true,
    }));
    setCheckboxes(updatedCheckboxes);

    const updatedActiveCategories = activeCategories.map((categoryObject) => ({
      ...categoryObject,
      active: true,
    }));
    setLocalActiveCategories(updatedActiveCategories);
    updateLocalCategories(updatedActiveCategories);
  };

  const deselectAllCategories = () => {
    const updatedCheckboxes = checkboxes.map((checkbox) => ({
      ...checkbox,
      isChecked: false,
    }));
    setCheckboxes(updatedCheckboxes);

    const updatedActiveCategories = activeCategories.map((categoryObject) => ({
      ...categoryObject,
      active: false,
    }));
    setLocalActiveCategories(updatedActiveCategories);
    updateLocalCategories(updatedActiveCategories);
  };

  const handleCheckboxChange = (checkboxID) => {
    const updatedCheckboxes = checkboxes.map((checkbox) => {
      if (checkbox.id === checkboxID) {
        return { ...checkbox, isChecked: !checkbox.isChecked };
      }
      return checkbox;
    });
    setCheckboxes(updatedCheckboxes);

    const updatedActiveCategories = updatedCheckboxes.map((checkbox) => ({
      categoryName: checkbox.label,
      active: checkbox.isChecked,
    }));
    setLocalActiveCategories(updatedActiveCategories);
    updateLocalCategories(updatedActiveCategories);
  };

  const renderCheckboxOrSwitch = (checkbox) => {
    if (Platform.OS === "ios") {
      return (
        <Switch
          style={styles.checkboxControl}
          value={checkbox.isChecked}
          onValueChange={() => handleCheckboxChange(checkbox.id)}
        />
      );
    } else {
      return (
        <input
          style={styles.checkboxControl}
          type="checkbox"
          checked={checkbox.isChecked}
          onChange={() => handleCheckboxChange(checkbox.id)}
        />
      );
    }
  };

  return (
    <>
      <Text style={styles.textStyle}>
        Select the categories you'd like to study
      </Text>
      <View style={styles.selectButtonsContainer}>
        <Button theme={"dark"} width={"30%"} onPress={selectAllCategories}>
          Select All
        </Button>
        <Button theme={"dark"} width={"30%"} onPress={deselectAllCategories}>
          Deselect All
        </Button>
      </View>
      <ScrollView style={styles.scrollView}>
        {checkboxes.map((checkbox) => (
          <View key={checkbox.id} style={styles.checkboxContainer}>
            {renderCheckboxOrSwitch(checkbox)}
            <Text
              style={[
                styles.checkboxLabel,
                Platform.OS === "ios" && styles.checkboxLabelIOS,
              ]}
            >
              {checkbox.label}
            </Text>
          </View>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  categoryListContainer: {
    flexDirection: "column",
  },
  selectButtonsContainer: {
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
  checkboxControl: {},
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  checkboxLabelIOS: {
    marginTop: 5,
  },
  textStyle: {
    fontSize: 16,
  },
});
