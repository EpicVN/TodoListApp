import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import React, {useState} from 'react'
import Colors from './Colors'
import { MaterialIcons } from '@expo/vector-icons'; 
import ToDoModal from './ToDoModal';

export default TodoList = ({ list, onDelete }) => {
  const [listVisible, setListVisible] = useState(false);

  const toggleListModal = () => {
    setListVisible(!listVisible);
  };

  return (
    <View>
      <Modal 
          animationType='slide' 
          visible={listVisible} 
          onRequestClose={toggleListModal}
        >
          <ToDoModal list={list} closeModal={toggleListModal}/>
        </Modal>
      <TouchableOpacity 
        style={[styles.listContainer, {backgroundColor: list.color}]}
        onPress={toggleListModal}
      >
        <Text style={styles.listTitle} numberOfLines={5}>
          {list.name}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(list.id)}
      >
        <MaterialIcons name="delete" size={30} color={Colors.black} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: 'center',
        width:200
    },
    listTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.white,
        marginBottom: 18
    },
    deleteButton: {
      position: 'absolute',
      top: 5,
      right: 15,
    },
})