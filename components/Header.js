import React from 'react'
import { StyleSheet, Text, Platform} from 'react-native'


const Header = () => (
  <Text style={styles.encabezado}>Criptomonedas</Text>
);



const styles = StyleSheet.create({
  encabezado: {
    paddingTop: Platform.OS === 'ios' ? 50 : 50,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#5E49E2',
    paddingBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#FFF',
    marginBottom: 30
  }
});

export default Header;