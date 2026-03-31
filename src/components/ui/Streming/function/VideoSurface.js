import React from 'react';
import Video from 'react-native-video';

/**
 * Video Surface Component
 * Uses react-native-video for all playback
 */
const VideoSurface = ({
    videoRef,
    videoUrl,
    paused,
    volume,
    playbackSpeed,
    selectedAudioTrack,
    onProgress,
    onLoad,
    onBuffer,
    onEnd,
    onAudioTracks,
    style
}) => {
    // Use react-native-video for all playback
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
