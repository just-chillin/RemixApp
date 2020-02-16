import React from "react";
import ViewPager, {
  ViewPagerOnPageSelectedEventData
} from "@react-native-community/viewpager";
import { Constants } from "expo";
import { Video } from "expo-av";
import { RestService, VideoEndpoint } from "./RestService";
import { ActivityIndicator, StyleSheet, View, Dimensions, Text} from "react-native";

interface State {
  videos: JSX.Element[];
}

const dimensions = Dimensions.get("screen");

class Feed extends React.Component<{}, State> {
  refsByKey = new Map<React.Key, Video>();
  currentKey?: React.Key = undefined;

  constructor(props) {
    super(props);
    this.state = {
      videos: []
    };
    RestService.getNewVideos()
      .then(videos => {
        this.setState(prevState => {
          const videoElements = videos
            .map(v => v.key)
            .map((key, index) => this.createVideoElement(key, index));
          return {
            videos: prevState.videos.concat(videoElements)
          };
        });
      })
      .catch(console.error);
  }

  createVideoElement = (key: string, index: number) => {
    const source = new URL(key, VideoEndpoint).href;
    return (
      <View key={key}>
        <Video
          source={{ uri: source }}
          key={key}
          ref={ref => this._handleVideoRef(ref, key, index)}
          style={styles.video}
          useNativeControls
          resizeMode="cover"
        />
      </View>
    );
  };

  _handleVideoRef = (video: Video, key: React.Key, index: number) => {
    this.refsByKey.set(key, video);
    if (index == 0) {
      video.playAsync();
    }
  };

  // onViewPagerInit = () => {
  //   if (this.currentKey || this.state.videos.length == 0) return;
  //   console.debug('first video render');
  //   const key = this.state.videos[0].key;
  //   const videoRef = this.refsByKey.get(key);
  //   videoRef.playAsync();
  // }

  onPageSelected = (e: ViewPagerOnPageSelectedEventData) => {
    const currentKey = this.state.videos[e.position].key;
    this.currentKey = currentKey;
    console.log(`page with key ${currentKey} selected`);
    const ref = this.refsByKey.get(currentKey);
    ref.playAsync();
  };

  render() {
    let thingToRender: JSX.Element | JSX.Element[];
    if (this.state.videos.length == 0) {
      thingToRender = <ActivityIndicator />;
    } else {
      thingToRender =
        // <ViewPager
        //   //onPageScroll={e => console.debug(JSON.stringify(e))}
        //   onPageSelected={e => e.currentTarget}
        //   initialPage={0}
        // >
        //   {this.state.videos}
        // </ViewPager>
        this.state.videos[0];
    }
    return <View style={styles.container}>{thingToRender}</View>;
  }
}

// CSS-Like styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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
  },
  video: {
      flex: 1,
      height: dimensions.height,
      width: dimensions.width
  }
});

export default Feed;
