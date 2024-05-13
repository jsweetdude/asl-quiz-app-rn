import {
  Modal,
  View,
  Text,
  Pressable,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Button from "./Button";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function SettingsModal({
  isVisible,
  onCloseModal,
  quizLength,
  changeQuizLength,
}) {
  const insets = useSafeAreaInsets();
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
          <Pressable onPress={onCloseModal}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Number of words per quiz</Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeText}
            value={quizLength}
          />
          <Button theme="dark" width="50%" onPress={() => changeQuizLength()}>
            Save
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#386dc2",
  },
  modalContent: {
    height: "30%",
    width: "100%",
    backgroundColor: "#fff",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    backgroundColor: "#fff",
    // position: "absolute",
    // top: 50,
  },
  titleContainer: {
    height: "16%",
    backgroundColor: "#464C55",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
  formContainer: {
    flexDirection: "column",
  },
  label: {
    margin: 12,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
});
