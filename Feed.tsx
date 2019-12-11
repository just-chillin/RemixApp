import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { VideoCard } from './VideoCard';

import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});

export default class Feed extends Component {
  numPrecachedVideos = 10;
  videoCards = [];

  componentWillMount() {
    //Asynchronously builds each of the video components and pushes them to the swiper view.
    for (let i = 0; i < this.numPrecachedVideos; i++) {
      new Promise(() => {
        this.videoCards.push(<VideoCard key={i} index={i} />);
      });
    }
  }

  render = () =>
    <Swiper style={styles.wrapper} showsButtons={true}>
      {this.videoCards}
    </Swiper>;
}