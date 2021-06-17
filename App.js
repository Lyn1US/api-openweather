import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { PanResponder, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Style from './style.js';

export default function App() {

  const [city_name,setCity]       =   useState("");
  const [city_temp,setTemp]       =   useState(0.0);
  const [city_wind,setWind]       =   useState(0.0);
  const [objectJson,setJson]      =   useState([]);

  const [text,setText]            =   useState('');

  /*
  const [celsius_temp,setCelsiusTemp] = useState(0.0);
  const [km_speed,setKmSpeed] = useState(0.0);
  */

  const kelvin = 273; 

  var link = 'https://api.openweathermap.org/data/2.5/weather?id=';
  var id = '';
  var apikey = '&appid=e96f5585e48b620c661f90b97652062f'


  const loadInputId = () => {

    id = text;
    
    fetch(link + id + apikey)
    .then(response => response.json())
    .then(function(json){

      //alert(json.id)

      setCity(json.name);
      setTemp(json.main.temp); 
      setWind(json.wind.speed);
      setJson(JSON.stringify(json))

    })
    
      /* 
      Está carregando os valores das variáveis com os da API
        antes de usarmos o método loadInfo(), pois precisamos
        ter os valores iniciais antes de converte-los.
      */

  }

  return (
    <View style={Style.container}>

      <Text style={{color: '#18576B', marginTop: '10%' ,textAlign: 'center', textTransform: 'uppercase', fontSize: 24, marginBottom: '4%'}}>Api REQUEST</Text>

      
        <TextInput keyboardType={'numeric'} placeholderTextColor={"white"} placeholder={"Digite um ID aqui"} style={Style.textInputUser} onChangeText={(text)=>setText(text)}></TextInput>
      

      <TouchableOpacity style={Style.buttonSearch} onPress={()=> loadInputId()}>
        <Text style={{color: 'white'}}>Clique aqui para carregar informações do ID solicitado</Text>
      </TouchableOpacity>

      <View style={Style.infoView}>
        <Text style={Style.infoText}>{"Nome: " + city_name }</Text>
        <Text style={Style.infoText}>{"Temperatura atual: " + (city_temp - kelvin).toFixed(2) + '°C'}</Text>
        <Text style={Style.infoText}>{"Velocidade do vento: " +  (city_wind * 3.609).toFixed(2) + ' Km/h'}</Text>
        <Text style={Style.infoText}>{"ARQUIVO JSON INTEIRO: " + objectJson}</Text>

        <Text style={Style.infoText}>OBS: Coloque apenas ID's existentes</Text>
      </View>

    </View>
  );
}
