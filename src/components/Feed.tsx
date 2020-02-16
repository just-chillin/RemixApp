import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import VideoCard from "./VideoCard";

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

class VideoStateContainer {
  ref: VideoCard;
  renderable;

  constructor(s3_key: string, index: number) {
    this.renderable = (
      <VideoCard
        key={index}
        index={index}
        src={new URL(s3_key, "https://video.remixapp.net/").toString()}
        getRef={(ref: VideoCard) => (this.ref = ref)}
      />
    );
  }
}

type State = {
  videos: VideoStateContainer[];
};

/**
 * Holds the list of videos and handles rendering them.
 */
export default class Feed extends React.Component<{}, State> {
  constructor(props) {
    super(props);
  }
}
