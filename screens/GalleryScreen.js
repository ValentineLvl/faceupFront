import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Card } from 'react-native-elements';

import {connect} from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';

function GalleryScreen(props) {

var listGallery = [{img:require('../assets/picture-1.jpg') , genre:'Homme', age: '70 ans', mood: 'Joyeux !', hair:'Cheveux gris'},
{img:require('../assets/picture-2.jpg') , genre:'Femme', age: '34 ans', mood: 'Joyeux !', hair:'Cheveux chatain'},
{img:require('../assets/picture-3.jpg') , genre:'Homme', age: '28 ans', mood: 'Choqué', hair:'Cheveux noir'},
{img:require('../assets/picture-4.jpg') , genre:'Femme', age: '72 ans', mood: 'Joyeux !', hair:'Cheveux gris'}];

    var card = listGallery.map((el, i) => {
        return <Card key={i} style={styles.card}>
        <Card.Image source={el.img}/>
        <Card.Divider/>
        <Button
            buttonStyle={styles.button}
            title={el.genre} />
        <Button
            buttonStyle={styles.button}
            title={el.age} />
        <Button
            buttonStyle={styles.button}
            title='Barbe' />
        <Button
            buttonStyle={styles.button}
            title={el.mood} />
        <Button
            buttonStyle={styles.button}
            title={el.hair} />
    </Card>
        
      });

      var cardImage = props.photoList.map((e, i) => {
        return (<Card key={i} style={styles.card}>
            <Card.Image source={{uri: e.url}} 
            //style={{transform:  [{ rotate:'90deg' }]}}
            />
            <Card.Divider/>
            {e.desc.map((el, i) => (
            <View key={i}>
            <Button 
                buttonStyle={styles.button}
                title={el.gender} />
            <Button
                buttonStyle={styles.button}
                title={el.age} />
                </View>
            ))}
        </Card>);
      })

    return (
        <View style={styles.container}>
            <Text style={styles.text}> {props.pseudo}'s Gallery</Text>
            <ScrollView style={{flex : 1, marginTop: 20}}>
                {cardImage}
                {card}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'flex-start',
        marginTop: 40,
    },
    text : {
       fontWeight : 'bold',
        fontSize : 25,
        textAlign: 'center',
    },
    card: {
        padding : 0,
    },
    button: {
        borderRadius: 50, 
        marginBottom: 3,
        paddingTop : 1,
        paddingBottom : 2,
        paddingLeft : 10,
        paddingRight : 10,
        alignSelf: 'center',
        backgroundColor : "#009788",
    },
  });

  function mapStateToProps(state) {
    return { photoList: state.photoList, pseudo: state.pseudo}
    }

  export default connect(
    mapStateToProps, 
      null
  )(GalleryScreen);