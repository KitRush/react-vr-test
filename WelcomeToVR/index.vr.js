import React, { Component } from 'react';
import {
  AppRegistry,
  asset,
  Animated,
  VrButton,
  Pano,
  Text,
  View,
  Model,
  StyleSheet,
  NativeModules
} from 'react-vr';

const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontSize: 0.4
  },
  red: {
    color: 'red'
  }
});

const CubeModule = NativeModules.CubeModule;

class OOLALA extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bounceValue: new Animated.Value(0),
      textColor: 'white'
    };
  };

  render(){
    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>
        <Animated.Image
          source={{uri: 'https://i.imgur.com/XMKOH81.jpg'}}
          style={{
            flex: 1,
            width: 1,
            height: 1,
            transform: [  
              {translate: [-1,1,-5]},                      // `transform` is an ordered array
              {scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
            ]
          }}
        />
        <View style={{
          flex: 1,
          flexDirection: 'column',
          width: 2,
          alignItems: 'stretch',
          transform: [{translate: [-1,1,-5]}],
        }}>
        
          <VrButton style={{ margin: 0.1, height: 0.3, backgroundColor: 'red'}}
            onEnter={()=>{
              this.setState({textColor:'red'});
              }}
            onExit={()=>{
              this.setState({textColor:'white'});
              }}
            onClick={() =>{
              this.bounce();
              CubeModule.changeCubeColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
              }}>
            <Text 
            style={{color: this.state.textColor, fontSize: 0.2, textAlign: 'center'}}>
              Red
            </Text>
          </VrButton>
          <View style={{ margin: 0.1, height: 0.3, backgroundColor: 'orange'}}>
            <Text style={{fontSize: 0.2, textAlign: 'center'}}>Orange</Text>
          </View>
          <View style={{ margin: 0.1, height: 0.3, backgroundColor: 'yellow'}}>
            <Text style={{fontSize: 0.2, textAlign: 'center'}}>Yellow</Text>
          </View>
          <View style={{ margin: 0.1, height: 0.3, backgroundColor: 'green'}}>
            <Text style={[styles.bigblue, {color:'green'}]}>Green</Text>
          </View>
          <View style={{ margin: 0.1, height: 0.3, backgroundColor: 'blue'}}>
            <Text style={styles.bigblue}>Blue</Text>
          </View>
        </View>
      </View> 
    );
  };

  componentDidMount() {
    this.bounce();
  };

  bounce() {
    this.state.bounceValue.setValue(1.5); // start large
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: 0.8,
        friction: 1
      }
    ).start();
  }
}

AppRegistry.registerComponent("app", () => OOLALA);