interface VideoResponse {
  _id: string;
  s3_url: string;
  name: string;
  description: string;
  owner_id: string;
  url: any;
  key: string;
  timestamp: Date;
}

const VideoEndpoint = new URL('https://video.remixapp.net/');

const RestService = {
  getNewVideos: async function(): Promise<VideoResponse[] | any> {
    let params = new URLSearchParams();
    params.append('Time', Date.now().toFixed());
    params.append('Page', '0');
    let url = `https://api.remixapp.net/video/new?${params.toString()}`;
    console.info('beginning callout to:', url);
    let response;
    try {
    response = await fetch(url);
    } catch {
      console.log('failed');
      return [{
        key: '303b157b-7ab7-467a-9f85-1a771ae735d5.mp4'
      }]
    }
    const video = await response.json();
    console.info('Recieved response:', video);
    return video;
  }
};

export {RestService, VideoEndpoint};