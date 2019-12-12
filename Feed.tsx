import React, { Component } from "react";
import { StyleSheet } from "react-native";
import VideoCard from "./VideoCard";

import Swiper from "react-native-swiper";
import { Video } from "expo-av";

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  }
});

export default class Feed extends Component {
  currentIndex = 0;
  numPrecachedVideos = 10;
  videoSources = [
    "https://remixvideo.s3.amazonaws.com/Snapchat-523608777.mp4",
    "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
  ];
  videoCards = [];
  videoCardsRefByKey = [];

  constructor(props) {
    super(props);
    //Asynchronously builds each of the video components and pushes them to the swiper view.
    for (let i = 0; i < this.videoSources.length; i++) {
      this.videoCards.push(
        <VideoCard
          key={i}
          index={i}
          src={this.videoSources[i]}
          getRef={ref => (this.videoCardsRefByKey[i] = ref)}
        />
      );
    }
  }

  getRef = (card: JSX.Element) => this.videoCardsRefByKey[card.key];

  onSwiperIndexChanged = index => {
    const oldVideoRef: VideoCard = this.videoCardsRefByKey[this.currentIndex];
    const newVideoRef: VideoCard = this.videoCardsRefByKey[index];

    oldVideoRef.notifyLeaveView();
    newVideoRef.notifyEnterView();

  };

  componentDidMount() {
    console.log(this.videoCardsRefByKey);
    if (this.currentIndex === 0) this.videoCardsRefByKey[0].notifyEnterView();
  }

  render = () => (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      showsPagination={false}
      onIndexChanged={this.onSwiperIndexChanged}
    >
      {this.videoCards}
    </Swiper>
  );
}
