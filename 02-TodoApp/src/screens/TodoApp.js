
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator,
  SafeAreaView
} from 'react-native';

import { THEME } from '../constants/theme';
import { useTodos } from '../hooks/useTodos';

import { TodoInput } from '../components/TodoInput';
import { TodoItem } from '../components/TodoItem'; // <-- EKSİKTİ, EKLEDİK
import { StatsCard } from '../components/StatsCard';

// MAIN SCREEN - Todo Screen
const TodoApp = () => {
  const {
    todos,
    loading,
    addTodo,
    toggleTodo,
    deleteTodo,
    stats
  } = useTodos();


  if(loading){
    return (
        <View style = {styles.loadingContainer}>
            <ActivityIndicator size='large' color={THEME.colors.primary}/>
        </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Yapılacaklar</Text>
        <Text style={styles.subtitle}>
          Görevlerinizi organize edin
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <StatsCard 
          label="Toplam" 
          value={stats.total} 
          color={THEME.colors.primary} 
        />
        <StatsCard 
          label="Bekleyen" 
          value={stats.pending} 
          color={THEME.colors.danger} 
        />
        <StatsCard 
          label="Tamamlanan" 
          value={stats.completed} 
          color={THEME.colors.success} 
        />
      </View>

      {/* Input */}
      <TodoInput onAdd={addTodo}/>

      {/* Todo List */}
      {todos.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            Henüz görev yok. Yeni bir görev ekleyerek başlayın! 🎯
          </Text>
        </View>
      ) : (
        <FlatList
          // FlatList, data içindeki todos dizisini alır ve bir döngü başlatır.
          data={todos}
          // dizideki her bir objeyi (item) tek tek yakalar.
          // keyExtractor : her bir liste elemanını birbirinden ayırt etmek için benzersiz bir id ister.
          keyExtractor={item => item.id}

          // renderItem, bu item'ı alır ve todoItem bileşenine todo ismiyle paketleyip gönderir.
          // sadece veriyi değil, fonksiyonları da gönderir ki, listedeki silme butonuna basınca ana listeden o eleman silinebilsin.
          renderItem={({ item }) => (
            <TodoItem
              todo={item}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : THEME.colors.background
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
  },
    header : {
        paddingTop : THEME.spacing.xl,
        paddingHorizontal : THEME.spacing.lg,
        paddingBottom : THEME.spacing.md
    },
    title : {
        fontSize : 32,
        fontWeight : 'bold',
        color : THEME.colors.text,
        marginBottom : THEME.spacing.xs
    },
    subtitle : {
        fontSize : 16,
        color : THEME.colors.textLight,
    },
    statsContainer : {
        flexDirection : 'row',
        paddingHorizontal : THEME.spacing.lg,
        marginBottom : THEME.spacing.lg,
        gap : THEME.spacing.sm
    },
  listContent: {
    paddingHorizontal: THEME.spacing.lg,
    paddingBottom: THEME.spacing.xl,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.xl,
  },
  emptyText: {
    fontSize: 16,
    color: THEME.colors.tßextLight,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default TodoApp;
