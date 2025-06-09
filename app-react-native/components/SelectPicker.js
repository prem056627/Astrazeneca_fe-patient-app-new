import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const SelectPicker = ({
  id,
  title,
  description,
  value,
  errors,
  options,
  formik,
}) => {
  return (
    <View style={styles.eachSelectPickerBox}>
      <Text style={styles.eachFieldLabel}>{title}</Text>
      {description && <Text style={styles.eachFieldLabel}>{description}</Text>}

      <View style={styles.eachSelectPickerField}>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue, itemIndex) =>
            formik.setFieldValue(id, itemValue)
          }
        >
          {options?.map((eachOption) => {
            return (
              <Picker.Item
                key={eachOption?.id}
                label={eachOption?.label}
                value={eachOption?.id}
              />
            );
          })}
        </Picker>
      </View>

      {errors?.[id] && <Text style={styles.eachFieldError}>{errors[id]}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  eachSelectPickerBox: {
    gap: 12,
  },
  eachSelectPickerField: {
    borderColor: "#D4D4D4",
    borderWidth: 1,
    borderStyle: "solid",
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
});
