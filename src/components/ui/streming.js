import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { applyTw } from '../../style/style';
import { Text } from '../ui/text';
import { useVideoPlayer } from './Streming/function/useVideoPlayer';
import VideoSurface from './Streming/function/VideoSurface';
import VideoControls, { CenterPlayButton } from './Streming/function/VideoControls';
import VideoContainer from './Streming/function/VideoContainer';
import videosData from '../../data/videos.json';

/**
 * Simple Streaming Component
 * Uses modular architecture with custom hooks and components
 */
const SimpleStreaming = () => {
    const video = videosData?.videos?.[0];
    if (!video) return null;

    // Use custom video player hook - pass video object with codec info
    const player = useVideoPlayer(video);

    return (
        <View>
            {/* Player Type Info */}
            {player.useVLC && (
                <View style={applyTw('mb-3 bg-[#FF385C] p-3 rounded-lg')}>
                    <Text style={applyTw('text-white text-sm font-bold')}>
                        🎵 Using VLC Player for E-AC3/Dolby Audio
                    </Text>
                    <Text style={applyTw('text-white text-xs mt-1')}>
                        Audio track switching disabled (VLC handles multi-audio automatically)
                    </Text>
                </View>
            )}

            {/* Audio Track Selector - Only for non-VLC */}
            {!player.useVLC && player.audioTracks.length > 1 && (
                <View style={applyTw('mb-3')}>
                    <Text style={applyTw('text-white text-sm mb-2')}>Select Audio Track:</Text>
                    <View style={applyTw('flex-row flex-wrap gap-2')}>
                        {player.audioTracks.map((track, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => player.changeAudioTrack(index)}
                                style={applyTw(
                                    `px-4 py-2 rounded-lg ${player.selectedAudioTrack?.value === index ? 'bg-[#FF385C]' : 'bg-[#333]'}`
                                )}
                            >
                                <Text style={applyTw('text-white text-sm')}>
                                    {track.title || track.language || `Track ${index + 1}`}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}

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
                            onVolumeIncrease={player.increaseVolume}
                            onVolumeDecrease={player.decreaseVolume}
                            onForward={() => player.skipForward(10)}
                            onBackward={() => player.skipBackward(10)}
                            showAudioTrackSelector={false}
                        />
                    </>
                }
            >
                <VideoSurface
                    videoRef={player.videoRef}
                    videoUrl={video.url}
                    streamType={player.streamType}
                    paused={!player.isPlaying}
                    volume={player.volume}
                    playbackSpeed={player.playbackSpeed}
                    selectedAudioTrack={player.selectedAudioTrack}
                    useVLC={player.useVLC}
                    onProgress={player.onProgress}
                    onLoad={player.onLoad}
                    onBuffer={player.onBuffer}
                    onEnd={player.onEnd}
                    onAudioTracks={player.onAudioTracks}
                    style={{ aspectRatio: 16 / 9 }}
                />
            </VideoContainer>
        </View>
    );
};

/**
 * Main Export
 */
export const StreamingDemo = () => (
    <View style={applyTw('bg-[#0D0D0D] p-4 rounded-xl')}>
        <Text style={applyTw('text-white text-lg font-bold mb-2')}>
            Streaming Demo (Modular Architecture)
        </Text>
        <SimpleStreaming />
    </View>
);

export default StreamingDemo;
