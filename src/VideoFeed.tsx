import React from "react";
import {
  View,
  NativeSyntheticEvent,
  SafeAreaView,
  ActivityIndicator,
  Button
} from "react-native";
import ViewPager, {
  ViewPagerOnPageScrollEventData
} from "@react-native-community/viewpager";
import { RestService, VideoResponse } from "./RestService";
import RemixVideo from "./Video";
import UploadButton from "./UploadButton";

interface State {
  refreshing: boolean;
  data: VideoResponse[];
  currentKey: number;
}
interface Props {}

export default class VideoFeed extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      refreshing: true,
      data: [],
      currentKey: 0
    };
  }

  componentDidMount() {
    this.loadData();
  }

  private loadData = async () => {
    this.setState({
      refreshing: true,
      data: []
    });
    await this.extendData();
    this.setState({
      refreshing: false,
      currentKey: 0
    });
  };

  private extendData = async () => {
    const newData = await RestService.getNewVideos();
    this.setState({
      data: this.state.data.concat(newData)
    });
  };

  private onPageScroll = (
    evt: NativeSyntheticEvent<ViewPagerOnPageScrollEventData>
  ) => {
    this.setState({
      currentKey: evt.nativeEvent.position
    });
  };

  private renderVideo = (data: VideoResponse, index: number) => {
    if (this.state.currentKey === index) {
      console.log(`inView: ${index}`);
    }
    return (
      <View key={data.key}>
        <RemixVideo s3key={data.key} inView={this.state.currentKey === index} />
      </View>
    );
  };

  render() {
    if (this.state.refreshing) {
      return <ActivityIndicator />;
    }
    return (
      <View style={{ flex: 1 }}>
        <ViewPager
          style={{ flex: 1 }}
          onPageScroll={this.onPageScroll}
          initialPage={0}
        >
          {this.state.data.map(this.renderVideo)}
        </ViewPager>
        <SafeAreaView style={{ flexDirection: "row" }}>
          <View style={{ width: "50%" }}>
            <UploadButton />
          </View>
          <View style={{ width: "50%" }}>
            <Button title="Reload" onPress={this.loadData} />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
