import React, { useRef, useState, useCallback } from 'react';
import { View, PanResponder, ScrollView } from 'react-native';
import { applyTw } from '../../style/_elst';
import { Text } from './text';

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

/**
 * Slider — allows selecting a value (or range) from a given range by
 * dragging a thumb along a track.
 *
 * @param {number} value - Controlled value (single-thumb mode)
 * @param {function} onValueChange - Callback fired continuously while dragging
 * @param {function} onValueCommit - Callback fired on release
 * @param {number} min
 * @param {number} max
 * @param {number} step
 * @param {boolean} disabled
 */
export const Slider = ({
    value,
    defaultValue = 50,
    onValueChange,
    onValueCommit,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    className = '',
}) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const trackWidth = useRef(0);
    const startX = useRef(0);
    const startValue = useRef(currentValue);

    const setValue = useCallback(
        (next) => {
            const stepped = Math.round(next / step) * step;
            const clamped = clamp(stepped, min, max);
            if (!isControlled) setInternalValue(clamped);
            onValueChange?.(clamped);
            return clamped;
        },
        [isControlled, max, min, onValueChange, step]
    );

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => !disabled,
            onMoveShouldSetPanResponder: () => !disabled,
            onPanResponderGrant: () => {
                startValue.current = currentValue;
            },
            onPanResponderMove: (_, gesture) => {
                if (trackWidth.current <= 0) return;
                const deltaRatio = gesture.dx / trackWidth.current;
                const deltaValue = deltaRatio * (max - min);
                setValue(startValue.current + deltaValue);
            },
            onPanResponderRelease: () => {
                onValueCommit?.(clamp(currentValue, min, max));
            },
        })
    ).current;

    const percent = ((clamp(currentValue, min, max) - min) / (max - min)) * 100;

    return (
        <View
            style={applyTw(`h-6 justify-center ${disabled ? 'opacity-50' : ''} ${className}`)}
            onLayout={(e) => (trackWidth.current = e.nativeEvent.layout.width)}
            {...(disabled ? {} : panResponder.panHandlers)}
        >
            <View style={applyTw('h-1.5 w-full rounded-full bg-[#2A2A2A] overflow-hidden')}>
                <View style={[applyTw('h-full bg-white rounded-full'), { width: `${percent}%` }]} />
            </View>
            <View
                style={[
                    applyTw('absolute w-5 h-5 rounded-full bg-white border-2 border-black'),
                    { left: `${percent}%`, marginLeft: -10 },
                ]}
            />
        </View>
    );
};

// ==================== DEMO COMPONENT ====================

export const SliderDemo = () => {
    const [volume, setVolume] = useState(60);
    const [price, setPrice] = useState(250);

    return (
        <ScrollView style={applyTw('flex-1')} contentContainerStyle={applyTw('p-5 gap-8 pb-20')}>
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Slider</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    Drag the thumb to select a value from a range.
                </Text>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Volume</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <Slider value={volume} onValueChange={setVolume} min={0} max={100} step={1} />
                    <Text style={applyTw('text-gray-400 text-sm mt-3')}>{volume}%</Text>
                </View>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Price ($10 steps)</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <Slider value={price} onValueChange={setPrice} min={0} max={1000} step={10} />
                    <Text style={applyTw('text-gray-400 text-sm mt-3')}>${price}</Text>
                </View>
            </View>

            <View style={applyTw('gap-4 mb-8')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Disabled</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <Slider value={30} disabled />
                </View>
            </View>
        </ScrollView>
    );
};

export default Slider;
