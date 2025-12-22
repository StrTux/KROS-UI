import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { applyTw } from '../../../../style/style';
import { Text } from '../../../ui/text';
import { renderFlaticon } from '../../../../functions/iconUtils';
import { formatTime } from './streamUtils';

const PlayIcon = () => renderFlaticon('fi fi-sr-play', { size: 32, color: '#fff' });
const PauseIcon = () => renderFlaticon('fi fi-sr-pause', { size: 32, color: '#fff' });
const VolumeIcon = () => renderFlaticon('fi fi-rr-volume', { size: 18, color: '#fff' });
const ForwardIcon = () => renderFlaticon('fi fi-rr-forward', { size: 20, color: '#fff' });
const BackwardIcon = () => renderFlaticon('fi fi-rr-rewind', { size: 20, color: '#fff' });
const FullscreenIcon = () => renderFlaticon('fi fi-rr-expand', { size: 20, color: '#fff' });

/**
 * Video Controls Component
 * Play/Pause, Seek, Volume, Forward/Backward
 */
const VideoControls = ({
    isPlaying,
    currentTime,
    duration,
    volume,
    seekable,
    audioTracks = [],
    selectedAudioTrack,
    onPlayPause,
    onSeek,
    onVolumeChange,
    onVolumeIncrease,
    onVolumeDecrease,
    onAudioTrackChange,
    onForward,
    onBackward,
    onFullscreen,
    showForwardBackward = true,
    showAudioTrackSelector = true,
    showFullscreenButton = true
}) => {
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <View style={applyTw('bg-black/80 p-3')}>
            {/* Forward/Backward Buttons */}
            {showForwardBackward && seekable && (
                <View style={applyTw('flex-row justify-center gap-4 mb-2')}>
                    <TouchableOpacity onPress={onBackward}>
                        <BackwardIcon />
                    </TouchableOpacity>
                    <Text style={applyTw('text-white text-xs')}>10s</Text>
                    <TouchableOpacity onPress={onForward}>
                        <ForwardIcon />
                    </TouchableOpacity>
                </View>
            )}

            {/* Progress Slider */}
            {seekable && (
                <Slider
                    minimumValue={0}
                    maximumValue={100}
                    value={progress}
                    onSlidingComplete={onSeek}
                    minimumTrackTintColor="#FF385C"
                    maximumTrackTintColor="#555"
                    thumbTintColor="#fff"
                    disabled={!seekable}
                />
            )}

            {/* Time Display, Fullscreen and Volume */}
            <View style={applyTw('flex-row justify-between items-center mt-2')}>
                <View style={applyTw('flex-row items-center gap-3')}>
                    <Text style={applyTw('text-white text-xs')}>
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </Text>

                    {/* Fullscreen Button */}
                    {showFullscreenButton && onFullscreen && (
                        <TouchableOpacity onPress={onFullscreen} style={applyTw('p-1')}>
                            <FullscreenIcon />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Volume Control with +/- Buttons */}
                <View style={applyTw('flex-row items-center gap-2')}>
                    <TouchableOpacity onPress={onVolumeDecrease} style={applyTw('p-1')}>
                        <Text style={applyTw('text-white text-lg font-bold')}>−</Text>
                    </TouchableOpacity>

                    <VolumeIcon />

                    <Slider
                        style={{ width: 60 }}
                        minimumValue={0}
                        maximumValue={1}
                        step={0.01}
                        value={volume}
                        onValueChange={onVolumeChange}
                        minimumTrackTintColor="#fff"
                        maximumTrackTintColor="#555"
                        thumbTintColor="#fff"
                    />

                    <TouchableOpacity onPress={onVolumeIncrease} style={applyTw('p-1')}>
                        <Text style={applyTw('text-white text-lg font-bold')}>+</Text>
                    </TouchableOpacity>

                    <Text style={applyTw('text-white text-xs w-10 text-right')}>
                        {Math.round(volume * 100)}%
                    </Text>
                </View>
            </View>

            {/* Audio Track Selector */}
            {showAudioTrackSelector && audioTracks.length > 1 && (
                <View style={applyTw('mt-3')}>
                    <Text style={applyTw('text-white text-xs mb-2')}>Audio Track:</Text>
                    <View style={applyTw('flex-row flex-wrap gap-2')}>
                        {audioTracks.map((track, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => onAudioTrackChange?.(index)}
                                style={applyTw(
                                    `px-3 py-1 rounded ${selectedAudioTrack === index ? 'bg-[#FF385C]' : 'bg-black/50'}`
                                )}
                            >
                                <Text style={applyTw('text-white text-xs')}>
                                    {track.title || track.language || `Track ${index + 1}`}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
};

/**
 * Center Play/Pause Button
 */
export const CenterPlayButton = ({ isPlaying, onPress }) => (
    <View style={applyTw('flex-1 items-center justify-center')}>
        <TouchableOpacity
            onPress={onPress}
            style={applyTw('bg-black/60 p-4 rounded-full')}
        >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </TouchableOpacity>
    </View>
);

export default VideoControls;
