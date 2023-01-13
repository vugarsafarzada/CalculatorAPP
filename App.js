import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
export default function App() {
  const [value, setValue] = useState(0);
  const [valueA, setValueA] = useState(0);
  const [operation, setOperation] = useState(0);

  const keys = [1,2,3,"+",4,5,6,"-",7,8,9,"X","C",0,"=","/"];
  const updateScreen = (key) => {
    if (key === "=") {
      setValue(calculateProcess());
      setValueA(0);
      setOperation(0);
    } else if (key === "C") {
      setValue(0);
      setValueA(0);
      setOperation(0);
    } else if (value) {
      if (typeof key === "number") {
        setValue(`${value}${key}`);
      } else if (typeof key === "string") {
        if (value && valueA && operation) {
          setValueA(calculateProcess());
          setOperation(key);
          setValue(0);
        } else {
          setValueA(value);
          setOperation(key);
          setValue(0);
        }
      }
    } else if (typeof key === "number" || key === '-'){
      if(key === '-'){
        setValue(-1);
      } else {
        setValue(key);
      }
    }
  };

  const calculateProcess = () => {
    if (value && valueA && operation) {
      if (operation === "+") {
        return Number(valueA) + Number(value);
      }
      if (operation === "-") {
        return Number(valueA) - Number(value);
      }
      if (operation === "/") {
        return Number(valueA) / Number(value);
      }
      if (operation === "X") {
        return Number(valueA) * Number(value);
      }
    } else {
      return 0;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainScreen}>
        <Text style={styles.keyText}>{valueA ? valueA : ""}</Text>
        <Text style={styles.keyText}>{operation ? operation : ""}</Text>
        <Text style={styles.keyText}>{value}</Text>
      </View>
      <View style={styles.keyboards}>
        {keys.map((item, index) => {
          return (
            <TouchableOpacity
              style={
                typeof item === "number" ? styles.keys : styles.goldKey
              }
              key={index}
              onPress={() => updateScreen(item)}
            >
              <Text style={styles.keyText}>{item.toString()}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    height: "100%",
  },
  mainScreen: {
    backgroundColor: "white",
    height: "50%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 10,
  },
  keyboards: {
    backgroundColor: "#efefef",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
  },
  keys: {
    width: 90,
    height: 90,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 3,
    borderRadius: 10,
  },
  goldKey: {
    backgroundColor: "orange",
    width: 90,
    height: 90,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 3,
    borderRadius: 10,
  },
  keyText: {
    fontSize: 30,
  },
});
