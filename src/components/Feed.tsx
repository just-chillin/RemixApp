import React, { Component } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import VideoCard from "./VideoCard";
import Swiper from "react-native-swiper";
import api from "../RESTService";

// CSS-Like styles
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

/**
 * Holds the list of videos and handles rendering them.
 */
export default class Feed extends Component {
  currentIndex = 0;
  numPrecachedVideos = 10;

  // A list of links to render video cards for
  videoSources = [];

  // Holds the list of video cards to be rendered in render()
  videoCards = [];

  // Holds the list of video card refs. The indicies should match up with the video card elements in videoCards.
  videoCardsRefByKey = [];

  constructor(props) {
    super(props);
    //Asynchronously builds each of the video components and pushes them to the swiper view.
    api.getNewVideos().then(async videos => {
      const json = await videos.json();
      json.forEach(video => {
        this.videoSources.push(new URL(video.key, 'https://video.remixapp.net').toString());
      })
    });
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

  /**
   * Gets the card's ref object so that it's methods can be called.
   */
  getRef = (card: JSX.Element) => this.videoCardsRefByKey[card.key];

  /**
   * Called when the user swipes to a new card.
   * @param index The index of the card the user changed to
   */
  onSwiperIndexChanged = index => {
    this.videoCardsRefByKey[this.currentIndex].notifyLeaveView();
    this.videoCardsRefByKey[index].notifyEnterView();
    this.currentIndex = index;
  };

  /**
   * Called when the component mounts. Notifys the card at index 0 to play the video.
   */
  componentDidMount() {
    if (this.currentIndex === 0) this.videoCardsRefByKey[0].notifyEnterView();
  }

  render() {
    if (this.videoCards.length == 0) {
      return <ActivityIndicator size="large" style={styles.wrapper} />
    }
    return (
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        showsPagination={false}
        onIndexChanged={this.onSwiperIndexChanged}
        loop={false}
        bounces
        removeClippedSubviews
      >
        {this.videoCards}
      </Swiper>
    );
  }

  );
}
