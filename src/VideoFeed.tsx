import React from "react";
import { StyleSheet, View, NativeSyntheticEvent, SafeAreaView } from "react-native";
import ViewPager, {
  ViewPagerOnPageScrollEventData
} from "@react-native-community/viewpager";
import { RestService, VideoResponse } from "./RestService";
import Video from "./Video";
import UploadButton from "./UploadButton";

interface State {
  refreshing: boolean,
  data: VideoResponse[];
  currentKey: number;
}
interface Props {
  key: string;
  visible: boolean;
  reachedEndThreshold: number;
}

export default class VideoFeed extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      refreshing: true,
      data: [],
      currentKey: 0
    }
  }

  componentDidMount() {
    this.loadData();

  }

  private loadData = async () => {
    this.setState({
      refreshing: true,
      data: [],
    });
    await this.extendData();
    this.setState({
      refreshing: false,
      currentKey: 0
    });
  }

  private extendData = async () => {
    const newData = await RestService.getNewVideos();
    this.setState({
      data: this.state.data.concat(newData)
    })
  }

  private onPageScroll = (
    evt: NativeSyntheticEvent<ViewPagerOnPageScrollEventData>
  ) => {
    console.log(`currentKey: `, evt.nativeEvent.position)
    this.setState({
      currentKey: evt.nativeEvent.position
    });
  };

  private renderVideo = (data: VideoResponse, index: number) => {
    return (
      <View key={data.key}>
        <Video
          s3key={data.key}
          inView={this.state.currentKey === index}
        />
      </View>
    );
  };

  render() {
    return (
      <ViewPager onPageScroll={this.onPageScroll} style={{flex:1}} initialPage={0}>
      {this.state.data.map(this.renderVideo)}
      </ViewPager>
    );
  }
}
