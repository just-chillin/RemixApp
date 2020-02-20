import React, { ReactElement, ReactInstance } from "react";
import ViewPager, {
  ViewPagerOnPageSelectedEventData
} from "@react-native-community/viewpager";
import { Video } from "expo-av";
import { RestService, VideoEndpoint } from "./RestService";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  NativeSyntheticEvent,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from "react-native";
import UploadButton from "./UploadButton";
import { Transform } from "stream";

interface State {
  videos: JSX.Element[];
}
interface Props {}




/**
 * This component handles downloading and rendering videos retreived from the remix api.
 */
export default class Feed extends React.Component<Props, State> {
  refsByKey = new Map<React.Key, Video>();
  previousKey?: React.Key;
  refreshing: any;
  setRefreshing: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      videos: []
    };
    [this.refreshing, this.setRefreshing] = React.useState(false);
    RestService.getNewVideos()
      .then(videos => {
        this.setState(prevState => {
          const videoElements = videos.map((v, index) =>
            this.createVideoElement(v.key, index)
          );

          return {
            videos: prevState.videos.concat(videoElements)
          };
        });
        this.forceUpdate();
      })
      .catch(console.error);
  }

  refresh = React.useCallback(() => {
    this.setRefreshing(true);
    this.refsByKey = new Map<React.Key, Video>();
    if (this.previousKey) {
      const ref = this.refsByKey.get(this.previousKey);
      if (ref) ref.unloadAsync();
    }
    this.previousKey = undefined;
    this.setState({ videos: [] });
    this.setRefreshing(false);
  }, [this.refreshing]);

  createVideoElement = (key: string, index: number) => {
    const source = new URL(key, VideoEndpoint).href;
    console.log("creating", source);
    return (<Video
            source={{ uri: `https://video.remixapp.net/${response.item.key}` }}
            onLoad={() =>
              console.log(
                `Rendered ${response.item.key} in ${Date.now() - loadStartTime}ms`
              )
            }
            onError={this._onVideoError}
            useNativeControls={false}
            posterSource={SPINNER}
            resizeMode={Video.RESIZE_MODE_COVER}
            style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.9 }}
            posterStyle={{
              position: "relative",
              justifyContent: "center",
              resizeMode: "center",
              height: "100%",
              width: "100%"
            }}
            ref={ref => this.refsByKey.set(response.item.key, ref)}
          />);
  };

  _handleVideoRef = (video: Video | null, key: React.Key, index: number) => {
    if (!video) {
      return;
    }
    this.refsByKey.set(key, video);
    if (index == 0) {
      video.playAsync();
    }
  };

  onPageSelected = (
    e: NativeSyntheticEvent<ViewPagerOnPageSelectedEventData>
  ) => {
    // Get the index of the video that you switched to.
    const keyRetreivedFromEvent = this.state.videos[e.nativeEvent.position].key;
    if (!keyRetreivedFromEvent) {
      console.warn("Feed.onPageSelected: keyRetreivedFromEvent is null!");
      return;
    }

    const selectedVideoRef = this.refsByKey.get(keyRetreivedFromEvent);
    if (!selectedVideoRef) {
      console.warn("Feed.onPageSelected: selectedVideoRef is null!");
      return;
    }
    selectedVideoRef.replayAsync();

    // Retreive and stop the previous video, if it exists.
    if (this.previousKey) {
      const previousVideoRef = this.refsByKey.get(this.previousKey);
      if (previousVideoRef) {
        previousVideoRef.stopAsync();
      }
    }

    this.previousKey = keyRetreivedFromEvent;
  };

  render() {
    const refreshControl = (
      <RefreshControl
        refreshing={this.refreshing}
        onRefresh={this.refresh}
        style={styles.container}
      />
    );

    return (
      <View>
        <ScrollView style={styles.container} refreshControl={refreshControl}>
          {this.state.videos}
          <SafeAreaView>
            <UploadButton />
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}


const styles = {
  container: {
    flex: 1
  }
}
// <ViewPager onPageSelected={this.onPageSelected} initialPage={0}>
// {this.state.videos}
// </ViewPager>
