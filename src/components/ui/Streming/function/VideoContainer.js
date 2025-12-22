import React, { useState, useEffect, useRef } from 'react';
import { View, Pressable } from 'react-native';
import { applyTw } from '../../../../style/style';
import { Text } from '../../../ui/text';

/**
 * Video Container Component
 * Handles overlay, gestures, auto-hide controls
 */
const VideoContainer = ({
    children,
    controls,
    showControls: externalShowControls,
    onToggleControls,
    autoHide = true,
    autoHideDelay = 3000,
    isPlaying,
    isBuffering
}) => {
    const [internalShowControls, setInternalShowControls] = useState(true);
    const hideTimer = useRef(null);

    // Use external or internal state
    const showControls = externalShowControls !== undefined
        ? externalShowControls
        : internalShowControls;

    const toggleControls = () => {
        if (onToggleControls) {
            onToggleControls();
        } else {
            setInternalShowControls(prev => !prev);
        }
    };

    // Auto-hide controls
    useEffect(() => {
        if (!autoHide) return;

        clearTimeout(hideTimer.current);

        if (showControls && isPlaying && !isBuffering) {
            hideTimer.current = setTimeout(() => {
                if (onToggleControls) {
                    onToggleControls(false);
                } else {
                    setInternalShowControls(false);
                }
            }, autoHideDelay);
        }

        return () => clearTimeout(hideTimer.current);
    }, [showControls, isPlaying, isBuffering, autoHide, autoHideDelay, onToggleControls]);

    return (
        <View style={applyTw('relative bg-black rounded-lg overflow-hidden')}>
            {/* Video Player */}
            {children}

            {/* Buffering Indicator */}
            {isBuffering && (
                <View
                    pointerEvents="none"
                    style={applyTw('absolute inset-0 items-center justify-center bg-black/50')}
                >
                    <Text style={applyTw('text-white')}>Loading...</Text>
                </View>
            )}

            {/* Controls Overlay */}
            <Pressable
                onPress={toggleControls}
                style={applyTw('absolute inset-0')}
            >
                {showControls && (
                    <View style={applyTw('absolute inset-0 justify-end')}>
                        {controls}
                    </View>
                )}
            </Pressable>
        </View>
    );
};

export default VideoContainer;
