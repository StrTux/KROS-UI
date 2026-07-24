import React from 'react';
import { View, ScrollView } from 'react-native';
import { applyTw } from '../../style/_elst';
import { Text } from './text';

/**
 * Separator — visually or semantically separates content.
 *
 * @param {string} orientation - 'horizontal' | 'vertical'
 * @param {boolean} decorative - purely visual (no semantic meaning)
 * @param {string} className - Additional applyTw classes
 */
export const Separator = ({
    orientation = 'horizontal',
    decorative = true,
    className = '',
}) => {
    const orientationClass =
        orientation === 'vertical' ? 'w-[1px] h-full' : 'h-[1px] w-full';

    return (
        <View
            accessible={!decorative}
            accessibilityRole={decorative ? undefined : 'none'}
            style={applyTw(`bg-[#2A2A2A] ${orientationClass} ${className}`)}
        />
    );
};

// ==================== DEMO COMPONENT ====================

export const SeparatorDemo = () => {
    return (
        <ScrollView style={applyTw('flex-1')} contentContainerStyle={applyTw('p-5 gap-8 pb-20')}>
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Separator</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    Visually or semantically separates content.
                </Text>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Horizontal</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222] gap-3')}>
                    <View style={applyTw('gap-1')}>
                        <Text style={applyTw('text-white font-medium')}>KROS UI</Text>
                        <Text style={applyTw('text-gray-400 text-sm')}>
                            An open-source component library for React Native.
                        </Text>
                    </View>
                    <Separator className="my-2" />
                    <View style={applyTw('flex-row items-center h-5 gap-2')}>
                        <Text style={applyTw('text-gray-300 text-sm')}>Blog</Text>
                        <Separator orientation="vertical" />
                        <Text style={applyTw('text-gray-300 text-sm')}>Docs</Text>
                        <Separator orientation="vertical" />
                        <Text style={applyTw('text-gray-300 text-sm')}>Source</Text>
                    </View>
                </View>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Vertical</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <View style={applyTw('flex-row items-center h-10 gap-4')}>
                        <Text style={applyTw('text-white text-sm')}>Left</Text>
                        <Separator orientation="vertical" />
                        <Text style={applyTw('text-white text-sm')}>Center</Text>
                        <Separator orientation="vertical" />
                        <Text style={applyTw('text-white text-sm')}>Right</Text>
                    </View>
                </View>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Custom Color</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222] gap-3')}>
                    <Separator className="bg-blue-600" />
                    <Separator className="bg-green-600" />
                    <Separator className="bg-red-600" />
                </View>
            </View>
        </ScrollView>
    );
};

export default Separator;
