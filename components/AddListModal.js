import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import Colors from './Colors';
import { React, useState } from 'react';

const AddListModal = ({ closeModal, addTodoList }) => {
  backgroundColors = ["#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D85963", "#D88559"];
  const [name, setName] = useState("");
  const [color, setColor] = useState(backgroundColors[0]);

  const createTodo = () => {
    if (name) {
      addTodoList({ name, color });
      closeModal();
    }
  };

  const renderColors = () => {
    return backgroundColors.map((bgColor) => (
      <TouchableOpacity
        key={bgColor}
        style={[styles.colorSelect, { backgroundColor: bgColor }]}
        onPress={() => setColor(bgColor)}
      />
    ));
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior='padding'
    >
      <TouchableOpacity style={{position: 'absolute', top: 64, right: 32}} onPress={closeModal}>
        <AntDesign name='close' size={24} color={Colors.black} />
      </TouchableOpacity>

      <View style={{alignSelf: 'stretch', marginHorizontal: 32}}>
        <Text style={styles.title}>Create Todo List</Text>
        
        <TextInput 
          style={styles.input}
          placeholder='Type your Todo List'
          value={name}
          onChangeText={setName}
        />
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
          {renderColors()}
        </View>
        
        <TouchableOpacity 
          style={[styles.create, {backgroundColor: color}]}
          onPress={createTodo}
        >
          <Text style={{color: Colors.white, fontWeight: '600'}}>Create</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    alignSelf: 'center',
    marginBottom: 16,
    color: Colors.black
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 16
  },
  create: {
    marginTop: 28,
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
    marginTop: 4
  }
});

export default AddListModal;