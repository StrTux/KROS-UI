import React, { useState, useRef } from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { applyTw } from '../../style/style';
import { Text } from './text';

/**
 * Carousel Component for React Native
 * Horizontal scrollable carousel with indicators
 */

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 80;

export const Carousel = ({ items, renderItem, className = '' }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollViewRef = useRef(null);

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / CARD_WIDTH);
        setActiveIndex(index);
    };

    const scrollToIndex = (index) => {
        scrollViewRef.current?.scrollTo({
            x: index * CARD_WIDTH,
            animated: true,
        });
        setActiveIndex(index);
    };

    return (
        <View style={applyTw(`${className}`)}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled={false}
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                snapToInterval={CARD_WIDTH + 16}
                decelerationRate="fast"
                contentContainerStyle={applyTw('px-4')}
            >
                {items.map((item, index) => (
                    <View
                        key={index}
                        style={[
                            applyTw('m-2 p-5'),
                            { width: CARD_WIDTH }
                        ]}
                    >
                        {renderItem(item, index)}
                    </View>
                ))}
            </ScrollView>

            {/* Indicators */}
            <View style={applyTw('flex-row justify-center items-center mt-4 gap-2')}>
                {items.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => scrollToIndex(index)}
                        activeOpacity={0.7}
                    >
                        <View
                            style={applyTw(
                                `h-2 rounded-full ${index === activeIndex
                                    ? 'w-8 bg-white'
                                    : 'w-2 bg-gray-600'
                                }`
                            )}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

// ==================== DEMO COMPONENT ====================

export const CarouselDemo = () => {
    const carouselItems = [
        {
            title: 'First Slide',
            description: 'This is the first slide of the carousel',
            color: 'bg-blue-600',
            emoji: '🎨',
        },
        {
            title: 'Second Slide',
            description: 'This is the second slide with different content',
            color: 'bg-purple-600',
            emoji: '🚀',
        },
        {
            title: 'Third Slide',
            description: 'This is the third and final slide',
            color: 'bg-pink-600',
            emoji: '⭐',
        },
    ];

    const productItems = [
        { name: 'Product 1', price: '$99', rating: '4.5' },
        { name: 'Product 2', price: '$149', rating: '4.8' },
        { name: 'Product 3', price: '$199', rating: '4.9' },
        { name: 'Product 4', price: '$79', rating: '4.3' },
    ];

    const renderCarouselCard = (item, index) => (
        <View
            style={[
                applyTw(`${item.color} rounded-2xl p-8 items-center justify-center`),
                { height: 200 }
            ]}
        >
            <Text style={applyTw('text-6xl mb-4')}>{item.emoji}</Text>
            <Text style={applyTw('text-white text-2xl font-bold mb-2')}>
                {item.title}
            </Text>
            <Text style={applyTw('text-white text-center opacity-90')}>
                {item.description}
            </Text>
        </View>
    );

    const renderProductCard = (item, index) => (
        <View
            style={[
                applyTw('bg-[#111111] border border-[#2A2A2A] rounded-xl p-6'),
                { height: 180 }
            ]}
        >
            <View style={applyTw('flex-1 justify-between')}>
                <View>
                    <Text style={applyTw('text-white text-xl font-bold mb-2')}>
                        {item.name}
                    </Text>
                    <Text style={applyTw('text-gray-400 text-sm mb-4')}>
                        Premium quality product
                    </Text>
                </View>
                <View style={applyTw('flex-row items-center justify-between')}>
                    <Text style={applyTw('text-white text-2xl font-bold')}>
                        {item.price}
                    </Text>
                    <View style={applyTw('flex-row items-center gap-1')}>
                        <Text style={applyTw('text-yellow-500')}>⭐</Text>
                        <Text style={applyTw('text-white font-medium')}>
                            {item.rating}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <ScrollView
            style={applyTw('flex-1')}
            contentContainerStyle={applyTw('p-5 gap-8')}
        >
            {/* Header */}
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>
                    Carousel Component
                </Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    Horizontal scrollable carousel with indicators
                </Text>
            </View>

            {/* SECTION 1: Basic Carousel */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>
                    🎠 Basic Carousel
                </Text>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Simple carousel with colorful slides
                </Text>

                <Carousel items={carouselItems} renderItem={renderCarouselCard} />
            </View>

            {/* SECTION 2: Product Carousel */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>
                    🛍️ Product Carousel
                </Text>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Showcase products in a carousel
                </Text>

                <Carousel items={productItems} renderItem={renderProductCard} />
            </View>

            {/* SECTION 3: Features */}
            <View style={applyTw('gap-4 mb-8')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>
                    ✨ Features
                </Text>

                <View style={applyTw('bg-[#111111] rounded-lg p-4 gap-3')}>
                    <View style={applyTw('flex-row items-start gap-3')}>
                        <Text style={applyTw('text-blue-500 text-lg')}>👆</Text>
                        <View style={applyTw('flex-1')}>
                            <Text style={applyTw('text-white font-medium mb-1')}>
                                Swipe Navigation
                            </Text>
                            <Text style={applyTw('text-gray-400 text-sm')}>
                                Smooth horizontal scrolling with snap effect
                            </Text>
                        </View>
                    </View>

                    <View style={applyTw('flex-row items-start gap-3')}>
                        <Text style={applyTw('text-blue-500 text-lg')}>⚫</Text>
                        <View style={applyTw('flex-1')}>
                            <Text style={applyTw('text-white font-medium mb-1')}>
                                Dot Indicators
                            </Text>
                            <Text style={applyTw('text-gray-400 text-sm')}>
                                Visual indicators showing current slide
                            </Text>
                        </View>
                    </View>

                    <View style={applyTw('flex-row items-start gap-3')}>
                        <Text style={applyTw('text-blue-500 text-lg')}>🎨</Text>
                        <View style={applyTw('flex-1')}>
                            <Text style={applyTw('text-white font-medium mb-1')}>
                                Custom Rendering
                            </Text>
                            <Text style={applyTw('text-gray-400 text-sm')}>
                                Flexible renderItem prop for custom content
                            </Text>
                        </View>
                    </View>

                    <View style={applyTw('flex-row items-start gap-3')}>
                        <Text style={applyTw('text-blue-500 text-lg')}>📱</Text>
                        <View style={applyTw('flex-1')}>
                            <Text style={applyTw('text-white font-medium mb-1')}>
                                Responsive
                            </Text>
                            <Text style={applyTw('text-gray-400 text-sm')}>
                                Adapts to screen width automatically
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default CarouselDemo;
