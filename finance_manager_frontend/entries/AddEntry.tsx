import { Text } from "@react-navigation/elements";
import { Button, FlatList, StyleSheet, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { RootStackParamList } from "../navigation/StackNavigation";
import { createEntry, fetchEntries } from "./EntrySlice";
import { EntryEntity } from "./EntryEntity";
import SelectDropdown from "react-native-select-dropdown";
import { fetchCategories } from "../categories/CategorySlice";
import CustomButton from "../components/CustomButton";

type CategoryListProps = { CategoryTitle: string };

const CategoryList = ({ CategoryTitle }: CategoryListProps) => (
  <View style={styles.dropdownItemStyle}>
    <Text style={styles.dropdownItemTxtStyle}>{CategoryTitle}</Text>
  </View>
);

export default function AddEntry() {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>();
  const [date, setDate] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const entries = useSelector((state: RootState) => state.entry.entries);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(); // State to store selected category ID
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();


  const handleDescriptionChange = (text: string) => {
    setDescription(text);
    console.log("Description:", text);
  };

  const handleAmountChange = (text: string) => {
    const numericValue = Number(text);
    setAmount(numericValue);
    console.log("Amount:", text);
    console.log("Amount as number:", numericValue);
  };

  const handleAddEntry = async () => {
    const newEntry = new EntryEntity(
      description,
      amount || 0,
      new Date(),
      selectedCategoryId || 0
    );
    dispatch(createEntry(newEntry));
    navigation.navigate("EntriesList");
    dispatch(fetchEntries());
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Please add a fitting entry</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={handleDescriptionChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount?.toString()}
        keyboardType="numeric"
        onChangeText={handleAmountChange}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Date YYYY-MM-DD"
        value={date}
        onChangeText={handleDateChange}
      /> */}
      <SelectDropdown
        data={categories}
        onSelect={(selectedItem) => {
          setSelectedCategoryId(selectedItem.id);
          console.log("Selected category ID:", selectedItem.id);
        }}
        renderButton={(selectedItem) => {
          return (
            <View style={styles.input}>
              {selectedItem && <Text style={styles.dropdownButtonIconStyle} />}
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || "Select your category"}
              </Text>
            </View>
          );
        }}
        renderItem={(item, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && { backgroundColor: "#D2D9DF" }),
              }}
            >
              <CategoryList CategoryTitle={item.title} />
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
      <CustomButton onPress={handleAddEntry} title="Add new Entry" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 40,
    paddingTop: 40,
    gap: 20,
  },
  wrapper: {
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
  },
  iconButton: {
    width: 20,
    height: 20,
  },
  input: {
    width: 200,
    height: 50,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "400",
    color: "black",
    opacity: 0.2,
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
