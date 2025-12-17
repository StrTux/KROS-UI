import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Pressable,
    Image,
} from 'react-native';
import { applyTw } from '../../style/style';

// ==================== HOVER CARD COMPONENTS ====================

// HoverCard Container (manages modal state)
export const HoverCard = ({ children }) => {
    const [visible, setVisible] = useState(false);

    return React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { visible, setVisible });
        }
        return child;
    });
};

// HoverCard Trigger (tap to show - simpler than long-press)
export const HoverCardTrigger = ({ children, visible, setVisible }) => {
    return (
        <TouchableOpacity
            onPress={() => setVisible(!visible)}
            activeOpacity={0.7}
        >
            {children}
        </TouchableOpacity>
    );
};

// HoverCard Content (popup content)
export const HoverCardContent = ({ children, visible, setVisible }) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={() => setVisible(false)}
        >
            <Pressable
                style={applyTw('flex-1 bg-black/50 justify-center items-center')}
                onPress={() => setVisible(false)}
            >
                <Pressable onPress={(e) => e.stopPropagation()}>
                    <View style={applyTw('bg-[#1A1A1A] rounded-xl p-4 border border-[#333] w-80 shadow-lg')}>
                        {children}
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

// ==================== DEMO COMPONENT ====================

export const HoverCardDemo = () => {
    return (
        <View style={applyTw('gap-6 p-5')}>
            {/* Header */}
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>
                    HoverCard Component
                </Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    Long-press or tap to see details
                </Text>
            </View>

            {/* Example 1: User Profile */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>
                    👤 User Profile
                </Text>

                <HoverCard>
                    <HoverCardTrigger>
                        <TouchableOpacity
                            style={applyTw('px-4 py-2 bg-blue-600 rounded-lg')}
                            activeOpacity={0.8}
                        >
                            <Text style={applyTw('text-white font-medium')}>@nextjs</Text>
                        </TouchableOpacity>
                    </HoverCardTrigger>

                    <HoverCardContent>
                        <View style={applyTw('flex-row gap-4')}>
                            {/* Avatar */}
                            <View style={applyTw('w-12 h-12 rounded-full bg-blue-600 items-center justify-center')}>
                                <Text style={applyTw('text-white text-xl font-bold')}>V</Text>
                            </View>

                            {/* Info */}
                            <View style={applyTw('flex-1 gap-2')}>
                                <Text style={applyTw('text-white text-base font-semibold')}>
                                    @nextjs
                                </Text>
                                <Text style={applyTw('text-gray-300 text-sm')}>
                                    The React Framework – created and maintained by @vercel.
                                </Text>
                                <Text style={applyTw('text-gray-500 text-xs')}>
                                    Joined December 2021
                                </Text>
                            </View>
                        </View>
                    </HoverCardContent>
                </HoverCard>
            </View>

            {/* Example 2: Product Info */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>
                    📦 Product Details
                </Text>

                <HoverCard>
                    <HoverCardTrigger>
                        <TouchableOpacity
                            style={applyTw('px-4 py-2 border border-[#333] rounded-lg bg-[#111]')}
                            activeOpacity={0.8}
                        >
                            <Text style={applyTw('text-white font-medium')}>MacBook Pro</Text>
                        </TouchableOpacity>
                    </HoverCardTrigger>

                    <HoverCardContent>
                        <View style={applyTw('gap-3')}>
                            <Text style={applyTw('text-white text-lg font-bold')}>
                                MacBook Pro 16"
                            </Text>
                            <Text style={applyTw('text-gray-300 text-sm')}>
                                M3 Max chip with 16-core CPU and 40-core GPU. 64GB unified memory.
                            </Text>
                            <View style={applyTw('flex-row justify-between items-center pt-2 border-t border-[#333]')}>
                                <Text style={applyTw('text-gray-400 text-xs')}>Starting at</Text>
                                <Text style={applyTw('text-white text-xl font-bold')}>$3,499</Text>
                            </View>
                        </View>
                    </HoverCardContent>
                </HoverCard>
            </View>

            {/* Instructions */}
            <View style={applyTw('bg-[#111] rounded-lg p-4 border border-[#222] mt-4')}>
                <Text style={applyTw('text-white font-medium mb-2')}>
                    💡 How to use
                </Text>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Tap or long-press the buttons above to see detailed information in a popup card.
                </Text>
            </View>
        </View>
    );
};

export default HoverCardDemo;
