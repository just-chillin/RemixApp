import React from "react";
import { Video as VideoBase }from "expo-av";

interface State{}
interface Props {
  key: string;
  visible: boolean;
}

class Video extends React.Component<Props, State> {
  ref: VideoBase;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <VideoBase
        ref={ref => this.ref = ref}
        source={{uri: `https://video.remixapp.net/${this.props.key}`}}
      />
    );
  }
}