import React from 'react';
import { View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import Slider from '@react-native-community/slider';
import { applyTw } from '../../../style/style';
import { Text } from '../text';
import { renderFlaticon } from '../../../functions/iconUtils';
import { useVideoPlayer } from './function/useVideoPlayer';
import VideoSurface from './function/VideoSurface';
import VideoContainer from './function/VideoContainer';
import { formatTime } from './function/streamUtils';
import videosData from '../../../data/videos.json';

const PlayIcon = () => renderFlaticon('fi fi-sr-play', { size: 32, color: '#fff' });
const PauseIcon = () => renderFlaticon('fi fi-sr-pause', { size: 32, color: '#fff' });
const CloseIcon = () => renderFlaticon('fi fi-rr-cross', { size: 24, color: '#fff' });
const VolumeIcon = () => renderFlaticon('fi fi-rr-volume', { size: 20, color: '#fff' });

/**
 * Full-Screen Watch Video Component
 * Uses modular architecture
 */
const WatchVideo = ({ videoUrl, title, onClose }) => {
    const videoData = videosData?.videos?.[0];
    if (!videoData) return null;

    const finalVideoUrl = videoUrl || videoData.url;
    const finalTitle = title || videoData.title;

    // Use custom video player hook
    const player = useVideoPlayer(finalVideoUrl);

    const progress = player.duration > 0 ? (player.currentTime / player.duration) * 100 : 0;

    return (
        <SafeAreaView style={applyTw('flex-1 bg-black')}>
            <StatusBar hidden />

            <VideoContainer
                isPlaying={player.isPlaying}
                isBuffering={player.isBuffering}
                autoHide={true}
                autoHideDelay={3000}
                controls={
                    <View style={applyTw('absolute inset-0')}>
                        {/* Top Bar */}
                        <View style={applyTw('flex-row items-center justify-between p-4 bg-black/80')}>
                            <Text style={applyTw('text-white text-lg font-semibold flex-1')}>
                                {finalTitle}
                            </Text>
                            {onClose && (
                                <TouchableOpacity onPress={onClose}>
                                    <CloseIcon />
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Center Play Button */}
                        <View style={applyTw('flex-1 items-center justify-center')}>
                            <TouchableOpacity
                                onPress={player.togglePlay}
                                style={applyTw('bg-black/50 rounded-full p-5')}
                            >
                                {player.isPlaying ? <PauseIcon /> : <PlayIcon />}
                            </TouchableOpacity>
                        </View>

                        {/* Bottom Controls */}
                        <View style={applyTw('p-4 bg-black/80')}>
                            {/* Progress Slider */}
                            {player.seekable && (
                                <Slider
                                    minimumValue={0}
                                    maximumValue={100}
                                    value={progress}
                                    onSlidingComplete={player.seekByPercentage}
                                    minimumTrackTintColor="#FF385C"
                                    maximumTrackTintColor="#4A4A4A"
                                    thumbTintColor="#FFFFFF"
                                />
                            )}

                            {/* Time and Speed */}
                            <View style={applyTw('flex-row justify-between mt-3')}>
                                <Text style={applyTw('text-white text-sm')}>
                                    {formatTime(player.currentTime)} / {formatTime(player.duration)}
                                </Text>

                                {/* Playback Speed */}
                                <View style={applyTw('flex-row gap-2')}>
                                    {[0.5, 1, 1.5, 2].map((s) => (
                                        <TouchableOpacity
                                            key={s}
                                            onPress={() => player.changeSpeed(s)}
                                            style={applyTw(
                                                `px-2 py-1 rounded ${player.playbackSpeed === s ? 'bg-[#FF385C]' : 'bg-black/50'}`
                                            )}
                                        >
                                            <Text style={applyTw('text-white text-xs')}>{s}x</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {/* Volume */}
                            <View style={applyTw('flex-row items-center gap-3 mt-3')}>
                                <VolumeIcon />
                                <Slider
                                    style={applyTw('flex-1')}
                                    minimumValue={0}
                                    maximumValue={1}
                                    step={0.01}
                                    value={player.volume}
                                    onValueChange={player.changeVolume}
                                />
                            </View>
                        </View>
                    </View>
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
                    style={applyTw('flex-1')}
                />
            </VideoContainer>
        </SafeAreaView>
    );
};

export default WatchVideo;
