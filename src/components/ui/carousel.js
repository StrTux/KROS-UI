import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    interpolate,
    Extrapolate,
    runOnJS,
    FadeInDown,
    FadeOutUp,
} from 'react-native-reanimated';
import { applyTw } from '../../style/style';
import { renderFlaticon } from '../../functions/iconUtils';

const { width } = Dimensions.get('window');

// ==================== ANIMATED TESTIMONIALS COMPONENT ====================

const TestimonialCard = ({ item, index, activeIndex, totalLength }) => {
    const isActive = index === activeIndex;

    // Use shared values for scale and opacity only (no rotation to avoid worklet issues)
    const scale = useSharedValue(isActive ? 1 : 0.95);
    const opacity = useSharedValue(isActive ? 1 : 0.7);

    // Update shared values when active state changes
    React.useEffect(() => {
        scale.value = withSpring(isActive ? 1 : 0.95, { damping: 15, stiffness: 80 });
        opacity.value = withSpring(isActive ? 1 : 0.7, { damping: 15 });
    }, [isActive]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
            opacity: opacity.value,
        };
    });

    // Calculate static position offset for stacking effect
    const offset = isActive ? 0 : (index - activeIndex) * 5;

    return (
        <Animated.View
            style={[
                applyTw('absolute w-[300px] h-[300px] rounded-3xl overflow-hidden border border-[#333] bg-[#111]'),
                animatedStyle,
                {
                    left: (width - 32 - 300) / 2,
                    zIndex: isActive ? 100 : totalLength - index,
                }
            ]}
        >
            <Image
                source={{ uri: item.src }}
                style={applyTw('w-full h-full')}
                resizeMode="cover"
            />
        </Animated.View>
    );
};

export const AnimatedTestimonials = ({ testimonials, autoplay = false }) => {
    const [active, setActive] = useState(0);

    const handleNext = () => {
        setActive((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(handleNext, 5000);
            return () => clearInterval(interval);
        }
    }, [autoplay]);

    const activeTestimonial = testimonials[active];

    return (
        <View style={applyTw('flex-1 py-10 px-4 items-center')}>
            {/* Cards Container */}
            <View style={applyTw('h-[320px] w-full justify-center items-center')}>
                {testimonials.map((item, index) => (
                    <TestimonialCard
                        key={item.src}
                        item={item}
                        index={index}
                        activeIndex={active}
                        totalLength={testimonials.length}
                    />
                ))}
            </View>

            {/* Text Content */}
            <View style={applyTw('w-full mt-8 px-4')}>
                <View key={active}>
                    <Text style={applyTw('text-2xl font-bold text-white mb-1')}>
                        {activeTestimonial.name}
                    </Text>
                    <Text style={applyTw('text-sm text-gray-500 mb-6')}>
                        {activeTestimonial.designation}
                    </Text>

                    <Text style={applyTw('text-lg text-gray-300 leading-7')}>
                        "{activeTestimonial.quote}"
                    </Text>
                </View>

                {/* Navigation Buttons */}
                <View style={applyTw('flex-row gap-4 mt-8')}>
                    <TouchableOpacity
                        onPress={handlePrev}
                        style={applyTw('w-12 h-12 rounded-full bg-[#222] items-center justify-center border border-[#333]')}
                        activeOpacity={0.7}
                    >
                        {renderFlaticon('fi fi-rr-arrow-small-left', { size: 24, color: '#fff' })}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleNext}
                        style={applyTw('w-12 h-12 rounded-full bg-[#222] items-center justify-center border border-[#333]')}
                        activeOpacity={0.7}
                    >
                        {renderFlaticon('fi fi-rr-arrow-small-right', { size: 24, color: '#fff' })}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

// ==================== DEMO COMPONENT ====================

export const CarouselDemo = () => {
    const testimonials = [
        {
            quote:
                "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
            name: "Sarah Chen",
            designation: "Product Manager at TechFlow",
            src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote:
                "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
            name: "Michael Rodriguez",
            designation: "CTO at InnovateSphere",
            src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote:
                "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
            name: "Emily Watson",
            designation: "Operations Director at CloudScale",
            src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote:
                "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
            name: "James Kim",
            designation: "Engineering Lead at DataPro",
            src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote:
                "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
            name: "Lisa Thompson",
            designation: "VP of Technology at FutureNet",
            src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    ];

    return (
        <View style={applyTw('flex-1 bg-black')}>
            <AnimatedTestimonials testimonials={testimonials} autoplay />
        </View>
    );
};

export default CarouselDemo;
