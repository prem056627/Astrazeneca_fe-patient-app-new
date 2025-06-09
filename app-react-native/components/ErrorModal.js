import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";

const ErrorModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.headerTextStyle}>ERROR</Text>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.modalText}>Server Error</Text>
            </View>
            <View style={styles.modalFooter}>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Go Back</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 6,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 14,
  },
  modalBody: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  modalFooter: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    borderTopWidth: 1,
    padding: 14,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
  },
  headerTextStyle: {
    color: "#000000",
    fontSize: 16,
    fontWeight: 700,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    color: "#808187",
  },
});

export default ErrorModal;
