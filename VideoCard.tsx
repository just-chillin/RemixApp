import React, { Component } from "react";
import { View, Text } from "react-native";
import {LivePlayer} from "react-native-live-stream";

export class VideoCard extends Component {
    constructor(props: Readonly<{ key: Number, index: Number }>) {
        super(props);
    }

    testVideo = <LivePlayer source={{ uri: "rtmp://live.hkstv.hk.lxdns.com/live/hks" }}
        ref={(ref) => {
            this.player = ref;
        }}
        paused={false}
        muted={false}
        bufferTime={300}
        maxBufferTime={1000}
        resizeMode={"contain"}
        onLoading={() => { }}
        onLoad={() => { }}
        onEnd={() => { }}
    />

    createElement() {

    }

    render() {
        return (
            <View>
                {this.testVideo}
            </View>
        )
    }

}