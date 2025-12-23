import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../constants/theme';


export const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.content}
        onPress={() => onToggle(todo.id)}
        activeOpacity={0.7}
      >
        <View style={[
          styles.checkbox,
          todo.completed && styles.checkboxCompleted
        ]}>
          {todo.completed && (
            <Feather name="check" size={16} color="#fff" />
          )}
        </View>
        <Text style={[
          styles.text,
          todo.completed && styles.textCompleted
        ]}>
          {todo.text}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={() => onDelete(todo.id)}
        style={styles.deleteBtn}
      >
      <Feather name="trash-2" size={20} color={THEME.colors.danger} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.card,
    padding: THEME.spacing.md,
    borderRadius: 12,
    marginBottom: THEME.spacing.sm,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: THEME.colors.border,
    marginRight: THEME.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: THEME.colors.success,
    borderColor: THEME.colors.success,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: THEME.colors.text,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: THEME.colors.textLight,
  },
  deleteBtn: {
    padding: THEME.spacing.sm,
  },
});