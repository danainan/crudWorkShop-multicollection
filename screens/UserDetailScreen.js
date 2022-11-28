import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Input, Button} from 'react-native-elements';
import { Alert } from 'react-native';

export default function UserDetailScreen({route, navigation}) {
  const {userId} = route.params;
  const [collectionValue] = useState(route.params.collectionValue);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');


  useEffect(() => {
    console.log('userDetail => '+collectionValue);
    if (collectionValue === 'Users Collection') {
      firestore()
        .collection('users')
        .doc(userId)
        .get()
        .then(documentSnapshot => {
          setName(documentSnapshot.data().name);
          setEmail(documentSnapshot.data().email);
        });
        

    } else if (collectionValue === 'Admins Collection') {
      firestore()
        .collection('admins')
        .doc(userId)
        .get()
        .then(documentSnapshot => {
          setName(documentSnapshot.data().name);
          setEmail(documentSnapshot.data().email);
        });
    }else if (collectionValue === 'Orders Collection') {
      firestore()
        .collection('orders')
        .doc(userId)
        .get()
        .then(documentSnapshot => {
          setName(documentSnapshot.data().name);
          setPrice(documentSnapshot.data().price);
          setQuantity(documentSnapshot.data().quantity);
        });
    }
  }, []);

  const updateUser = async () => {
    if (collectionValue === 'Users Collection') {
      const dbRef = firestore().collection('users').doc(userId);
      await dbRef
        .set({
          name: name,
          email: email,
        })
        .then(() => {
          console.log('User updated!');
          alert('User updated!');
          navigation.navigate('UsersListScreen');
        })
        .catch(error => {
          console.log(error);
        });
    } else if (collectionValue === 'Admins Collection') {
      const dbRef = firestore().collection('admins').doc(userId);
      await dbRef
        .set({
          name: name,
          email: email,
        })
        .then(() => {
          console.log('Admin updated!');
          alert('Admin updated!');
          navigation.navigate('UsersListScreen');
        })
        .catch(error => {
          console.log(error);
        });
    } else if (collectionValue === 'Orders Collection') {
      const dbRef = firestore().collection('orders').doc(userId);
      await dbRef
        .set({
          name: name,
          price: price,
          quantity: quantity,
        })
        .then(() => {
          console.log('Order updated!');
          alert('Order updated!');
          navigation.navigate('UsersListScreen');
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const deleteUser = async () => {
    if (collectionValue === 'Users Collection') {
      const dbRef = firestore().collection('users').doc(userId);
      Alert.alert(
        'Delete Order',
        'Are you sure you want to delete this order?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => {
            dbRef
            .delete()
            .then(() => {
              console.log('Users deleted!');
              alert('Users deleted!');
              navigation.navigate('UsersListScreen');
            })
            .catch(error => {
              console.log(error);
            });
          }},
        ],
        {cancelable: false},
      );
    } else if (collectionValue === 'Admins Collection') {
      const dbRef = firestore().collection('admins').doc(userId);
      Alert.alert(
        'Delete Order',
        'Are you sure you want to delete this order?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => {
            dbRef
            .delete()
            .then(() => {
              console.log('Admins deleted!');
              alert('Admins deleted!');
              navigation.navigate('UsersListScreen');
            })
            .catch(error => {
              console.log(error);
            });
          }},
        ],
        {cancelable: false},
      );
    } else if (collectionValue === 'Orders Collection') {
      const dbRef = firestore().collection('orders').doc(userId);
      Alert.alert(
        'Delete Order',
        'Are you sure you want to delete this order?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => {
          dbRef
            .delete()
            .then(() => {
              console.log('Order deleted!');
              alert('Order deleted!');
              navigation.navigate('UsersListScreen');
            })
            .catch(error => {
              console.log(error);
            });
          }},
        ],
        {cancelable: false},
      );
    }
  };


  
  const checkCollection = () => {
    if (collectionValue === 'Users Collection') {
      return (
        <View style={styles.container}>
          <ScrollView>
            <Input
              placeholder="Name"
              value={name}
              onChangeText={value => setName(value)}
            />
            <Input
              placeholder="Email"
              value={email}
              onChangeText={value => setEmail(value)}
            />
          </ScrollView>
        </View>
      );
    } else if (collectionValue === 'Admins Collection') {
      return (
        <View style={styles.container}>
          <ScrollView>
            <Input
              placeholder="Name"
              value={name}
              onChangeText={value => setName(value)}
            />
            <Input
              placeholder="Email"
              value={email}
              onChangeText={value => setEmail(value)}
            />
          </ScrollView>
        </View>
      );
    } else if (collectionValue === 'Orders Collection') {
      return (
        <View style={styles.container}>
          <ScrollView>
            <Input
              placeholder="Name"
              value={name}
              onChangeText={value => setName(value)}
            />
            <Input
              placeholder="Price"
              value={price}
              onChangeText={value => setPrice(value)}
              keyboardType="numeric"
            />
            <Input
              placeholder="Quantity"
              value={quantity}
              onChangeText={value => setQuantity(value)}
              keyboardType="numeric"
            />
          </ScrollView>
        </View>
      );
    }
  };




  return (
    <ScrollView style={styles.container}>
      {checkCollection()}
      
      <Button
        title="Update User"
        onPress={() => updateUser()}
        buttonStyle={{backgroundColor: 'green'}}
      />
      <Button
        containerStyle={{marginTop: 10}}
        title="Delete User"
        onPress={() => deleteUser()}
        buttonStyle={{backgroundColor: 'red'}}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
});
