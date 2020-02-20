import React from "react";
import { Video } from "expo-av";
import { Dimensions } from "react-native";
import { View } from "react-native";
import { PlaybackStatusToSet } from "expo-av/build/AV";

interface State {
  ref: Video | null;
}
interface Props {
  s3key: string;
  inView: boolean;
}

const spinner = require("../assets/spinner.gif");

export default class RemixVideo extends React.Component<
  Readonly<Props>,
  Readonly<State>
> {
  source: URL;

  constructor(props: Readonly<Props>) {
    super(props);
    this.source = new URL(this.props.s3key, "https://video.remixapp.net/");
    this.state = {
      ref: null
    };
  }

  private handleRef = ref => this.setState({ ref: ref });

  private onError = err => console.debug("RemixVideoComponent Error:", err);



  render() {
    const { height, width } = Dimensions.get("window");
    const playbackStatusToSet: PlaybackStatusToSet = {
      isMuted: !this.props.inView,
      shouldPlay: this.props.inView
    };
    if (!this.props.inView) {
      playbackStatusToSet.positionMillis = 0;
    }
    return (
        <Video
          source={{ uri: this.source.href}}
          style={{ height: height, width: width }}
          onError={this.onError}
          resizeMode="cover"
          posterSource={spinner}
          isLooping
          ref={this.handleRef}
          onLoadStart={()=>console.log('loading')}
          onLoad={status=>console.debug('loaded:',status, 'inView', this.props.inView)}
          usePoster
          status={playbackStatusToSet}
          posterStyle={{ width: '100%', height: '100%', resizeMode: "center" }}
        />
    );
  }
}
