import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Input, Button, CheckBox} from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';



export default function AddUserScreen({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');


  const collectionSelect = [
    {
      nameCollect: 'Users Collection',
    },
    {
      nameCollect: 'Admins Collection',
    },
    {
      nameCollect: 'Orders Collection',
    }
  ];

  const [collectionValue, setCollectionValue] = useState(
    collectionSelect[0].nameCollect,
  );

  const addUser = async () => {
    if (collectionValue === 'Users Collection') {
      const dbRef = firestore().collection('users');
      await dbRef
        .add({
          name: name,
          email: email,
        })
        .then(() => {
          console.log('User added!');
          alert('User [' + name + '] added!');
          navigation.navigate('UsersListScreen');
        })
        .catch(error => {
          console.log(error);
        });
        
    } else if (collectionValue === 'Admins Collection') {
      const dbRef = firestore().collection('admins');
      await dbRef
        .add({
          name: name,
          email: email,
        })
        .then(() => {
          console.log('Admin added!');
          alert('Admin [' + name + '] added!');
          navigation.navigate('UsersListScreen');
        })
        .catch(error => {
          console.log(error);
        });
    }else if (collectionValue === 'Orders Collection') {
      const dbRef = firestore().collection('orders');
      await dbRef
        .add({
          name: name,
          price: price,
          quantity: quantity,
        })
        .then(() => {
          console.log('Orders added!');
          alert('Order [' + name + '] added!');
          navigation.navigate('UsersListScreen');
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const checkCollection = () => {
    if (collectionValue === 'Users Collection') {
      return (
        <View>
          <Input
            placeholder="Name"
            onChangeText={value => setName(value)}
            style={styles.inputStyle}
          />
          <Input
            placeholder="Email"
            onChangeText={value => setEmail(value)}
            style={styles.inputStyle}
          />
        </View>
      );
    } else if (collectionValue === 'Admins Collection') {
      return (
        <View>
          <Input
            placeholder="Name"
            onChangeText={value => setName(value)}
            style={styles.inputStyle}
          />
          <Input
            placeholder="Email"
            onChangeText={value => setEmail(value)}
            style={styles.inputStyle}
          />
        </View>
      );
    }else if (collectionValue === 'Orders Collection') {
      return (
        <View>
          <Input
            placeholder="Name"
            onChangeText={value => setName(value)}
            style={styles.inputStyle}
          />
          <Input
            placeholder="Price"
            onChangeText={value => setPrice(value)}
            style={styles.inputStyle}
            keyboardType="numeric"
          />
          <Input
            placeholder="Quantity"
            onChangeText={value => setQuantity(value)}
            style={styles.inputStyle}
            keyboardType="numeric" 
          />
        </View>
      );
    }
  };
  
    

  return (
    <ScrollView style={styles.container}>
      {collectionSelect.map((item, i) => (
        <CheckBox
          key={i}
          title={item.nameCollect}
          checked={collectionValue === item.nameCollect}
          onPress={() => setCollectionValue(item.nameCollect)}
          containerStyle={styles.checkbox}
        />
      ))}
      {checkCollection()}
      

      <Button
        title="Add User"
        onPress={() => addUser()}
        buttonStyle={{backgroundColor: 'green'}}
      />
      <Button
        containerStyle={{marginTop: 10}}
        title="Go to Users List"
        onPress={() => navigation.navigate('UsersListScreen')}
      />
    </ScrollView>
  );
}









const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  checkbox: {
    backgroundColor: null,
    borderWidth: 0,
  },
});

