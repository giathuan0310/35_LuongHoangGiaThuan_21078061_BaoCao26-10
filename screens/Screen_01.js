import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, SafeAreaView, Platform, TextInput, Modal, Button } from 'react-native';
import axios from 'axios';

// Component chính cho giao diện màn hình
const Screen_01 = () => {
    const [category, setCategory] = useState([]);
    const [location, setLocation] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false); // State để quản lý modal
    const screenWidth = Dimensions.get('window').width;

    const username = localStorage.getItem('name') || 'Khách';
    const [avatar, setAvatar] = useState(''); // State for avatar

    useEffect(() => {
        // Gọi API để lấy danh sách danh mục và cập nhật vào state `category`
        axios.get('https://671d40ae09103098807ca930.mockapi.io/category').then((response) => {
            setCategory(response.data);
        });
        // Gọi API để lấy danh sách địa điểm và cập nhật vào state `location`
        axios.get('https://671d40ae09103098807ca930.mockapi.io/location').then((response) => {
            setLocation(response.data);
        });

        // Fetch avatar based on username
        if (username) {
            axios.get(`http://192.168.2.58:3000/avatar/${username}`)
                .then((response) => {
                    setAvatar(response.data.avatar); // Set avatar from response
                })
                .catch((error) => {
                    console.error('Error fetching avatar:', error);
                });
        }
    }, []);

    const numColumns = 4;

    const handleLogout = () => {
        // Logic to handle logout
        // You can clear local storage or perform other logout operations here
        localStorage.removeItem('name');
        
        // Chuyển hướng đến trang đăng nhập
        navigation.navigate('LoginScreen');
        setIsModalVisible(false); // Đóng modal sau khi log out
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Khu vực có thể cuộn cho nội dung toàn bộ màn hình */}
                <ScrollView style={{ width: "100%", height: 500 }}>

                    {/* Phần header */}
                    <View style={styles.headerContainer}>
                        <View style={styles.header}>
                            <Image source={require('../assets/logoicon.png')} style={styles.logoicon} />
                            <View style={[styles.searchBox, searchFocused && styles.inputContainerFocused]}>
                                <TextInput
                                    style={styles.searchInput}
                                    placeholder='Search here.....'
                                />
                                <Image source={require('../assets/findicon.png')} style={styles.searchIcon} />
                            </View>
                        </View>

                        <View style={styles.userInfoContainer}>
                            <View style={styles.userInfo}>
                                <Image source={{ uri: avatar }} style={styles.userImage} />
                                <View>
                                    <Text style={styles.welcomeText}>Welcome!</Text>
                                    <Text style={styles.userName}>{username}</Text>
                                </View>
                                <Image source={require('../assets/ringicon.png')} style={styles.iconBell} />
                            </View>
                        </View>
                    </View>

                    {/* Tiêu đề phần Danh mục */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Category</Text>
                        <Image source={require('../assets/3gach.png')} style={styles.icon3gach} />
                    </View>

                    {/* Hiển thị danh mục dưới dạng lưới với 4 cột */}
                    <FlatList
                        data={category}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={[styles.categoryItem, { width: screenWidth / numColumns }]}>
                                <View style={styles.categoryIconContainer}>
                                    <Image source={{ uri: item.image }} style={styles.categoryIcon} />
                                </View>
                                <Text style={styles.categoryText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        numColumns={numColumns}
                    />

                    {/* Tiêu đề phần Địa điểm phổ biến */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Popular Destination</Text>
                        <Image source={require('../assets/3gach.png')} style={styles.icon3gach} />
                    </View>

                    {/* Hiển thị các địa điểm phổ biến trong chế độ cuộn ngang */}
                    <FlatList
                        data={location.slice(0, 3)}
                        horizontal
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Image source={{ uri: item.image }} style={styles.locationImage} />
                        )}
                    />

                    {/* Tiêu đề phần Đề xuất */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Recommended</Text>
                    </View>

                    {/* Hiển thị các địa điểm đề xuất trong chế độ cuộn ngang */}
                    <FlatList
                        data={location.slice(3, 5)}
                        horizontal
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Image source={{ uri: item.image }} style={styles.locationImageOfRec} />
                        )}
                    />

                </ScrollView>

                {/* Tạo footer */}
                <View style={styles.bottomNav}>
                    <TouchableOpacity style={styles.navItem}>
                        <Image source={require('../assets/homeicon.png')} style={styles.userImage} />
                        <Text style={styles.navLabel}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navItem}>
                        <Image source={require('../assets/exploreicon.png')} style={styles.userImage} />
                        <Text style={styles.navLabel}>Explore</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navItem}>
                        <Image source={require('../assets/searchicon.png')} style={styles.userImage} />
                        <Text style={styles.navLabel}>Search</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navItem} onPress={() => setIsModalVisible(true)}> {/* Mở modal khi bấm vào nút Profile */}
                        <Image source={require('../assets/profileicon.png')} style={styles.userImage} />
                        <Text style={styles.navLabel}>Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Modal cho Logout */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => setIsModalVisible(false)} // Đóng modal khi nhấn nút quay lại
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Are you sure you want to log out?</Text>
                            <Button title="Log Out" onPress={handleLogout} color="#FF0000" /> {/* Xử lý log out */}
                            <Button title="Cancel" onPress={() => setIsModalVisible(false)} /> {/* Đóng modal */}
                        </View>
                    </View>
                </Modal>

            </View>
        </SafeAreaView>
    );
};

// Các style cho từng thành phần của component
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    headerContainer: {
        backgroundColor: '#5958b2',
        height: 220,
    },
    header: {
        padding: 20,
        marginTop: 25,
        backgroundColor: '#5958b2',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logoicon: {
        width: 50,
        height: 50
    },
    searchBox: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10,
        borderRadius: 10,
        marginRight: 10,
        padding: 15
    },
    inputContainerFocused: {
        borderColor: '#1f1f1f',
        borderWidth: 1
    },
    searchInput: {
        backgroundColor: 'transparent',
        outlineWidth: 0,
        flex: 1,
    },
    searchIcon: {
        width: 20,
        height: 20,
    },
    userInfoContainer: {
        alignItems: 'flex-start',
        marginLeft: 10,
        marginTop: 10,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10,
    },
    userImage: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        marginRight: 10,
    },
    welcomeText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    userName: {
        color: '#fff'
    },
    iconBell: {
        width: 25,
        height: 25,
        marginLeft: 10
    },
    sectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        marginHorizontal: 20,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#3a3a3a',
    },
    icon3gach: {
        width: 20,
        height: 20,
    },
    categoryItem: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    categoryIconContainer: {
        backgroundColor: '#e6e6e6',
        borderRadius: 10,
        padding: 10,
        marginBottom: 5,
    },
    categoryIcon: {
        width: 50,
        height: 50,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3a3a3a',
    },
    locationImage: {
        width: 150,
        height: 100,
        borderRadius: 10,
        margin: 10,
    },
    locationImageOfRec: {
        width: 100,
        height: 100,
        borderRadius: 10,
        margin: 10,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    navItem: {
        alignItems: 'center',
    },
    navLabel: {
        fontSize: 12,
        color: '#3a3a3a',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền mờ
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default Screen_01;
