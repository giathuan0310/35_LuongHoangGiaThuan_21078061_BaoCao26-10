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

const Screen_QuanLy = () => {
    

    return (
        <h1>Quản lý user</h1>
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
