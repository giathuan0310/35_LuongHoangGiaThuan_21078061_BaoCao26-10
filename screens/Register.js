// register.js
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/EvilIcons';

import { useState} from 'react';

export default function Register({navigation}) {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    const handleRegister = async () => {
      try {
        const response = await axios.post('http://192.168.132.2:3000/api/register', {
          name: user,
          pass: pass,
          avatar: 'https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/08/26/382/anh-gai-vu-to-1.jpg'
        });
        Alert.alert("Đăng ký thành công!", response.data.message);
        navigation.goBack();
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
            <Image style={{height: 100, width: 100}} source={require('../assets/exploreicon.png')}/>
            <Text style={{color: 'black', fontSize: 25, }}>REGISTER</Text>
        </View>
        <View style={styles.viewInput}>
            <View style={styles.input}>
                <Icon name='user' size={30} color={'black'}/>
                <TextInput style={{marginLeft: 10, flex: 1, paddingHorizontal: 10, color: 'gray'}} 
                placeholder='user name' placeholderTextColor={'gray'} value={user} onChangeText={setUser}/>
            </View>
            <View style={styles.input}>
                <Icon name='lock' size={30} color={'black'}/>
                <TextInput style={{marginLeft: 10, flex: 1, paddingHorizontal: 10, color: 'gray'}} 
                placeholder='password' placeholderTextColor={'gray'} value={pass} onChangeText={setPass}/>
            </View>

            <TouchableOpacity style={styles.Touch} onPress={handleRegister}>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>Register</Text>
            </TouchableOpacity>

            <View style={styles.hr}/>

            <TouchableOpacity style={{alignItems: 'center'}} onPress={()=> navigation.goBack()}>
                <Text style={{fontSize: 15, color: 'black'}}>Login</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }, logo: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  }, viewInput: {
    paddingVertical: 20,
    paddingHorizontal: 10
  }, input: {
    borderColor: 'gray',
    borderWidth: .3,
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    marginVertical: 10,
    color: 'black'
  }, Touch : {
    padding: 10,
    backgroundColor: '#00bdd6',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 15
  }, hr: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
});