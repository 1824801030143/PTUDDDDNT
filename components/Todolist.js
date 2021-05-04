import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, Modal } from 'react-native';
import Colors from '../Colors';
import EditListModal from './EditListModal';
import TodoModal from './TodoModal';    

export default class Todolist extends React.Component {

    state = {
        showListVisible: false,
        editModal: false
    };

    toggleEditModal() {
            this.setState({editModal: !this.state.editModal})
    }

    addList = list => {
        firebase.addList({
            name: list.name,
            color: list.color,
            todos: []
        });
    };

    deleteList = list => {
        firebase.deleteList(list);
    };

    toggleListModal() {
        this.setState({showListVisible: !this.state.showListVisible})
    }

    renderList = list => {
        return <TodoList list={list} updateList={this.updateList} deleteList={this.deleteList}  />
      };

    render(){
        const list = this.props.list;
        const completedCount = list.todos.filter(todo => todo.completed).length;
        const remainingCount = list.todos.length - completedCount;


        return (
            <View>
                <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={() => this.toggleListModal()}>
                    <TodoModal list={list} closeModal ={() => this.toggleListModal()} updateList={this.props.updateList}/>
                </Modal>
                <TouchableOpacity style={[styles.listContainer, {backgroundColor: list.color}]} onPress={() => this.toggleListModal()}>
                    <Text style={styles.listTitle} numberOfLines={1}>
                            {list.name}
                    </Text>
                
                    <View>
                        <View style={{alignItems: "center"}}>
                                <Text style={styles.count}>{remainingCount}</Text>
                                <Text style={styles.subtitle}>Đang thực hiện</Text>
                        </View>
                        <View style={{alignItems: "center"}}>
                                <Text style={styles.count}>{completedCount}</Text>
                                <Text style={styles.subtitle}>Đã hoàn thành</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <Modal animationType="slide" visible  = {this.state.editModal} onRequestClose = {() => this.toggleEditModal()}>
                        <EditListModal closeModal = {() => this.toggleEditModal()} addList={this.addList} />
                </Modal>

                    <View style={{marginLeft: 10, marginTop: 20, width:"40%"}}>
                        <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => this.toggleEditModal()}>
                                <Text style={styles.btn}>Chỉnh sửa</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginLeft: 120,marginTop:-20, width:"40%"}} >
                        <TouchableOpacity style={{justifyContent:'center'}} onPress={() => this.props.deleteList(list)}>
                            <Text style={styles.btn}>Xóa</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        )
    };

    }


const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",
        width: 200
    },
    listTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.white,
        marginBottom: 18
    },
    Count:{
        fontSize: 48,
        fontWeight: "200",
        color: Colors.white
    },
    subtitle:{
        fontSize: 12,
        fontWeight: "700",
        color : Colors.white
    },
    btn: {
        fontSize: 15,
        fontWeight: "600",
        color: Colors.white,
        backgroundColor: Colors.red,
        borderRadius : 6,
        textAlign:'center'
    }
})
