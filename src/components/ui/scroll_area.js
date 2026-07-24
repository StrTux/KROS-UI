import React, { useRef, useState } from 'react';
import { View, ScrollView, Animated } from 'react-native';
import { applyTw } from '../../style/_elst';
import { Text } from './text';

/**
 * ScrollArea — a scrollable container with a slim custom scrollbar thumb,
 * similar in spirit to the shadcn/ui ScrollArea (Radix uses a custom
 * scrollbar; native RN scrollbars are hidden here in favor of this one).
 *
 * @param {string} orientation - 'vertical' | 'horizontal'
 * @param {number} height - Fixed height for vertical scroll areas
 */
export const ScrollArea = ({
    children,
    orientation = 'vertical',
    height = 240,
    className = '',
    contentClassName = '',
}) => {
    const [containerSize, setContainerSize] = useState(0);
    const [contentSize, setContentSize] = useState(0);
    const scrollPos = useRef(new Animated.Value(0)).current;
    const isHorizontal = orientation === 'horizontal';

    const trackSize = isHorizontal ? undefined : height;
    const thumbRatio = contentSize > 0 ? Math.min(containerSize / contentSize, 1) : 1;
    const thumbLength = Math.max((trackSize || 0) * thumbRatio, 24);
    const maxScrollDistance = Math.max(contentSize - containerSize, 1);
    const maxThumbOffset = Math.max((trackSize || 0) - thumbLength, 0);

    const thumbOffset = scrollPos.interpolate({
        inputRange: [0, maxScrollDistance],
        outputRange: [0, maxThumbOffset],
        extrapolate: 'clamp',
    });

    const showThumb = contentSize > containerSize && containerSize > 0;

    return (
        <View
            style={applyTw(`flex-row ${className}`)}
            onLayout={(e) =>
                setContainerSize(isHorizontal ? e.nativeEvent.layout.width : e.nativeEvent.layout.height)
            }
        >
            <ScrollView
                horizontal={isHorizontal}
                style={isHorizontal ? applyTw('flex-1') : [applyTw('flex-1'), { height }]}
                contentContainerStyle={applyTw(contentClassName)}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { [isHorizontal ? 'x' : 'y']: scrollPos } } }],
                    { useNativeDriver: false }
                )}
                onContentSizeChange={(w, h) => setContentSize(isHorizontal ? w : h)}
            >
                {children}
            </ScrollView>

            {showThumb && (
                <View
                    style={
                        isHorizontal
                            ? applyTw('h-1.5 w-full')
                            : [applyTw('w-1.5 rounded-full bg-[#1a1a1a] ml-1'), { height }]
                    }
                >
                    <Animated.View
                        style={[
                            applyTw('bg-[#4b4b4b] rounded-full'),
                            isHorizontal
                                ? { height: 6, width: thumbLength, transform: [{ translateX: thumbOffset }] }
                                : { width: 6, height: thumbLength, transform: [{ translateY: thumbOffset }] },
                        ]}
                    />
                </View>
            )}
        </View>
    );
};

// ==================== DEMO COMPONENT ====================

const TAGS = Array.from({ length: 30 }, (_, i) => `Tag ${i + 1}`);

export const ScrollAreaDemo = () => {
    return (
        <ScrollView style={applyTw('flex-1')} contentContainerStyle={applyTw('p-5 gap-8 pb-20')}>
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Scroll Area</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    Augments native scrolling with a slim custom scrollbar thumb.
                </Text>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Vertical</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <ScrollArea height={200} contentClassName="gap-3 pr-2">
                        {TAGS.map((tag) => (
                            <View key={tag} style={applyTw('py-2 border-b border-[#222]')}>
                                <Text style={applyTw('text-gray-200 text-sm')}>{tag}</Text>
                            </View>
                        ))}
                    </ScrollArea>
                </View>
            </View>

            <View style={applyTw('gap-4 mb-8')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Horizontal</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <ScrollArea orientation="horizontal" contentClassName="flex-row gap-3 pb-3">
                        {TAGS.slice(0, 12).map((tag) => (
                            <View
                                key={tag}
                                style={applyTw('px-4 py-3 bg-[#1a1a1a] rounded-lg border border-[#2A2A2A]')}
                            >
                                <Text style={applyTw('text-gray-200 text-sm')}>{tag}</Text>
                            </View>
                        ))}
                    </ScrollArea>
                </View>
            </View>
        </ScrollView>
    );
};

export default ScrollArea;
