import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { saveTodos, loadTodos } from '../utils/storage';

export const useTodos = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    // todos : todo listesini tutar.
    // setTodos : todos listesinin güncellenmesini sağlayan fonksiyondur
    // başlangıç değeri [] boş array verilmiştir.
    /* neden array?
    çünkü her todo bir objedir ve brden fazla todo olucak.
    {
    id : 1,
    text: 'React native öğren',
    completed : false
    }
    */
   // input state'i kullanıcının yazdığı input değerini tutar.
   /*
   örneğin: 
   <TextInput 
      value = {inputValue}
      onChangeText = {setInputValue}
   */
      // ilk yükleme
      useEffect(() => {
        loadInitialTodos();
      }, []);

       // initial data yüklendiğine göre (loading false çekildi) bundan sonraki dataları kaydedebilirsin.
      useEffect(() => {
        if(!loading) {
            saveTodos(todos);
        }
        // useEffect, dependency array'daki değerler değişince çalışır
        // yani todos veya loading değişince çalışır
      }, [todos, loading]);

      const loadInitialTodos = async () => {
        // storage'den oku
        // array döner.
        const loadedTodos = await loadTodos();
        // state'e yaz
        // setTodos ile state güncellenir. UI otomatik redraw olur.
        setTodos(loadedTodos);
        // loading kapatılır
        setLoading(false);
      };


    // useEffect nedir?
    // component lifecycle'ına bağlı olarak çalışan bir hook'tur.
    /*
    Yan etkiler için kullanılır:
    - API çağrıları
    - LocalStorage işlemleri
    - Timer'lar
    - Event Listener'lar
    */


    const addTodo = (text) => {
        // Boş input kontrolü
        // trim : baştaki ve sondaki boşlukları temizler
        if(text.trim === ''){
            Alert.alert('Uyarı','Lütfen bir görev girin!');
            // return neden var?
            // fonksiyonu erken sonlandırır.
            // aşağıdaki kodların çalışmasını engeller.
            // validation başarısızsa -> state değişmez.
            return;
        }
        const newTodo = {
            id : Date.now().toString(),
            // kullanıcının yazdığı metin UI'da boşlukları temizlenmiş olarak gözükür.
            text : text.trim(),
            completed : false,
            createdAt : new Date().toISOString()
        };

        // State'in güncellenmesi:
        // prev -> state'in en güncel hali.
        // react state asenkron çalıştığı için direkt todos kullanmak risklidir.
        setTodos(prev => [newTodo, ...prev]);
        // newTodo ilk yazıldığı için en üstte olucak. eğer prev önce yazsaydık newtodo sonda listelenirdi.
    };

    // fonksiyonun amacı: id parametresi alır 
    // o id'ye sahip todo'nun completed değerini terse çevirir.
    const toggleTodo = (id) => {
        setTodos(prev =>
            // map kullanımı: 
            // map, yeni bir array döner ve orijinal array bozulmaz.
            prev.map(todo =>
                // koşullu güncelleme:
                // eğer şuanki döngüde olan todo ise
                todo.id === id
                // ...todo (spread operator) : bir objenin tüm alanlarını kopyalar.
                // karışmasın! ...prev -> array kopyalıyor.
                 ? { ...todo, completed : !todo.completed} 
                 : todo
            )
        );
    };

    const deleteTodo = (id) => {
        Alert.alert(
            'Sil',
            'Bu görevi silmek istediğinize emin misiniz?',
            [
                {text : 'İptal', style : 'cancel'},
                {
                    text : 'Sil',
                    style : 'destructive',
                    onPress : () => setTodos(prev => prev.filter(todo => todo.id !== id))
                }
            ]
        );
    };
    // fonksiyonun amacı : verilen id'ye sahip todo'nun text alanını güncellemek,
    // diğer todo'lara dokunmamak
    const updateTodo = (id, newText) => {
        // neden setTodos kullanıyoruz?
        // çünkü todos bir react state ve doğrudan değiştirilemez.
        // her zaman yeni bir array oluşturmalıyız.
        setTodos(prev =>
            // prev ne demek?
            // prev : en güncel state'dir.
            /* map neden kullanılıyor?
               map, listeyi tek tek dolaşır
               her eleman için yeni bir eleman döndürür.
               sonunda yeni bir liste üretir.  */
            prev.map(todo => 
                // if - else ifadesi: 
                //  güncellenecek todo id'si ile id eşleşirse :
                // text : newText -> sadece text alanı değişir.
                // kotlindeki birebir karşılığı : 
                // todo.copy(text = newText)
                // id eşleşmezse ( : todo ) , bu todo hiç değişmeden döner.
                todo.id === id ? {...todo, text: newText } : todo
            )
        )
    }
    // fonksiyonun amacı : tamamlanmış todoları silmek
    const clearCompleted = () => {
        // prev : su anki todo listesi
        // bizden beklenen şey tamamlanmamış olan todoların listesini döndürmek
        /** filter nedir?
         * şunu yapar :
         * listeyi tek tek gezer
         * şarta uymayanaları atar
         * şarta uyanları listeye ekler.
         * önemli!! filter silmez, yeni bir liste oluşturur.
         */
        // buradaki şart :
        //  todo.completed === true olanlar gitsin.
        //  todo.completed === false olanlar kalsın.
        setTodos(prev => prev.filter(todo => !todo.completed));
    };

    // stats, bir hesaplanan bilgi objesi.
    // total : toplam kaç todo var
    // completed : toplam kaç todo tamamlandı
    // pending : toplam kaç todo tamamlanmadı
    const stats = {
        total : todos.length,
        completed : todos.filter(t => t.completed).length,
        pending : todos.filter(t => !t.completed).length
    };

    return {
        todos,
        loading,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
        clearCompleted,
        stats
    };
};