import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, KeyboardAvoidingView, TextInput, Animated } from 'react-native';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import Colors from '../Colors';

export default class TodoModal extends React.Component {

    state = {
        newTodo: ""
    };

    toggleTodoCompleted = index => {
        let list = this.props.list; 
        list.todos[index].completed = !list.todos[index].completed;

        this.props.updateList(list);
    }

    addTodo = () => {
        let list = this.props.list;

        if (!list.todos.some(todo => todo.title === this.state.newTodo)){
            list.todos.push({ title: this.state.newTodo, completed: false });

            this.props.updateList(list);
        }

        
        this.setState({ newTodo: ""}); 
    }

    deleteTodo = index => {
        let list = this.props.list;

        list.todos.splice(index, 1);

        this.props.updateList(list);
    }

    renderTodo = (todo,index) => {

        return (
                <View style={styles.todoContainer} >
                    <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)} >
                            <Ionicons name={todo.completed ? "ios-square" : "ios-square-outline"} size={24} color={Colors.gray} style={{width: 32}} />
                    </TouchableOpacity>

                    <Text onLongPress={() => this.deleteTodo(index)} style={[styles.todo, {textDecorationLine: todo.completed ? "line-through" : "none", color: todo.completed ? Colors.gray : Colors.black}]}>{todo.title}</Text>

                    <View>
                        <TouchableOpacity onPress={() => this.deleteTodo(index)} style={{marginLeft: 100}}>
                            <Animated.View style={styles.deleteButton}>
                                    <Animated.Text style={{color: Colors.white, fontWeight: "800"}}>Xóa</Animated.Text>
                            </Animated.View>
                         </TouchableOpacity>
                    </View>
                    
                </View>
        );
    };


  render() {
    const list = this.props.list;

    const taskCount = list.todos.length;
    const completedCount = list.todos.filter(todo => todo.completed).length; 

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
            <SafeAreaView style={styles.container}>

                <TouchableOpacity styles={{position: "absolute", top: 64, right: 32, zIndex: 10}} onPress={this.props.closeModal}>

                    <AntDesign name = "close" size ={24} color={Colors.black} />
        
                </TouchableOpacity>

                <View style={[styles.section, styles.header, {borderBottomColor: list.color}]}>
                    <View>
                            <Text style={styles.title}>{list.name}</Text>
                            <Text style={styles.taskCount}>
                                {completedCount} of {taskCount} tasks
                            </Text>
                    </View>
                </View>

                <View style={styles.section, {flex: 3}}>

                    <FlatList data={list.todos} renderItem={({ item,index }) => this.renderTodo(item,index)} keyExtractor={item => item.title} contentContainerStyle={{paddingHorizontal: 32, paddingVertical: 64}} showsHorizontalScrollIndicator={false}/>

                </View>

                <View style={[styles.section, styles.footer]} >

                    <TextInput style={[styles.input, {borderColor: list.color}]} onChangeText={text => this.setState({newTodo: text})} value={this.state.newTodo} />
                    <TouchableOpacity style={[styles.addTodo, {backgroundColor: list.color}]} onPress={() => this.addTodo()}>
                            <AntDesign name="plus" size={16} color={Colors.white} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
  }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    section:{
        alignSelf: "stretch"
    },
    header: {
        justifyContent: "flex-end",
        marginLeft: 64,
        borderBottomWidth: 3,
        paddingTop: 16
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: Colors.black
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16, 
        color: Colors.gray,
        fontWeight: "600"
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 150
    },
    todo: {
        color: Colors.black,
        fontWeight: "700",
        fontSize: 16
    },
    deleteButton: {
        flex: 1,
        backgroundColor: Colors.red,
        justifyContent: "center",
        alignItems: "center",
        width: 80
    }
});
