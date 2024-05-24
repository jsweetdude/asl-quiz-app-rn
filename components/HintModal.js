import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Keyboard,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Button from "./Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HintModal({
  isVisible,
  word,
  oldHint,
  onClose,
  onSave,
}) {
  const insets = useSafeAreaInsets();

  const [newHintText, setNewHintText] = useState(oldHint || "");
  const [isEditing, setIsEditing] = useState(false);
  const [hintHasChanged, setHintHasChanged] = useState(false);
  const [changedHintSaved, setChangedHintSaved] = useState(false);
  const [isCancelButtonVisible, setIsCancelButtonVisible] = useState(false);

  useEffect(() => {
    setNewHintText(oldHint || "");
    setHintHasChanged(false);
    setChangedHintSaved(false);
  }, [oldHint, word]);

  useEffect(() => {
    if (isEditing || hintHasChanged) {
      setIsCancelButtonVisible(true);
    } else {
      setIsCancelButtonVisible(false);
    }
  });

  const userHasTyped = (text) => {
    setNewHintText(text);
    if (text !== oldHint) {
      setHintHasChanged(true);
    } else {
      setHintHasChanged(false);
    }
  };

  // "Cancel Editing" button
  // Reverts newHintText and TextInput to 'oldHint', closes Editing section
  const resetEditing = () => {
    setNewHintText(oldHint || "");
    setIsEditing(false);
  };

  // Does not close hint modal
  // "Saves" the entered data to the modal
  const saveEdits = () => {
    setChangedHintSaved(true);
    setIsEditing(false);
  };

  const modalCancelPress = () => {
    resetEditing();
    onClose();
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
          <Text style={styles.title}>Hint for "{word}"</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={28} />
          </Pressable>
        </View>
        <View style={styles.hintPresentation}>
          <View style={styles.currentHint}>
            <View style={styles.hintIcon}>
              <FontAwesome name={"lightbulb-o"} color={"#001358"} size={48} />
            </View>
            <View style={styles.currentHintText}>
              <Text>Current Hint:</Text>
              <Text>{changedHintSaved ? newHintText : oldHint}</Text>
            </View>
          </View>
          <View style={styles.topButtonContainer}>
            <Button
              theme="dark"
              disabled={isEditing}
              onPress={() => {
                setIsEditing(true);
              }}
            >
              Edit Hint
            </Button>
            <View style={styles.cancelOkButtons}>
              {isCancelButtonVisible && (
                <Button theme="light" onPress={modalCancelPress}>
                  Cancel
                </Button>
              )}
              {hintHasChanged ? (
                <Button
                  theme="dark"
                  onPress={() => {
                    onSave(newHintText);
                  }}
                >
                  OK
                </Button>
              ) : (
                <Button theme="dark" onPress={onClose}>
                  OK
                </Button>
              )}
            </View>
          </View>
        </View>

        {isEditing && (
          <View style={styles.formContainer}>
            <Text style={styles.label}>New hint for "{word}"</Text>
            <TextInput
              style={styles.input}
              multiline={true}
              rows={4}
              value={newHintText}
              onChangeText={userHasTyped}
            />
            <View style={styles.bottomButtonContainer}>
              <Button
                theme="dark"
                width="25%"
                disabled={!hintHasChanged}
                onPress={saveEdits}
              >
                Save
              </Button>
              <Button theme="light" width="25%" onPress={resetEditing}>
                Cancel Editing
              </Button>
            </View>
          </View>
        )}
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
    // height: "55%",
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
    // flex: 1,
    backgroundColor: "#001358",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 20,
  },
  hintPresentation: {
    // padding: 16,
  },
  currentHint: {
    flexDirection: "row",
  },
  hintIcon: {
    alignItems: "center",
    width: 48,
    margin: 16,
  },
  currentHintText: {
    // flex: 10,
    margin: 16,
    justifyContent: "center",
  },
  topButtonContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelOkButtons: {
    flexDirection: "row",
  },
  formContainer: {
    paddingHorizontal: 16,
    // paddingBottom: 16,
  },
  label: {},
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  bottomButtonContainer: {
    flexDirection: "row",
  },
});
