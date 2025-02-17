
import "./global.css";
import {
    Button,
    StyleSheet
  } from "react-native";

  type CustomButtonProps = { title: string; onPress: () => void; };

export default function CustomButton({ title, onPress }: CustomButtonProps) {


  return (
    <Button title={title} onPress={onPress} />
  ); 
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#f4511e",
        padding: 10,
        margin: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        textAlign: "center",
    },
});
