
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME } from '../constants/theme';


export const StatsCard = ({label, value, color}) => {
    return (
        <View style = {styles.container}>
        <Text style = {[styles.value, {color}]}>{value}</Text>
        <Text style = {styles.label}>{label}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
 container : {
    flex : 1,
    backgroundColor : THEME.colors.card,
    padding : THEME.spacing.md,
    borderRadius : 12,
    alignItems : 'center',
    shadowColor : '#000',
    shadowOffset : { width : 0 , height : 2 },
    shadowOpacity : 0.05,
    shadowRadius : 8,
    elevation : 2
 },
 value : {
    fontSize : 24,
    fontWeight : 'bold',
    marginBottom : THEME.spacing.xs
 },
 label : {
    fontSize : 12,
    color : THEME.colors.textLight,
 }
});