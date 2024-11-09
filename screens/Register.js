// register.js
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Register({ navigation }) {
    const route = useRoute();
    const [user, setUser] = useState(route.params?.userName || "");  // Pre-fill with userName if available
    const [pass, setPass] = useState(route.params?.userPass || "");  // Pre-fill with userPass if available
    const [avatar, setAvatar] = useState(route.params?.userAvatar || 'https://png.pngtree.com/png-clipart/20200701/original/pngtree-black-default-avatar-png-image_5407174.jpg');  // Pre-fill with avatar if available
    
    const handleRegister = async () => {
      try {
          let response;
          
          if (route.params?.userId) {
              // Update existing user
              response = await axios.put(`http://localhost:3000/updateUser/${route.params.userId}`, {
                  username: user,
                  password: pass,
                  avatar: avatar
              });
              Alert.alert("Cập nhật thành công!", response.data.message);
          } else {
              // Create new user
              response = await axios.post('http://localhost:3000/api/register', {
                  name: user,
                  pass: pass,
                  avatar: avatar
              });
              Alert.alert("Đăng ký thành công!", response.data.message);
          }
          
          navigation.goBack();  // Go back after success
      } catch (error) {
          if (error.response) {
              Alert.alert("Lỗi", error.response.data.error || "Đăng ký thất bại");
          } else {
              Alert.alert("Lỗi", "Có lỗi xảy ra. Vui lòng thử lại sau.");
          }
      }
  };
  
  

   

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image style={{ height: 100, width: 100 }} source={require('../assets/exploreicon.png')} />
                <Text style={{ color: 'black', fontSize: 25 }}>
                    {user ? 'UPDATE' : 'REGISTER'}  {/* Change title based on user existence */}
                </Text>
            </View>
            <View style={styles.viewInput}>
                <View style={styles.input}>
                    <Icon name='user' size={30} color={'black'} />
                    <TextInput
                        style={{ marginLeft: 10, flex: 1, paddingHorizontal: 10, color: 'gray' }}
                        placeholder='user name'
                        placeholderTextColor={'gray'}
                        value={user}
                        onChangeText={setUser} // Update state on change
                    />
                </View>
                <View style={styles.input}>
                    <Icon name='lock' size={30} color={'black'} />
                    <TextInput
                        style={{ marginLeft: 10, flex: 1, paddingHorizontal: 10, color: 'gray' }}
                        placeholder='password'
                        placeholderTextColor={'gray'}
                        value={pass}
                        onChangeText={setPass} // Update state on change
                    />
                </View>

                <TouchableOpacity style={styles.Touch} onPress={handleRegister}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
                        {user ? 'UPDATE' : 'REGISTER'}  {/* Change button text */}
                    </Text>
                </TouchableOpacity>

                <View style={styles.hr} />

                <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 15, color: 'black' }}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logo: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    viewInput: {
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    input: {
        borderColor: 'gray',
        borderWidth: .3,
        borderRadius: 15,
        padding: 10,
        flexDirection: 'row',
        marginVertical: 10,
        color: 'black'
    },
    Touch: {
        padding: 10,
        backgroundColor: '#00bdd6',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 15
    },
    hr: {
        width: '100%',
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 20,
    },
});
