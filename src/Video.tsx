import React from "react";
import { Video }from "expo-av";
import { Dimensions } from "react-native";
import {Text} from "react-native";

interface State{}
interface Props {
  s3key: string;
  inView: boolean;
}

const spinner = require("../assets/spinner.gif");

export default class RemixVideo extends React.Component<Readonly<Props>, Readonly<State>> {
  ref: Video;
  source: URL;

  constructor(props: Readonly<Props>) {
    super(props);
    this.source = new URL(this.props.s3key, 'https://video.remixapp.net/');
  }

  private handleRef = ref => this.ref = ref;


  private onError = err => console.debug('RemixVideoComponent Error:', err)
  private onReadyForDisplay = evt => {
    if (this.props.inView) {
      this.ref.replayAsync().catch(()=>null);

    } 
    console.debug('RemixVideoComponent Ready for Display:', evt)
  }


  render() {
    if (this.props.inView) console.log('rendering', `https://video.remixapp.net/${this.props.s3key}`)
    if (this.props.inView && this.ref) {
      this.ref.setIsMutedAsync(false);
      this.ref.playAsync().catch(console.error);
    } else if(this.ref) {
      this.ref.stopAsync();
      this.ref.setPositionAsync(0);
      this.ref.setIsMutedAsync(true);
    }
    const {width, height} = Dimensions.get("window");
    return (
      <Video
        source={{uri: this.source.href}}
        shouldPlay={this.props.inView}
        style={{height: height, width: width}}
        onError={this.onError}
        onReadyForDisplay={this.onReadyForDisplay}
        resizeMode="cover"
        posterSource={spinner}
        usePoster
        isLooping
        ref={this.handleRef}
        renderToHardwareTextureAndroid
        posterStyle={{resizeMode: 'center', width: '100%', height: '100%'}}
        needsOffscreenAlphaCompositing
      />
    );
  }
}