import React, { useEffect, useRef } from 'react';
import { View, Animated, ScrollView } from 'react-native';
import { applyTw } from '../../style/_elst';
import { Text } from './text';

/**
 * Skeleton — animated placeholder used while content is loading.
 *
 * @param {string} className - applyTw classes for size/shape (width, height, rounded)
 */
export const Skeleton = ({ className = '' }) => {
    const pulse = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
                Animated.timing(pulse, { toValue: 0.5, duration: 700, useNativeDriver: true }),
            ])
        );
        loop.start();
        return () => loop.stop();
    }, [pulse]);

    return (
        <Animated.View
            style={[
                applyTw(`bg-[#2A2A2A] rounded-md ${className}`),
                { opacity: pulse },
            ]}
        />
    );
};

// ==================== DEMO COMPONENT ====================

export const SkeletonDemo = () => {
    return (
        <ScrollView style={applyTw('flex-1')} contentContainerStyle={applyTw('p-5 gap-8 pb-20')}>
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Skeleton</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    Use to show a placeholder while content is loading.
                </Text>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Card</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222] gap-3')}>
                    <Skeleton className="h-40 w-full rounded-xl" />
                    <View style={applyTw('gap-2')}>
                        <Skeleton className="h-4 w-[80%]" />
                        <Skeleton className="h-4 w-[60%]" />
                    </View>
                </View>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Profile</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <View style={applyTw('flex-row items-center gap-4')}>
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <View style={applyTw('gap-2 flex-1')}>
                            <Skeleton className="h-4 w-[70%]" />
                            <Skeleton className="h-4 w-[40%]" />
                        </View>
                    </View>
                </View>
            </View>

            <View style={applyTw('gap-4 mb-8')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>List</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222] gap-4')}>
                    {[1, 2, 3].map((i) => (
                        <View key={i} style={applyTw('flex-row items-center gap-3')}>
                            <Skeleton className="h-10 w-10 rounded-md" />
                            <Skeleton className="h-4 flex-1" />
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default Skeleton;
