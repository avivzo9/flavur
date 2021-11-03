import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Form() {
    const [user, setUser] = useState(null)
    const [fullname, setFullname] = useState(null)
    const [email, setEmail] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState(null)
    const onlyNumeric = /[^0-9]/g;

    return (
        <>
            {user && <View>
                <Text>{user.fullname}</Text>
                <Text>{user.email}</Text>
                <Text>{user.phoneNumber}</Text>
            </View>}
            {!user && <View>
                <View style={styles.inputCon}>
                    <Text style={styles.inputTxt}>Name:</Text>
                    <TextInput maxLength={20} onChangeText={txt => setFullname(txt)} style={styles.input} placeholder="Full name" />
                </View>
                <View style={styles.inputCon}>
                    <Text style={styles.inputTxt}>E-mail:</Text>
                    <TextInput onChangeText={txt => setEmail(txt)} style={styles.input} placeholder="E-mail" />
                </View>
                <View style={styles.inputCon}>
                    <Text style={styles.inputTxt}>Number:</Text>
                    <TextInput keyboardType={'phone-pad'} onChangeText={txt => setPhoneNumber(txt.replace(onlyNumeric, ''))} style={styles.input} placeholder="Phone number" />
                </View>
            </View>}
            <View>
                <Button title={user ? 'exit' : 'Save'} onPress={() => user ? setUser(null) : setUser({ fullname, email, phoneNumber })} />
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    inputCon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        color: 'black',
        padding: 8,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5
    },
    inputTxt: {
        color: 'black',
        flex: 0.2,
        padding: 16
    }
})