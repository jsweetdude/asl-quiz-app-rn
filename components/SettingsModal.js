import {
  Modal,
  View,
  Text,
  Pressable,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Button from "./Button";
import CategoryList from "./CategoryList";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function SettingsModal({
  isVisible,
  onClose,
  updateQuizLength,
}) {
  const insets = useSafeAreaInsets();

  const [quizLengthInput, setQuizLengthInput] = useState(20);

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
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Number of words per quiz</Text>
          <TextInput
            style={styles.input}
            value={quizLengthInput}
            onChangeText={setQuizLengthInput}
          />
          <CategoryList />
          <Button
            theme="dark"
            width="50%"
            onPress={() => updateQuizLength(quizLengthInput)}
          >
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
    paddingHorizontal: 20,
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
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
});
