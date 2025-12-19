import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, ScrollView, Text } from 'react-native';
import { applyTw } from '../../style/style';

/**
 * Progress Component
 * Displays an indicator showing the completion progress of a task.
 */

export function Progress({ value = 0, max = 100, className = '', indicatorClassName = '', ...props }) {
    const progressAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const percentage = Math.min(Math.max(value, 0), max) / max;

        Animated.timing(progressAnim, {
            toValue: percentage,
            duration: 500,
            useNativeDriver: false, // Width animation doesn't support native driver
        }).start();
    }, [value, max]);

    const widthInterpolation = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <View
            style={applyTw(`relative h-2 w-full overflow-hidden rounded-full bg-[#333] ${className}`)}
            {...props}
        >
            <Animated.View
                style={[
                    applyTw(`h-full w-full flex-1 bg-white ${indicatorClassName}`),
                    { width: widthInterpolation }
                ]}
            />
        </View>
    );
}


// ==================== DEMO COMPONENT ====================

export function ProgressDemo() {
    const [progress, setProgress] = useState(13);

    useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <ScrollView style={applyTw('flex-1')} contentContainerStyle={applyTw('p-5 gap-8')}>
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Progress</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
                </Text>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Example</Text>
                <View style={applyTw('p-6 border border-[#333] rounded-lg bg-[#111]')}>
                    <Progress value={progress} className="w-[60%]" />
                    <Text style={applyTw('text-gray-400 text-sm mt-4')}>
                        Progress: {progress}%
                    </Text>
                </View>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Colors</Text>
                <View style={applyTw('p-6 border border-[#333] rounded-lg bg-[#111] gap-6')}>
                    <Progress value={40} indicatorClassName="bg-blue-500" />
                    <Progress value={75} indicatorClassName="bg-green-500" />
                    <Progress value={90} indicatorClassName="bg-red-500" />
                </View>
            </View>
        </ScrollView>
    );
}

export default Progress;
