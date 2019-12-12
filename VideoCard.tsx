import React, { Component } from "react";
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

const dimensions = Dimensions.get("window");

export default class VideoCard extends Component<Props, State> {
  videoRef: Video;

  constructor(props: Props) {
    super(props);
    this.state = {
      paused: true
    };
    this.props.getRef(this);
  }

  onMagicTap = () => {
    console.log("tapped!");
  };

  notifyLeaveView = () => this.videoRef.stopAsync();
  notifyEnterView = () => this.videoRef.playAsync();

  render() {
    return (
      <View onMagicTap={this.onMagicTap}>
        <Video
          ref={r => (this.videoRef = r)}
          source={{ uri: this.props.src }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={false}
          isLooping
          style={{ width: dimensions.width, height: dimensions.height }}
        />
      </View>
    );
  }
}
