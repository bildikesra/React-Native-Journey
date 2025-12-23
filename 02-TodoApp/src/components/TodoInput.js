// React Native core + icon library
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

// veya: import { Plus } from 'lucide-react-native';
import { THEME } from '../constants/theme';


export const TodoInput = ({ onAdd }) => {
    const [text, setText] = useState('');
    
    const handleAdd = () => {
        if(text.trim()) {
            onAdd(text);
            setText('');
        }
    };

    return (
        <View style = {styles.container}>
            <TextInput
            style = {styles.input}
            placeholder='Yeni görev ekle..'
            value= {text}
            onChangeText={setText}
            onSubmitEditing={handleAdd}
            placeholderTextColor={THEME.colors.textLight}
            returnKeyType='done'
            />
            <TouchableOpacity 
            style = {styles.button}
            onPress={handleAdd}
            activeOpacity={0.7}>
             <Feather name="plus" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        paddingHorizontal : THEME.spacing.lg,
        marginBottom : THEME.spacing.lg,
        gap : THEME.spacing.sm
    },
    input : {
        flex : 1,
        backgroundColor : THEME.colors.card,
        paddingHorizontal : THEME.spacing.md,
        paddingVertical : THEME.spacing.md,
        borderRadius : 12,
        fontSize : 16,
        color : THEME.colors.text
    },
    button : {
        backgroundColor : THEME.colors.primary,
        width : 50,
        height : 50,
        borderRadius : 12,
        justifyContent : 'center',
        alignItems : 'center'
    }
})