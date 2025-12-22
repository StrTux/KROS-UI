import React from 'react';
import { View } from 'react-native';
import { applyTw } from '../../../style/style';
import { Text } from '../text';
import { useVideoPlayer } from './function/useVideoPlayer';
import VideoSurface from './function/VideoSurface';
import VideoControls, { CenterPlayButton } from './function/VideoControls';
import VideoContainer from './function/VideoContainer';
import videosData from '../../../data/videos.json';

/**
 * Streaming Section Component
 * Event-style streaming with title and description
 */
const StreamingSection = ({ title, subtitle, description, videoUrl }) => {
    const videoData = videosData?.videos?.[0];
    if (!videoData) return null;

    const finalTitle = title || videoData.title;
    const finalSubtitle = subtitle || videoData.subtitle;
    const finalDescription = description || videoData.description;
    const finalVideoUrl = videoUrl || videoData.url;

    // Use custom video player hook
    const player = useVideoPlayer(finalVideoUrl);

    return (
        <View style={applyTw('bg-[#111111] rounded-xl overflow-hidden border border-[#2A2A2A]')}>
            {/* Event Header */}
            <View style={applyTw('p-4')}>
                <Text style={applyTw('text-white text-xl font-bold mb-1')}>
                    {finalTitle}
                </Text>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    {finalSubtitle}
                </Text>
            </View>

            {/* Video Player */}
            <VideoContainer
                isPlaying={player.isPlaying}
                isBuffering={player.isBuffering}
                controls={
                    <>
                        <CenterPlayButton
                            isPlaying={player.isPlaying}
                            onPress={player.togglePlay}
                        />
                        <VideoControls
                            isPlaying={player.isPlaying}
                            currentTime={player.currentTime}
                            duration={player.duration}
                            volume={player.volume}
                            seekable={player.seekable}
                            onPlayPause={player.togglePlay}
                            onSeek={player.seekByPercentage}
                            onVolumeChange={player.changeVolume}
                            onForward={() => player.skipForward(10)}
                            onBackward={() => player.skipBackward(10)}
                        />
                    </>
                }
            >
                <VideoSurface
                    videoRef={player.videoRef}
                    videoUrl={finalVideoUrl}
                    streamType={player.streamType}
                    paused={!player.isPlaying}
                    volume={player.volume}
                    playbackSpeed={player.playbackSpeed}
                    onProgress={player.onProgress}
                    onLoad={player.onLoad}
                    onBuffer={player.onBuffer}
                    onEnd={player.onEnd}
                    style={{ aspectRatio: 16 / 9 }}
                />
            </VideoContainer>

            {/* Event Description */}
            <View style={applyTw('p-4')}>
                <Text style={applyTw('text-white text-sm mb-3')}>
                    {finalDescription}
                </Text>
            </View>
        </View>
    );
};

export default StreamingSection;
