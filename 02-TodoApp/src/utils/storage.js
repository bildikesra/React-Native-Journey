import AsyncStorage from '@react-native-async-storage/async-storage';
/*
 Bu dosya todo listesini telefonun hafızasına kaydeder ve
 uygulama tekrar açıldığında geri yükler
 Android'deki 'sharedPreferences'.
*/
// !! asyncStorage, sadece strign saklar.
// StorageKey : Telefon hafızasında veriyi saklarken kullanılan anahtar key
// Aynı key ile :
// setItem -> kaydederiz
// getItem -> okuruz
const STORAGE_KEY = '@todos';

export const saveTodos = async (todos) => {
    // 
    try {
        // setItem, telefonun kalıcı hafızasına yazar.
        // await işlemi, yazma bitmeden devam etmesini önler.
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        // kaydetme başarılı ise return true
        return true;
    } catch (error) {
        console.error('Sve error:', error);
        return false;
    }
};

export const loadTodos = async () => {
    try {
        // getItem, daha önce kaydedilmiş todo'ları okur.
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        // eğer kayıt varsa json string
        // eğer kayıt yoksa boş array döner
        return data ? JSON.parse(data) : [];
        // json parse neden var?
        // çünkü diskten dönen veri string,
        // bizim istediğimiz js array / object
    } catch (error) {
        console.error('Load error : ', error);
        return [];
    }
};

export const clearTodos = async () => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (error) {
        console.error('Clear error : ', error);
        return false;
    }
};