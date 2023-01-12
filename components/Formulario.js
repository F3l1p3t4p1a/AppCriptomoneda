import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';







export default function Formulario({moneda, criptomoneda, setMoneda, setCriptomoneda, setConsultarApi}) {


const [criptomonedas, setcriptomonedas] = useState([]);

useEffect(() => {

const consultarApi = async () => {

const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
const resultado = await axios.get(url);
setcriptomonedas(resultado.data.Data);
}

consultarApi();


}, []);


// Almacena la selecion del usuario con respecto a la moneda de un pais
const obtenerMoneda = moneda => {
  setMoneda(moneda);
}


const obtenerCriptoMoneda = cripto => {
  setCriptomoneda(cripto);
}

const cotizarPrecio = () => {
  if(moneda.trim() === '' || criptomoneda.trim() === ''){
    mostrarAlerta();
    return;
  }

  // pasa la validacion 

  setConsultarApi(true);
  
}

const mostrarAlerta = () => {

  Alert.alert(
    'error !!!',
    'Ambos campos son obligatorios',

    [
      {text: 'OK'}
    ]
  )
}

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>

        <Picker
        selectedValue={criptomoneda}
          onValueChange={ cripto => obtenerCriptoMoneda(cripto)}
        >
        <Picker.Item label='- Seleccione -' value='' />
          <Picker.Item label='Dolar de Estados Unidos' value='USD' />
          <Picker.Item label='Peso Chileno' value='CLP' />
          <Picker.Item label='Euro' value='EUR' />
          <Picker.Item label='Libra Esterlina' value='GBP' />
        </Picker>
      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        selectedValue={moneda}
          onValueChange={ moneda => obtenerMoneda(moneda)}
        >
        <Picker.Item label='- Seleccione -' value='USD' />
         {criptomonedas.map( cripto => (
          <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
         ) )}
        </Picker>

        <TouchableHighlight style={styles.btnCotizar} onPress={ () => cotizarPrecio()}>
          <Text style={styles.textCotizar}>Cotizar</Text>
        </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  label:{
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginVertical: 20,
  },
  btnCotizar:{
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20,
    borderRadius: 50
  },
  textCotizar: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
})