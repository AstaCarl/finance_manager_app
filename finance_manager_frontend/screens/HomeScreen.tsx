import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';



export default function HomeScreen() {
  return (
<View style={styles.container}>
      <Text style={styles.title}>Home</Text>    
        <Text style={styles.subtitle}>Welcome to the finance manager app</Text>
        </View> 
  )
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
    paddingVertical: 40,
    paddingHorizontal: 30,
    gap: 20,
  },
  wrapper: {
    gap: 10,
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    minWidth: 200,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
  },
  categoryItem: {},
  categoryContainer: {
    backgroundColor: '#eeeeee',
    marginVertical: 8,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    alignItems: 'center',
  },
  iconButton: {
    width: 20,
    height: 20,
  },
});