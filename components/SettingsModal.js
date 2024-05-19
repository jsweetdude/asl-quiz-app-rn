import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Button from "./Button";
import CategoryList from "./CategoryList";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingsModal({
  isVisible,
  onClose,
  updateQuizLength,
  updateCategories,
  quizLength,
  categoryList,
  activeCategories,
}) {
  const insets = useSafeAreaInsets();

  const [localQuizLength, setLocalQuizLength] = useState(String(quizLength));
  const [localCategories, setLocalCategories] = useState(categoryList);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLocalQuizLength(String(quizLength));
  }, [quizLength]);

  useEffect(() => {
    setLocalCategories(categoryList);
  }, [categoryList]);

  const updateLocalCategoriesHandler = (categoryChanges) => {
    setLocalCategories(categoryChanges);
  };

  const onSave = () => {
    if (localCategories.filter((category) => category.active).length === 0) {
      setErrorMessage("Error: You must select at least one category.");
    } else {
      updateQuizLength(Number(localQuizLength));
      updateCategories(localCategories);
      setErrorMessage("");
      onClose();
    }
  };

  return (
    <Modal
      style={styles.modalContainer}
      animationType="fade"
      transparent={true}
      visible={isVisible}
    >
      <View
        style={[
          styles.modalContent,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Settings</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={28} />
          </Pressable>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Number of words per quiz</Text>
          <TextInput
            style={styles.input}
            value={localQuizLength}
            onChangeText={setLocalQuizLength}
            inputMode="numeric"
          />
          <CategoryList
            categories={categoryList}
            activeCategories={activeCategories}
            updateLocalCategories={updateLocalCategoriesHandler}
          />
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          <Button theme="dark" width="50%" onPress={onSave}>
            Save
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    height: "85%",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
    elevation: 20, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.25, // For iOS shadow
    shadowRadius: 3.84, // For iOS shadow
  },
  titleContainer: {
    flex: 1,
    backgroundColor: "#001358",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 24,
  },
  formContainer: {
    flex: 7,
    flexDirection: "column",
    padding: 12,
  },
  label: {
    marginBottom: 12,
    fontSize: 16,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  errorText: {
    color: "red",
    marginBottom: 12,
  },
});
