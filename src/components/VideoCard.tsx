import React from "react";
import { View, Dimensions } from "react-native";
import { Video } from "expo-av";


interface Props {
  key: number;
  index: number;
  src: string;
  getRef: Function;
}

interface State {
  paused: boolean;
}

// The device's dimensions. Used to get the width of which to display the video card.
const dimensions = Dimensions.get("screen");

export default class VideoCard extends React.Component<Props, State> {
  videoRef: Video;

  constructor(props: Props) {
    super(props);
    this.state = {
      paused: true
    };
    this.props.getRef(this);
  }

  /**
   * Toggles playing and pausing the video when tapped.
   */
  onTap = () =>
    this.setState({ paused: !this.state.paused }, () => {
      console.log(`tapped! now paused = ${this.state.paused}`);
      this.state.paused
        ? this.videoRef.playAsync()
        : this.videoRef.pauseAsync();
    });

  /**
   * Stops the video when a user navigates to a different card.
   */
  notifyLeaveView = () => false;
    //this.videoRef.stopAsync().then(() => this.setState({ paused: true }));
  
  /**
   * Plays the video when the user navigates to the card.
   */
  notifyEnterView = () => false;
    //this.videoRef.playAsync().then(() => this.setState({ paused: false }));

  render() {
    return (
      <View>
        <Video
          ref={r => (this.videoRef = r)}
          source={{ uri: this.props.src }}
          isMuted={false}
          resizeMode="cover"
          isLooping
          useNativeControls
          style={{ height: dimensions.height, width: dimensions.width }}
        />
      </View>
    );
  }
}
