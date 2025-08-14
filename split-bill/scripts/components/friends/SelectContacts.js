import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useEffect } from "react";
import * as Contacts from "expo-contacts";
import MultiSelect from "react-native-multiple-select";

const getContactsPermission = async () => {
  const permission = await Contacts.getPermissionsAsync();
  if (permission.granted) {
    return true;
  }

  const firstPermission = await Contacts.requestPermissionsAsync();
  if (firstPermission.granted) {
    return true;
  }
  if (!firstPermission.canAskAgain) {
    return false;
  }
  const secondPermission = await Contacts.requestPermissionsAsync();
  if (secondPermission.granted) {
    return true;
  }

  return false;
};

const SelectContacts = ({ selectedContacts, setSelectedContacts }) => {
  const [contacts, setContacts] = useState([]);
  const onItemsChange = (data) => {
    //console.log("DATA", data);
    setSelectedContacts(data);
  };
  useEffect(() => {
    async function getContacts() {
      const hasPermissions = await getContactsPermission();
      if (!hasPermissions) return;
      const contacts = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });
      setContacts(contacts.data);
    }
    getContacts();
  }, []);
  return (
    <View>
      <Text style={{fontSize:20,marginVertical:10,fontWeight:600}}>SelectContacts</Text>
      {contacts.length > 0 && (
        <MultiSelect
        uniqueKey="id"
        items={contacts}
        onSelectedItemsChange={onItemsChange}
        selectedItems={selectedContacts}
        
        // Theme color
        selectedItemTextColor="#8550b9ff"
        selectedItemIconColor="#8550b9ff"
        submitButtonColor="#8550b9ff"
        searchInputStyle={{ color: '#8550b9ff' ,caretColor: '#8550b9ff',}}
        styleInputGroup={{
          borderBottomWidth: 1,
          borderBottomColor: '#8550b9ff',
        }}
        styleItemsContainer={{
          backgroundColor: '#f8f4fc', // optional light background
        }}
      />

      )}
    </View>
  );
};

export default SelectContacts;

const styles = StyleSheet.create({});