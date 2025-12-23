import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App(){
  const[sayac, setSayac] = useState(0);
  // butona basınca değişecek fonksiyon
  const arttir = () => {
    setSayac(sayac + 1); // sayacı arttır ve ekrana yenilen emri ver
  };
  return( 
  <View style={styles.container}>
    <Text style = {styles.baslik}>Sayaç Uygulaması</Text>
    <View style={styles.sayacKutusu}>
      <Text style= {styles.sayi}>{sayac}</Text>
    </View>
    <TouchableOpacity
    style = {styles.button}
    onPress={arttir} // butona basınca arttır fonksiyonu çalışır
    onLongPress={() => setSayac(0)} // uzun basınca sayaç sıfırlanır.
    > 
      <Text style={styles.buttonText}>Arttır</Text>
    </TouchableOpacity>

    <Text style={styles.footer}>Sayacı sıfırlamak için butona uzun bas!</Text>
  </View>
 );
}

// TASARIM 
const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : '#f0f2f5',
    alignItems : 'center',
    justifyContent : 'center'
  },
  baslik : {
    fontSize : 24,
    fontWeight : 'bold',
    marginBottom : 20,
    color : '#333'
  },
  sayacKutusu : {
    backgroundColor : '#fff',
    padding : 40,  // içerdeki sayı ile kutu arasındaki boşluk
    borderRadius : 20,
    elevation : 5, // android gölge
    shadowColor : '#000', // IOS gölge rengi
    shadowOffset : {width : 0, height : 2}, // gölgenin kayacağı yön (aşağı doğru 2 birim)
    shadowOpacity : 0.2, // gölgenin koyuluğu
    marginBottom : 30 // altındaki buton ile arasında mesafe koyar
  },
  sayi : {
    fontSize : 60,
    fontWeight : 'bold',
    color : '#007AFF'
  },
  button : {
    backgroundColor : '#007AFF',
    paddingVertical : 15,
    paddingHorizontal : 40,
    borderRadius : 30
  },
  buttonText : {
    color : '#fff',
    fontSize : 18,
    fontWeight : '600' 
  },
  footer : {
    marginTop : 20,
    fontSize : 12,
    color : '#888'
  }
});
