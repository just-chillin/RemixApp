import React from "react";
import * as ImagePicker from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import { RestService } from "./RestService";
import {
  Button,
  SafeAreaView,
  ButtonProps,
  StyleProp,
  ViewStyle,
  LayoutChangeEvent
} from "react-native";

interface Props {
  style?: StyleProp<ViewStyle>;
  onLayout?: (event: LayoutChangeEvent) => void;
}

/**
 * A button that handles uploading videos to the remix api.
 */
export default class UploadButton extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  /**
   * A method that opens the camera roll. Should be passed to a callback in the render() function.
   */
  async openCameraRoll() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      allowsMultipleSelection: false,
      base64: false
    });
    if (result.cancelled) return;
    console.debug(result);
    return RestService.uploadVideo(
      //@ts-ignore
      result.uri,
      //@ts-ignore
      result.uri.split("ImagePicker/")[1],
      "test"
    );
  }

  render() {
    return (
      <SafeAreaView onLayout={this.props.onLayout} style={this.props.style}>
        <Button title="Upload Video" onPress={this.openCameraRoll} />
      </SafeAreaView>
    );
  }
}
