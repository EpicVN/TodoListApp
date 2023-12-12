import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';
import { React, useState } from 'react';
import Colors from './components/Colors';
import {AntDesign} from '@expo/vector-icons';
import tempData from './components/tempData';
import TodoList from './components/TodoList';
import AddListModal from './components/AddListModal';

export default function App() {
  const [addTodoVisible, setAddTodoVisible] = useState(false);
  const [todoLists, setTodoLists] = useState(tempData);

  const toggleAddTodoModal = () => {
    setAddTodoVisible(!addTodoVisible);
  };

  const addTodoList = (newTodoList) => {
    setTodoLists([...todoLists, newTodoList]);
  };

  const completeTask = (index) => {
    let itemsCopy = [...todoLists];
    itemsCopy.splice(index, 1);
    setTodoLists(itemsCopy);
  };

  renderList = list => {
    return <TodoList list={list} onDelete={() => completeTask()}/>
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType='slide' 
        visible={addTodoVisible}
        onRequestClose={toggleAddTodoModal}
      >
        <AddListModal closeModal={toggleAddTodoModal} addTodoList={addTodoList}/>
      </Modal>

      <View style={{flexDirection: 'row'}}>
        <View style={styles.divider}></View>
        <Text style={styles.title}>
          Todo <Text style={{fontWeight: '800', color: Colors.blue}}>List</Text>
        </Text>
        <View style={styles.divider}></View>
      </View>

      <View style={{marginVertical: 48}}>
        <TouchableOpacity 
          style={styles.addList} 
          onPress={toggleAddTodoModal}
        >
          <AntDesign name='plus' size={16} color={Colors.blue}></AntDesign>
        </TouchableOpacity>

        <Text style={styles.add}>Add List</Text>
      </View>

      <View style={{height: 275, paddingLeft: 32}}>
        <FlatList 
          data={todoLists}
          keyExtractor={item => item.name}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => renderList(item)}
          keyboardShouldPersistTaps='always'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: Colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: Colors.black,
    paddingHorizontal: 64
  },
  addList: {
    borderWidth: 2,
    borderColor: Colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  add: {
    color: Colors.lightBlue,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8
  }
});
