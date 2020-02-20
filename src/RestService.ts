import atob from "atob";
import { toByteArray } from "base64-js";
import * as FileSystem from "expo-file-system";
import RNFetchBlob from "react-native-fetch-blob";

type VideoResponse = {
  _id: string;
  s3_url: string;
  name: string;
  description: string;
  owner_id: string;
  url: string;
  key: string;
  timestamp: Date;
};

const VideoEndpoint = new URL("https://video.remixapp.net/");
const APIEndpoint = new URL("https://api.remixapp.net/");

/**
 * A helper service that handles REST calls to the Remix API.
 */
const RestService = {
  /**
   * API call that gets a list of all videos, ordered by date descending.
   * Pagination is not implemented, and it will be necessary to get this method to support it once it is implemented.
   */
  async getNewVideos(): Promise<VideoResponse[]> {
    let params = new URLSearchParams();
    params.append("Time", Date.now().toFixed());
    params.append("Page", "0");
    let url = `${APIEndpoint}video/new?${params.toString()}`;
    const response = await fetch(url);
    const videos: VideoResponse[] = await response.json();
    let uniqueVideos = new Map<string, VideoResponse>();
    videos.forEach(vid => {
      uniqueVideos.set(vid.key, vid);
    });
    let finalResult: VideoResponse[] = [];
    uniqueVideos.forEach(value => finalResult.push(value));

    return finalResult;
  },

  /**
   * API call that uploads a video to Remix.
   * @param base64 A base64 encoded string of the video to upload. This is used because of the way Expo returns a file object.
   * @param name The name of the video to be uploaded.
   * @param description The description of the video to be uploaded.
   * @returns A promise of the HTTP response from the api.
   */
  async uploadVideo(uri: string, name: string, description: string) {
    // Build endpoint url
    const searchParams = new URLSearchParams();
    searchParams.append("Name", "test");
    searchParams.append("Description", "test");
    // const url = `https://api.remixapp.net/video?${searchParams.toString()}`;
    const url = `http://localhost:8081/video?${searchParams.toString()}`;
    console.log("uploading to", url);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("Authorization", "Basic dGVzdEB0ZXN0LmNvbTp0ZXN0");

    var data = new FormData();
    data.append("Video", {
      //@ts-ignore: Type specification is wrong for data.append, this actually works correctly.
      uri: uri,
      type: "video/mp4",
      name: "video.mp4"
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open(
      "POST",
      "https://api.remixapp.net/video?Name=test&Description=test"
    );
    xhr.setRequestHeader("Content-Type", "multipart/form-data");
    xhr.setRequestHeader("Authorization", "Basic dGVzdEB0ZXN0LmNvbTp0ZXN0");
    console.log("sending data");
    xhr.send(data);
  }
};

export { RestService, APIEndpoint, VideoEndpoint, VideoResponse };
