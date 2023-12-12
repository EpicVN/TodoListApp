import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, KeyboardAvoidingView ,FlatList, TextInput, Keyboard } from 'react-native'
import React, {useState} from 'react'
import {AntDesign} from '@expo/vector-icons';
import Colors from './Colors';
import Task from './Task';

export default function ToDoModal({list, closeModal}) {
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);
    const handleAddTask = () => {
        Keyboard.dismiss();
        setTaskItems([...taskItems, task]);
        setTask(null);
    }

    const addTask = () => {
        if (task.trim() !== '') {
          handleAddTask(task);
          setTask('');
        }
      };

    const completeTask = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy);
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity 
                style={{position: 'absolute', top: 64, right: 32, zIndex: 10}} 
                onPress={closeModal}
            >
                <AntDesign name='close' size={24} color={Colors.black}/>
            </TouchableOpacity>
    
          {/* Today's task */}
            <View style={styles.tasksWrapper}>
                <Text style={styles.sectionTitle}>Today's tasks</Text>
        
                <View style={styles.items}>
                {
                    taskItems.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                            <Task text={item}/>
                            </TouchableOpacity>
                        ) 
                    })
                }
                </View>

                
            </View>
    
          <KeyboardAvoidingView 
                style={[styles.section, styles.footer]} 
                behavior='padding'
            >
                <TextInput 
                    style={[styles.input, {borderColor: list.color}]} 
                    placeholder={'Write a task'} value={task} 
                    onChangeText={text => setTask(text)}
                />

                <TouchableOpacity style={[styles.addTodo, {backgroundColor: list.color}]} onPress={() => handleAddTask()}>
                    <AntDesign name='plus' color={Colors.white} size={16}/>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
      );
    }
    
    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    tasksWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    items: {
        marginTop: 30,
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1
    },
    addText: {
    
    },
    section: {
        flex: 1,
        alignSelf: 'stretch'
    },
    header: {
        justifyContent: 'flex-end',
        marginLeft: 64,
        borderBottomWidth: 3
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: Colors.black
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: Colors.gray,
        fontWeight: '600'
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: 'row',
        alignItems: 'center'
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    todo: {
        color: Colors.black,
        fontSize:16,
        fontWeight: '700'
    }
});