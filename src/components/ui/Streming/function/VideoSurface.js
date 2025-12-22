import React from 'react';
import Video from 'react-native-video';
import { VLCPlayer } from 'react-native-vlc-media-player';

/**
 * Video Surface Component
 * Automatically switches between react-native-video and VLC based on audio codec
 * VLC for E-AC3/Dolby, react-native-video for standard codecs
 */
const VideoSurface = ({
    videoRef,
    videoUrl,
    paused,
    volume,
    playbackSpeed,
    selectedAudioTrack,
    useVLC = false,  // Use VLC for E-AC3/Dolby audio
    onProgress,
    onLoad,
    onBuffer,
    onEnd,
    onAudioTracks,
    style
}) => {
    // Use VLC Player for E-AC3/Dolby audio
    if (useVLC) {
        return (
            <VLCPlayer
                ref={videoRef}
                source={{
                    uri: videoUrl,
                    initOptions: [
                        '--network-caching=1500',
                        '--live-caching=1500',
                        '--file-caching=1500'
                    ]
                }}
                style={style}
                paused={paused}
                volume={volume * 200}  // VLC uses 0-200 range
                rate={playbackSpeed}
                onProgress={(e) => {
                    // VLC returns seconds
                    onProgress({ currentTime: e.currentTime || 0 });
                }}
                onLoad={(e) => {
                    // VLC onLoad
                    onLoad({ duration: e.duration || 0 });
                }}
                onBuffering={(e) => {
                    onBuffer({ isBuffering: e.isBuffering });
                }}
                onEnd={onEnd}
                onError={(e) => console.log('VLC Error:', e)}
                resizeMode="contain"
            />
        );
    }

    // Use react-native-video for standard audio
    return (
        <Video
            ref={videoRef}
            source={{ uri: videoUrl }}
            style={style}
            paused={paused}
            volume={volume}
            rate={playbackSpeed}
            selectedAudioTrack={selectedAudioTrack}
            onProgress={onProgress}
            onLoad={onLoad}
            onBuffer={onBuffer}
            onEnd={onEnd}
            onAudioTracks={onAudioTracks}
            onError={(error) => console.log('Video Error:', error)}
            resizeMode="contain"
            progressUpdateInterval={250}
        />
    );
};

export default VideoSurface;
