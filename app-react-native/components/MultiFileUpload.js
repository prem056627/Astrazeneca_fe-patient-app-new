import * as ImagePicker from "expo-image-picker";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FileDeleteIcon from "../assets/file-delete-icon.svg";
import FileUploadIcon from "../assets/file-upload-icon.svg";

export const MultiFileUpload = ({ id, title, value, errors, formik }) => {
  return (
    <View style={styles.eachRadioField}>
      <Text style={styles.eachFieldLabel}>{title}</Text>

      <View style={styles.radioOptions}>
        <TouchableOpacity
          onPress={async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              quality: 1,
            });

            if (!result.canceled) {
              formik.setFieldValue(id, [...value, result]);
            }
          }}
          style={styles.fileUploadField}
        >
          <Text style={styles.fileUploadFieldPlaceholder}>Click to Upload</Text>
          <FileUploadIcon />
        </TouchableOpacity>
        <View style={styles.uploadedFiles}>
          {value?.map((eachFile, index) => {
            return (
              <View key={index} style={styles.eachUploadedFile}>
                {/* {eachFile?.uri && (
                  <Image
                    source={{ uri: eachFile?.uri }}
                    style={{ width: 200, height: 200 }}
                  />
                )} */}
                <Text>File {index + 1}</Text>
                <TouchableOpacity
                  onPress={() => {
                    let filteredFiles = value?.filter(
                      (eachFilteredFile) =>
                        eachFilteredFile?.assets[0]?.uri !==
                        eachFile?.assets[0]?.uri
                    );
                    formik.setFieldValue(id, [...filteredFiles]);
                  }}
                >
                  <FileDeleteIcon />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>

      {errors?.[id] && <Text style={styles.eachFieldError}>{errors[id]}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  eachRadioField: {
    gap: 12,
  },
  eachFieldLabel: {
    fontSize: 12,
    color: "#696969",
    fontWeight: 400,
  },
  radioOptions: {
    gap: 12,
  },
  eachRadioOption: {
    flexDirection: "row",
    gap: 8,
  },
  eachFieldError: {
    fontSize: 14,
    color: "#B81111",
  },
  fileUploadField: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#D4D4D4",
    borderWidth: 1,
    borderStyle: "dashed",
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  fileUploadFieldPlaceholder: {
    fontSize: 16,
    color: "#9A9A9A",
  },
  uploadedFiles: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  eachUploadedFile: {
    flexDirection: "row",
    alignSelf: "flex-start",
    padding: 12,
    borderColor: "#7C084B",
    borderWidth: 1,
    gap: 16,
  },
});
