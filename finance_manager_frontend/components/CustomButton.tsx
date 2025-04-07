import { Button, StyleSheet, TouchableOpacity, Text } from "react-native";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "tertiary-blue";
};

export default function CustomButton({
  title,
  onPress,
  variant,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "secondary" && styles.buttonSecondary,
        variant === "tertiary" && styles.buttonTertiary,
        variant === "tertiary-blue" && styles.buttonTertiaryBlue,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          variant === "secondary" && styles.secondaryText,
          variant === "tertiary" && styles.tertiaryText,
          variant === "tertiary-blue" && styles.tertiaryText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4A90E2",
    padding: 10,
    borderRadius: 10,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.25)",
  },
  buttonSecondary: {
    backgroundColor: "transparent",
    boxShadow: "none",
    margin: 0,
    padding: 0,
  },
  buttonTertiary: {
    backgroundColor: "rgb(230, 66, 66)",
    boxShadow: "none",
    padding: 10,
    borderRadius: 10,
  },
  buttonTertiaryBlue: {
    backgroundColor: "#4A90E2",
    boxShadow: "none",
    padding: 10,
    borderRadius: 10,
  },
  tertiaryText: {
    fontSize: 16,
  },
  secondaryText: {
    color: "#4A90E2",
    fontSize: 16,
    textAlign: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
