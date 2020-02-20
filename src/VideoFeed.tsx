// import React from "react";
// import OptimizedInfiniteLinkedList from "./OptimizedInfiniteLinkedList";
// import { VideoResponse, RestService } from "./RestService";
// import {
//   FlatList,
//   StyleSheet,
//   Dimensions,
//   View,
//   ListRenderItemInfo,
//   ActivityIndicator,
//   ViewabilityConfig,
//   RefreshControl,
//   Platform,
//   SafeAreaView,
//   LayoutChangeEvent,
//   FlatListProps,
//   ViewToken
// } from "react-native";
// import { Video } from "expo-av";
// import UploadButton from "./UploadButton";
// import Constants from "expo-constants";

// interface State {
//   data: VideoResponse[];
//   refreshing: boolean;
//   video_height: number;
// }
// interface Props {}

// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
// const SPINNER = require("../assets/spinner.gif");

// type VideoStateHolder = {
  
// }

// export default class VideoFeed extends React.Component<Props, State> {
//   refsByKey = new Map<string, Video | null>();

//   viewabilityConfig: ViewabilityConfig = {};
//   constructor(props: Props) {
//     super(props);
//     this.state = {
//       data: [],
//       refreshing: true,
//       video_height: SCREEN_HEIGHT
//     };
//     this.viewabilityConfig = {
//       itemVisiblePercentThreshold: 95
//     };
//     this.populateMetadata().then(() => this.setState({ refreshing: false }));
//   }

//   _onRefresh = () => {
//     this.setState({ refreshing: true, data: [] });
//     this.populateMetadata().then(() => {
//       this.setState({ refreshing: false });
//     });
//   };

//   populateMetadata = async () => {
//     const newData = await RestService.getNewVideos();
//     let uniqueVideos = new Map<string, VideoResponse>();
//     newData.forEach(vid => {
//       uniqueVideos.set(vid.key, vid);
//     });
//     let finalResult: VideoResponse[] = [];
//     uniqueVideos.forEach(value => finalResult.push(value));

//     this.setState({
//       data: finalResult
//     });
//   };

//   _onVideoError = (err: any) => console.debug(err);

//   _setVideoRef = (ref: Video, response: ListRenderItemInfo<VideoResponse>) =>
//     this.refsByKey.set(response.item.key, ref);

//   _preRenderStep = (response: ListRenderItemInfo<VideoResponse>) => {
//     const ref = this.refsByKey.get(response.item.key);
//     if (ref)
//       ref.getStatusAsync().then(status =>{
//         if (status.1)
//       });
//     }
//   }

//   _renderVideo = (response: ListRenderItemInfo<VideoResponse>) => {
//     console.log(`Rendering: ${response.item.key}`);
//     const loadStartTime = Date.now();
//     const ref = this.refsByKey.get(response.item.key);
//     if (ref && (ref.getStatusAsync()).isLoaded) {
//       return;
//     }
//     return (
//       
//     );
//   };

//   _renderFlatlist = () => {
//     return (
//       <FlatList
//         data={this.state.data}
//         renderItem={this._preRenderStep}
//         keyExtractor={item => item.key}
//         onEndReached={this.populateMetadata}
//         onEndReachedThreshold={0.9}
//         pagingEnabled
//         onViewableItemsChanged={this.onViewableItemsChanged}
//         showsHorizontalScrollIndicator={false}
//         showsVerticalScrollIndicator={false}
//         viewabilityConfig={this.viewabilityConfig}
//         refreshControl={
//           <RefreshControl
//             refreshing={this.state.refreshing}
//             onRefresh={this._onRefresh}
//           />
//         }
//         windowSize={1}
//       />
//     );
//   };

//   onViewableItemsChanged = async (evt: {
//     viewableItems: ViewToken[];
//     changed: ViewToken[];
//   }) => {

//     for (const item of evt.changed) {
//       const ref = this.refsByKey.get(item.key);
//       console.log(`Stoping ${item.index} ${item.key}`)
//       await ref.stopAsync();
//     }
//     for (const item of evt.viewableItems) {
//       const ref = this.refsByKey.get(item.key);
//       console.log(`Replaying ${item.index} ${item.key}`)
//       await ref.replayAsync();
//     }
    
//     // const job = Promise.resolve(null);
//     // evt.changed.forEach(changed_token => {
//     //   const item = this.refsByKey.get(changed_token.key);
//     //   job.then(async () => await item.stopAsync());
//     //   console.log("Stopping", changed_token.index);
//     // });
//     // evt.viewableItems.forEach(viewable_token => {
//     //   const item = this.refsByKey.get(viewable_token.key);
//     //   job.then(async () => await item.playAsync());
//     //   console.log("Now playing", viewable_token.index, viewable_token.key);
//     // });
//     // Promise.resolve(job);
//   };

//   _getButtonLayout = (evt: LayoutChangeEvent) => {
//     this.setState({
//       video_height: evt.nativeEvent.layout.height
//     });
//   };

//   render() {
//     return (
//       <View
//         onLayout={this._getButtonLayout}
//         style={{ flex: 1, marginTop: Constants.statusBarHeight }}
//       >
//         {this._renderFlatlist()}
//         <UploadButton />
//       </View>
//     );
//   }
// }

// // CSS-Like styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   }
// });
