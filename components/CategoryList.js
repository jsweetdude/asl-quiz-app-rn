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
  categories,
  updateCategoriesToSettingsModal,
}) {
  const [checkboxData, setCheckboxData] = useState([]);

  useEffect(() => {
    const checkboxList = categories.map((categoryObject, index) => ({
      id: index,
      label: capitalizeFirstLetter(categoryObject.categoryName),
      categoryName: categoryObject.categoryName,
      isChecked: categoryObject.active,
    }));

    setCheckboxData(checkboxList);
  }, [categories]);

  const selectAllCategories = () => {
    const updatedCheckboxes = checkboxData.map((checkbox) => ({
      ...checkbox,
      isChecked: true,
    }));
    setCheckboxData(updatedCheckboxes);

    const updatedCategories = categories.map((categoryObject) => ({
      ...categoryObject,
      active: true,
    }));
    updateCategoriesToSettingsModal(updatedCategories);
  };

  const deselectAllCategories = () => {
    const updatedCheckboxes = checkboxData.map((checkbox) => ({
      ...checkbox,
      isChecked: false,
    }));
    setCheckboxData(updatedCheckboxes);

    const updatedCategories = categories.map((categoryObject) => ({
      ...categoryObject,
      active: false,
    }));
    updateCategoriesToSettingsModal(updatedCategories);
  };

  const handleCheckboxChange = (checkboxID) => {
    const updatedCheckboxes = checkboxData.map((checkbox) => {
      if (checkbox.id === checkboxID) {
        return { ...checkbox, isChecked: !checkbox.isChecked };
      }
      return checkbox;
    });
    setCheckboxData(updatedCheckboxes);

    const updatedCategories = updatedCheckboxes.map((checkbox) => ({
      categoryName: checkbox.categoryName,
      active: checkbox.isChecked,
    }));
    updateCategoriesToSettingsModal(updatedCategories);
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
        {checkboxData.map((checkbox) => (
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
