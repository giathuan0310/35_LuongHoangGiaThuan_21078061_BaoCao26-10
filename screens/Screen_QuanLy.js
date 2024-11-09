import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
    Alert,
    ScrollView,
    TouchableOpacity,
    Modal,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Screen_QuanLy = () => {
    const navigation = useNavigation();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUserName, setSelectedUserName] = useState(null);
    const [deleteError, setDeleteError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/login');
            setUsers(response.data);
        } catch (error) {
            Alert.alert("Error", "Failed to load user data");
            console.error("API fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Show delete confirmation modal
    const showDeleteConfirmation = (userName) => {
        setSelectedUserName(userName);
        setModalVisible(true);
    };

    // Delete user
    const deleteUser = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/deleteUser/${selectedUserName}`);
            if (response.status === 200) {
                setUsers(users.filter(user => user.name !== selectedUserName));
                setModalVisible(false); // Close modal
                Alert.alert("Success", "User deleted successfully");
            }
        } catch (error) {
            setDeleteError("Failed to delete user");
            console.error("API delete error:", error);
        }
    };

    // Render loading indicator
    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }


    const handleEditUser = (user) => {
        navigation.navigate('Register', {
            userName: user.name,
            userPass: user.pass,
            userAvatar: user.avatar, // Pass the avatar if needed
        });
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <h1>Quản Lý User</h1>
            <ScrollView horizontal>
                <View style={styles.tableContainer}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableHeader}>ID</Text>
                        <Text style={styles.tableHeader}>Avatar</Text>
                        <Text style={styles.tableHeader}>Name</Text>
                        <Text style={styles.tableHeader}>Password</Text>
                        <Text style={styles.tableHeader}>Actions</Text>
                    </View>

                    {users.map((user) => (
                        <View key={user.Id} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{user.Id}</Text>
                            <Image source={{ uri: user.avatar }} style={styles.userImage} />
                            <Text style={styles.tableCell}>{user.name}</Text>
                            <Text style={styles.tableCell}>{user.pass}</Text>
                            <View style={styles.actionButtons}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => handleEditUser(user)}
                                >
                                    <Text style={styles.buttonText}>Sửa</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => showDeleteConfirmation(user.name)}
                                >
                                    <Text style={styles.buttonText}>Xóa</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Modal for delete confirmation */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Are you sure you want to delete this user?</Text>
                        {deleteError ? <Text style={styles.errorText}>{deleteError}</Text> : null}
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={deleteUser} // Confirm deletion
                            >
                                <Text style={styles.modalButtonText}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => setModalVisible(false)} // Cancel deletion
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

// Styles for component
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    tableContainer: {
        padding: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 10,
        alignItems: 'center',
    },
    tableHeader: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 16,
        paddingVertical: 5,
        color: '#333',
        textAlign: 'center',
    },
    tableCell: {
        flex: 1,
        fontSize: 14,
        paddingVertical: 5,
        color: '#555',
        textAlign: 'center',
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginHorizontal: 10,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 5,
        marginHorizontal: 2,
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 15,
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 5,
        marginHorizontal: 2,
        flex: 1,
        margin: 5,
    },
    modalButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default Screen_QuanLy;
