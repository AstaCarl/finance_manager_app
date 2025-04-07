import { useNavigation, NavigationProp } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { RootStackParamList } from "../navigation/StackNavigation";
import { deleteEntry, fetchEntries } from "./EntrySlice";
import CustomButton from "../components/CustomButton";

type EntryListProps = {
  entryTitle: string;
  entryAmount: number;
  entryDate: Date;
  categoryTitle: string;
  onPress: () => void;
};

const EntryList = ({
  entryTitle,
  entryAmount,
  entryDate,
  categoryTitle,
  onPress,
}: EntryListProps) => {
  const formattedDate = entryDate
    ? new Date(entryDate).toLocaleDateString()
    : "Invalid Date";

  return (
    <View style={styles.entryContainer}>
      <View style={styles.entryWrapper}>
        <Text style={styles.entryTitle}>{entryTitle}</Text>
        <View style={styles.entryGroup}>
          <Text style={styles.entryLabel}>Amount:</Text>
          <Text style={styles.entryItem}>{entryAmount}</Text>
        </View>
        <View style={styles.entryGroup}>
          <Text style={styles.entryLabel}>Date:</Text>
          <Text style={styles.entryItem}>{formattedDate}</Text>
        </View>
        <View style={styles.entryGroup}>
          <Text style={styles.entryLabel}>Category:</Text>
          <Text style={styles.entryItem}>{categoryTitle}</Text>
        </View>
      </View>
      <View style={styles.buttonGroup}>
        <CustomButton variant="tertiary-blue" onPress={onPress} title="Edit" />
        <CustomButton variant="tertiary" onPress={onPress} title="Delete" />
      </View>
    </View>
  );
};

export default function EntriesScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const entries = useSelector((state: RootState) => state.entry.entries);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchEntries());
  }, []);

  const handleDeleteEntry = async (id: number) => {
    dispatch(deleteEntry(id));
    dispatch(fetchEntries());
  };
  const totalAmount = entries.reduce((sum, entry) => sum + (entry.amount || 0), 0);


  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Your Entries</Text>
          <View style={styles.entryGroup}>
          <Text style={styles.subtitle}>Your total spendings:</Text>
          <Text style={styles.entryTotal}>{totalAmount},-</Text>
          </View>
          <FlatList
            data={entries}
            keyExtractor={(item) => (item.id ? item.id.toString() : "")}
            renderItem={({ item }) => (
              <EntryList
                onPress={() => handleDeleteEntry(item.id ? item.id : 0)}
                entryTitle={item.description}
                entryAmount={item.amount ? item.amount : 0}
                entryDate={item.date}
                categoryTitle={item.category ? item.category.title : ""}
              />
            )}
          />
        </View>
        <CustomButton
        onPress={() => navigation.navigate("AddEntry")}
        title="Add a new Entry"
      />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 30,
    gap: 20,
  },
  wrapper: {
    gap: 10,
  },
  input: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    minWidth: 200,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  entryTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  entryItem: {
    fontSize: 18,
    // fontWeight: 'bold',
  },
  entryTotal: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
  },
  entryContainer: {
    // width: "80%",
    backgroundColor: "#eeeeee",
    marginVertical: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    alignItems: "center",
    borderRadius: 12,
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  entryWrapper: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "flex-start",
    backgroundColor: "rgb(220, 220, 220)",
    padding: 14,
    borderRadius: 12,
  },
  entryLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
    color: "rgb(70, 70, 70)",
  },
  entryGroup: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // gap: 10,
  },
  iconButton: {
    width: 20,
    height: 20,
  },
});
