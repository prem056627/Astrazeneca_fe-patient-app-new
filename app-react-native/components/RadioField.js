import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RadioCheckedIcon from "../assets/radio-checked-icon.svg";
import RadioIcon from "../assets/radio-icon.svg";

export const CheckBoxItem = ({
  id,
  title,
  description,
  value,
  errors,
  options,
  formik,
}) => {
  return (
    <View style={styles.eachRadioField}>
      <Text style={styles.eachFieldLabel}>{title}</Text>
      {description && <Text style={styles.eachFieldLabel}>{description}</Text>}

      <View style={styles.radioOptions}>
        {options?.map((eachOption) => {
          return (
            <TouchableOpacity
              key={eachOption?.id}
              onPress={() => formik.setFieldValue(id, eachOption?.id)}
              style={styles.eachRadioOption}
            >
              {eachOption?.id === value ? <RadioCheckedIcon /> : <RadioIcon />}
              <Text>{eachOption?.label}</Text>
            </TouchableOpacity>
          );
        })}
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
});
