import React from 'react';
import { View, ScrollView } from 'react-native';
import { applyTw } from '../../style/_elst';
import { Text } from './text';

/**
 * Kbd — renders a keyboard key / shortcut hint.
 *
 * @param {string} className - Additional applyTw classes
 */
export const Kbd = ({ children, className = '' }) => (
    <View
        style={applyTw(
            `h-6 min-w-[24px] px-1.5 items-center justify-center rounded border border-[#3A3A3A] bg-[#1a1a1a] ${className}`
        )}
    >
        <Text style={applyTw('text-gray-200 text-xs font-medium')}>{children}</Text>
    </View>
);

/**
 * KbdGroup — lays out a sequence of Kbd keys (e.g. "Ctrl" + "K").
 */
export const KbdGroup = ({ children, className = '' }) => (
    <View style={applyTw(`flex-row items-center gap-1 ${className}`)}>{children}</View>
);

// ==================== DEMO COMPONENT ====================

export const KbdDemo = () => {
    return (
        <ScrollView style={applyTw('flex-1')} contentContainerStyle={applyTw('p-5 gap-8 pb-20')}>
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Kbd</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    Displays keyboard shortcuts and key combinations.
                </Text>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Single Key</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222] flex-row gap-2')}>
                    <Kbd>Esc</Kbd>
                    <Kbd>Enter</Kbd>
                    <Kbd>Tab</Kbd>
                </View>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Combinations</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222] gap-3')}>
                    <View style={applyTw('flex-row items-center justify-between')}>
                        <Text style={applyTw('text-gray-300 text-sm')}>Command palette</Text>
                        <KbdGroup>
                            <Kbd>Ctrl</Kbd>
                            <Kbd>K</Kbd>
                        </KbdGroup>
                    </View>
                    <View style={applyTw('flex-row items-center justify-between')}>
                        <Text style={applyTw('text-gray-300 text-sm')}>Save</Text>
                        <KbdGroup>
                            <Kbd>Ctrl</Kbd>
                            <Kbd>S</Kbd>
                        </KbdGroup>
                    </View>
                    <View style={applyTw('flex-row items-center justify-between')}>
                        <Text style={applyTw('text-gray-300 text-sm')}>Undo</Text>
                        <KbdGroup>
                            <Kbd>Ctrl</Kbd>
                            <Kbd>Shift</Kbd>
                            <Kbd>Z</Kbd>
                        </KbdGroup>
                    </View>
                </View>
            </View>

            <View style={applyTw('gap-4 mb-8')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Inline with Text</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <View style={applyTw('flex-row items-center flex-wrap gap-1')}>
                        <Text style={applyTw('text-gray-300 text-sm')}>Press</Text>
                        <Kbd>⌘</Kbd>
                        <Kbd>P</Kbd>
                        <Text style={applyTw('text-gray-300 text-sm')}>to open quick search.</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default Kbd;
