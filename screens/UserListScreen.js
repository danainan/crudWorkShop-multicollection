import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {ListItem} from 'react-native-elements';

export default function UsersListScreen({navigation}) {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setUsers(users);
      });

    firestore()
      .collection('admins')
      .onSnapshot(querySnapshot => {
        const admins = [];

        querySnapshot.forEach(documentSnapshot => {
          admins.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setAdmins(admins);
      });

    firestore()
    .collection('orders')
    .onSnapshot(querySnapshot => {
      const orders = [];

      querySnapshot.forEach(documentSnapshot => {
        orders.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      setOrders(orders);
    });


    return () => subscriber();
  }, []);

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

  const [selectedValue, setSelectedValue] = useState('Users Collection');


  const checkCollection = () => {
    if (selectedValue === 'Users Collection') {
      return (
        <FlatList
          style={styles.list}
          data={users}
          renderItem={({item}) => (
            <ListItem
              bottomDivider
              onPress={() => {
                navigation.navigate('UserDetailScreen', {
                  userId: item.key,
                  collectionValue: selectedValue,
                });
              }}>
              <ListItem.Content>
                <ListItem.Title>Name : {item.name}</ListItem.Title>
                <ListItem.Subtitle>Email : {item.email}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )}
        />
      );
    } else if (selectedValue === 'Admins Collection') {
      return (
        <FlatList
          style={styles.list}
          data={admins}
          renderItem={({item}) => (
            <ListItem
              bottomDivider
              onPress={() => {
                navigation.navigate('UserDetailScreen', {
                  userId: item.key,
                  collectionValue: selectedValue,
                });
              }}>
              <ListItem.Content>
                <ListItem.Title>Name : {item.name}</ListItem.Title>
                <ListItem.Subtitle>Email : {item.email}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )}
        />
      );
    } else if (selectedValue === 'Orders Collection') {
      return (
        <FlatList
          style={styles.list}
          data={orders}
          renderItem={({item}) => (
            <ListItem
              bottomDivider
              onPress={() => {
                navigation.navigate('UserDetailScreen', {
                  userId: item.key,
                  collectionValue: selectedValue,
                });
              }}>
              <ListItem.Content>
                <ListItem.Title>Name : {item.name}</ListItem.Title>
                <Text>Price : {item.price}</Text>
                <Text>Quantity : {item.quantity}</Text>
              </ListItem.Content>
            </ListItem>
          )}
        />
      );
    }
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={collectionSelect}
        renderItem={({item}) => (
          <ListItem
            containerStyle={styles.collectlist}
            bottomDivider
            onPress={() => {
              setSelectedValue(item.nameCollect);
            }}>
            <ListItem.Content>
              <ListItem.Title>{item.nameCollect}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        )}
      />

      <View style={styles.listContainer}>
        {checkCollection()}
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  listContainer: {
    flex: 1,
    marginTop: -250,
  },
  listItem: {
    marginVertical: 5,
    marginHorizontal: 30,
    backgroundColor: '#BFF4F1',
  },
  collectlist: {
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#36BDB5',
  },
});
