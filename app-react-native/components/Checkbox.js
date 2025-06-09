import React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";

import TickIcon from "../assets/tick_icon.svg";

const Checkbox = ({
  children,
  onChange,
  name,
  value,
  errors,
  touched,
  ...props
}) => {
  return (
    <Pressable onPress={() => onChange(name, !value)}>
      <View style={styles.checkbox}>
        {value ? (
          <View style={styles.tickBoxChecked}>
            <TickIcon />
          </View>
        ) : (
          <View style={styles.tickBox}></View>
        )}
        <View style={{ flex: 1, gap: 8 }}>
          {children}
          {errors[name] && touched[name] ? (
            <Text style={styles.checkboxError}>{errors[name]}</Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  checkbox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#000000",
  },
  tickBox: {
    marginTop: 4,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#696969",
    alignItems: "center",
    width: 20,
    height: 20,
  },
  tickBoxChecked: {
    marginTop: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#BE2BBB",
    borderWidth: 2,
    borderColor: "#BE2BBB",
    alignItems: "center",
    width: 20,
    height: 20,
  },
  checkboxError: {
    fontSize: 14,
    color: "#B81111",
  },
});
