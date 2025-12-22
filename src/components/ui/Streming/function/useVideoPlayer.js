import { useState, useRef, useEffect, useCallback } from 'react';
import { detectStreamType, isStreamSeekable, detectAudioCodec, requiresVLCPlayer } from './streamUtils';

/**
 * Custom hook for Video player (hybrid VLC/react-native-video)
 * Automatically uses VLC for E-AC3/Dolby audio
 * Uses react-native-video for standard codecs
 */
export const useVideoPlayer = (videoSource) => {
    const videoRef = useRef(null);

    // Support both video object and URL string
    const videoUrl = typeof videoSource === 'string' ? videoSource : videoSource?.url;
    const videoCodec = typeof videoSource === 'object' ? videoSource?.audioCodec : null;

    // Detect stream type and audio codec
    const streamType = detectStreamType(videoUrl);

    // Prioritize codec from metadata, fallback to URL detection
    const audioCodec = videoCodec || detectAudioCodec(videoUrl);
    const useVLC = requiresVLCPlayer(audioCodec);  // Use VLC for E-AC3/Dolby
    const seekable = isStreamSeekable(streamType);

    // Player state
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0); // seconds
    const [duration, setDuration] = useState(0); // seconds
    const [volume, setVolume] = useState(1); // 0-1 range
    const [isBuffering, setIsBuffering] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [audioTracks, setAudioTracks] = useState([]); // Available audio tracks
    const [selectedAudioTrack, setSelectedAudioTrack] = useState(null); // Selected track

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            setIsPlaying(false);
        };
    }, []);

    // Handle video progress event
    const onProgress = useCallback((data) => {
        // react-native-video returns: { currentTime: seconds, playableDuration: seconds }
        setCurrentTime(data.currentTime);
    }, []);

    // Handle video load
    const onLoad = useCallback((data) => {
        // react-native-video returns: { duration: seconds }
        setDuration(data.duration);
    }, []);

    // Handle buffering
    const onBuffer = useCallback((data) => {
        setIsBuffering(data.isBuffering);
    }, []);

    // Handle video end
    const onEnd = useCallback(() => {
        setIsPlaying(false);
    }, []);

    // Handle audio tracks
    const onAudioTracks = useCallback((data) => {
        if (data.audioTracks && data.audioTracks.length > 0) {
            setAudioTracks(data.audioTracks);
        }
    }, []);

    // Change audio track
    const changeAudioTrack = useCallback((trackIndex) => {
        // react-native-video expects: { type: 'index', value: number }
        setSelectedAudioTrack({ type: 'index', value: trackIndex });
    }, []);

    // Play/Pause toggle
    const togglePlay = useCallback(() => {
        setIsPlaying(prev => !prev);
    }, []);

    // Seek to specific time (seconds)
    const seek = useCallback((seconds) => {
        if (!seekable || !duration || seconds < 0) return;
        const clampedSeconds = Math.min(Math.max(seconds, 0), duration);
        videoRef.current?.seek(clampedSeconds);
        setCurrentTime(clampedSeconds);
    }, [duration, seekable]);

    // Seek by percentage (0-100)
    const seekByPercentage = useCallback((percentage) => {
        if (!seekable || !duration) return;
        const seconds = (percentage / 100) * duration;
        seek(seconds);
    }, [duration, seek, seekable]);

    // Skip forward
    const skipForward = useCallback((seconds = 10) => {
        if (!seekable) return;
        seek(currentTime + seconds);
    }, [currentTime, seek, seekable]);

    // Skip backward
    const skipBackward = useCallback((seconds = 10) => {
        if (!seekable) return;
        seek(currentTime - seconds);
    }, [currentTime, seek, seekable]);

    // Change volume (0-1)
    const changeVolume = useCallback((newVolume) => {
        const clampedVolume = Math.min(Math.max(newVolume, 0), 1);
        setVolume(clampedVolume);
    }, []);

    // Increase volume
    const increaseVolume = useCallback(() => {
        setVolume(prev => Math.min(prev + 0.1, 1));
    }, []);

    // Decrease volume
    const decreaseVolume = useCallback(() => {
        setVolume(prev => Math.max(prev - 0.1, 0));
    }, []);

    // Change playback speed
    const changeSpeed = useCallback((speed) => {
        setPlaybackSpeed(speed);
    }, []);

    return {
        // Ref
        videoRef,

        // State
        isPlaying,
        currentTime,
        duration,
        volume,
        isBuffering,
        playbackSpeed,
        streamType,
        audioCodec,
        useVLC,
        seekable,
        audioTracks: useVLC ? [] : audioTracks,  // Disable audio tracks for VLC
        selectedAudioTrack: useVLC ? null : selectedAudioTrack,

        // Controls
        togglePlay,
        seek,
        seekByPercentage,
        skipForward,
        skipBackward,
        changeVolume,
        increaseVolume,
        decreaseVolume,
        changeSpeed,
        changeAudioTrack: useVLC ? () => { } : changeAudioTrack,  // Disable for VLC

        // Event handlers
        onProgress,
        onLoad,
        onBuffer,
        onEnd,
        onAudioTracks: useVLC ? () => { } : onAudioTracks,  // Disable for VLC
    };
};
