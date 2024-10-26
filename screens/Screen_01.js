import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, SafeAreaView, Platform, TextInput } from 'react-native';
import axios from 'axios';

// Component chính cho giao diện màn hình
const Screen_01 = () => {
    const[category,setCategory]=useState([]);
    const[location,setLocation]=useState([]);
    const[searchQuery,setSearchQuery]=useState('');
    const[searchFocused,setSearchFocused]=useState(false);

    const screenWidth=Dimensions.get('window').width;



    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Khu vực có thể cuộn cho nội dung toàn bộ màn hình */}
                <ScrollView style={{width: "100%", height: 500}}>
                    
                    {/* Phần header */}
                    <View style={styles.headerContainer}>
                        {/* logo và thanh tìm kiếm */}
                        <View style={styles.header}>
                            <Image source={require('../assets/logoicon.png')} style={styles.logoicon}/>
                            <View style={[styles.searchBox,searchFocused && styles.inputContainerFocused]}>

                                <TextInput style={styles.searchInput}
                                placeholder='Search here.....'
                                />
                                <Image source={require('../assets/searchicon.png')} style={styles.searchIcon} />
                            </View>

                        </View>
                    </View>

               
                </ScrollView>

               
            </View>
        </SafeAreaView>
    );
};

// Các style cho từng thành phần của component
const styles = StyleSheet.create({
    safeArea:{
        flex: 1,
        backgroundColor: '#fff',
    },
    container:{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? 25 : 0,  // Thêm khoảng cách cho Android ở trên cùng
    },
    headerContainer:{
        backgroundColor: '#5958b2',
        height: 220,  // Chiều cao cố định cho phần header
    },
    header:{
        padding:20,
        marginTop:25,
        backgroundColor: '#5958b2',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'

    },
    logoicon:{
        width:50,
        height:50
    },
    searchBox:{
        flex:1,
        flexDirection:'row',
        backgroundColor: '#fff',
        justifyContent:'space-between',
        alignItems:'center',
        marginLeft:10,
        borderRadius:10,
        marginRight:10,
        padding:15
    },
    inputContainerFocused:{
       borderColor:'#1f1f1f',
       borderWidth:1

    },
    searchInput:{
        backgroundColor:'transparent',
        outlineWidth:0,
        flex:1,

    },
    searchIcon:{
        width:20,
        height:20,
        
    },
    userInfoContainer:{
        paddingRight: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userInfo:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        paddingLeft: 23,
    },
    userImage:{
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    welcomeText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
    userName:{
        color: '#FFF',
    },
    iconBell:{
        width: 30,
        height: 30,
    },
    sectionContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    sectionTitle:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    icon3gach:{
        width: 20,
        height: 20,
        marginLeft: 5,
    },
    categoryItem:{
        padding: 10,
        alignItems: 'center',
    },
    categoryIconContainer:{
        backgroundColor: '#f2f2f2',
        padding: 15,
        borderRadius: 50,
    },
    categoryIcon:{
        width: 30,
        height: 30,
    },
    categoryText:{
        marginTop: 5,
        fontSize: 12,
    },
    locationImage:{
        width: 120,
        height: 120,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    locationImageOfRec:{
        width: 100,
        height: 100,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    bottomNav:{
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderColor: '#f2f2f2',
        paddingVertical: 10,
    },
    navItem:{
        alignItems: 'center',
    },
    navicon:{
        width: 24,
        height: 24,
    },
    navLabel:{
        fontSize: 10,
        color: '#7c7c7c',
        marginTop: 2,
    },

    
});

export default Screen_01;
