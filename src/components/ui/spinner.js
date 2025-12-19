// ==================== SPINNER ====================

import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, ScrollView, TextInput } from 'react-native';
import { applyTw } from '../../style/style';
import { Text } from './text';
import { Button } from './button';
import { Card, CardHeader, CardContent, CardFooter } from './card';
import { Badge } from './badge';
import { Progress } from './progress';
import { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemFooter } from './item';
import { renderFlaticon } from '../../functions/iconUtils';

/**
 * Spinner Component for React Native
 * Simple animated loading indicator
 */

export const Spinner = ({
    size = 16,
    color = '#3b82f6',
    className = '',
    ...props
}) => {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Animated.View
            style={[
                {
                    width: size,
                    height: size,
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: [{ rotate: spin }],
                },
                applyTw(className)
            ]}
            {...props}
        >
            <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
                {renderFlaticon('fi-rr-loading', { size, color })}
            </View>
        </Animated.View>
    );
};

// ==================== SPINNER DEMO ====================
export const SpinnerDemo = () => {
    return (
        <ScrollView
            style={applyTw('flex-1 bg-black')}
            contentContainerStyle={applyTw('p-5 gap-12 pb-20')}
        >
            {/* Header */}
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Spinner</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    A simple animated loading indicator for various use cases.
                </Text>
            </View>

            {/* Size */}
            <View style={applyTw('gap-4')}>
                <View style={applyTw('gap-1')}>
                    <Text style={applyTw('text-white text-xl font-semibold')}>Size</Text>
                    <Text style={applyTw('text-gray-400 text-sm')}>
                        Use the size prop to change the size of the spinner.
                    </Text>
                </View>
                <View style={applyTw('bg-[#0a0a0a] p-12 rounded-xl border border-[#27272a]')}>
                    <View style={applyTw('flex-row gap-8 items-center justify-center')}>
                        <Spinner size={16} />
                        <Spinner size={20} />
                        <Spinner size={28} />
                        <Spinner size={36} />
                    </View>
                </View>
            </View>

            {/* Badge */}
            <View style={applyTw('gap-4')}>
                <View style={applyTw('gap-1')}>
                    <Text style={applyTw('text-white text-xl font-semibold')}>Badge</Text>
                    <Text style={applyTw('text-gray-400 text-sm')}>
                        You can also use a spinner inside a badge.
                    </Text>
                </View>
                <View style={applyTw('bg-[#0a0a0a] p-12 rounded-xl border border-[#27272a]')}>
                    <View style={applyTw('flex-row gap-4 flex-wrap justify-center')}>
                        <View style={applyTw('bg-white px-3 py-1.5 rounded-full flex-row items-center gap-2')}>
                            <Spinner size={14} color="#000" />
                            <Text style={applyTw('text-black text-sm font-medium')}>Syncing</Text>
                        </View>
                        <View style={applyTw('bg-[#27272a] px-3 py-1.5 rounded-full flex-row items-center gap-2')}>
                            <Spinner size={14} color="#fff" />
                            <Text style={applyTw('text-white text-sm font-medium')}>Updating</Text>
                        </View>
                        <View style={applyTw('bg-transparent border border-[#3f3f46] px-3 py-1.5 rounded-full flex-row items-center gap-2')}>
                            <Spinner size={14} color="#9ca3af" />
                            <Text style={applyTw('text-gray-400 text-sm font-medium')}>Processing</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Input Group */}
            <View style={applyTw('gap-4')}>
                <View style={applyTw('gap-1')}>
                    <Text style={applyTw('text-white text-xl font-semibold')}>Input Group</Text>
                    <Text style={applyTw('text-gray-400 text-sm')}>
                        Input Group can have spinners inside.
                    </Text>
                </View>
                <View style={applyTw('bg-[#0a0a0a] p-8 rounded-xl border border-[#27272a] gap-4')}>
                    {/* Input with spinner on right */}
                    <View style={applyTw('bg-[#18181b] border border-[#27272a] rounded-lg px-4 py-3 flex-row items-center')}>
                        <TextInput
                            placeholder="Send a message..."
                            placeholderTextColor="#52525b"
                            style={applyTw('flex-1 text-white text-base')}
                            editable={false}
                        />
                        <Spinner size={16} />
                    </View>

                    {/* Textarea with spinner and button */}
                    <View style={applyTw('bg-[#18181b] border border-[#27272a] rounded-lg overflow-hidden')}>
                        <TextInput
                            placeholder="Send a message..."
                            placeholderTextColor="#52525b"
                            multiline
                            numberOfLines={3}
                            style={applyTw('text-white text-base px-4 py-3')}
                            editable={false}
                        />
                        <View style={applyTw('flex-row items-center justify-between px-4 py-2 border-t border-[#27272a]')}>
                            <View style={applyTw('flex-row items-center gap-2')}>
                                <Spinner size={14} />
                                <Text style={applyTw('text-gray-400 text-sm')}>Validating...</Text>
                            </View>
                            <View style={applyTw('bg-white w-8 h-8 rounded-lg items-center justify-center')}>
                                {renderFlaticon('fi-rr-arrow-up', { size: 16, color: '#000' })}
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            {/* Empty State */}
            <View style={applyTw('gap-4')}>
                <View style={applyTw('gap-1')}>
                    <Text style={applyTw('text-white text-xl font-semibold')}>Empty State</Text>
                    <Text style={applyTw('text-gray-400 text-sm')}>
                        Use spinner in empty states to show loading.
                    </Text>
                </View>
                <View style={applyTw('bg-[#0a0a0a] p-12 rounded-xl border border-[#27272a]')}>
                    <View style={applyTw('items-center gap-6')}>
                        <View style={applyTw('bg-[#18181b] w-16 h-16 rounded-2xl items-center justify-center')}>
                            <Spinner size={28} color="#fff" />
                        </View>
                        <View style={applyTw('items-center gap-2')}>
                            <Text style={applyTw('text-white text-lg font-semibold')}>Processing your request</Text>
                            <Text style={applyTw('text-gray-400 text-sm text-center')}>
                                Please wait while we process your request. Do not refresh the page.
                            </Text>
                        </View>
                        <Button variant="outline" size="sm">
                            Cancel
                        </Button>
                    </View>
                </View>
            </View>

            {/* Download Item */}
            <View style={applyTw('gap-4')}>
                <View style={applyTw('gap-1')}>
                    <Text style={applyTw('text-white text-xl font-semibold')}>Item</Text>
                    <Text style={applyTw('text-gray-400 text-sm')}>
                        Use spinner with items to show progress.
                    </Text>
                </View>
                <View style={applyTw('bg-[#0a0a0a] p-6 rounded-xl border border-[#27272a]')}>
                    <View style={applyTw('bg-[#18181b] border border-[#27272a] rounded-xl p-4 gap-3')}>
                        <View style={applyTw('flex-row items-center justify-between')}>
                            <View style={applyTw('flex-row items-center gap-3 flex-1')}>
                                <View style={applyTw('bg-[#27272a] w-10 h-10 rounded-full items-center justify-center')}>
                                    <Spinner size={20} color="#fff" />
                                </View>
                                <View style={applyTw('flex-1')}>
                                    <Text style={applyTw('text-white font-medium')}>Downloading...</Text>
                                    <Text style={applyTw('text-gray-400 text-sm')}>129 MB / 1000 MB</Text>
                                </View>
                            </View>
                            <Button variant="outline" size="sm">
                                Cancel
                            </Button>
                        </View>
                        <Progress value={13} />
                    </View>
                </View>
            </View>

            {/* Button States */}
            <View style={applyTw('gap-4')}>
                <View style={applyTw('gap-1')}>
                    <Text style={applyTw('text-white text-xl font-semibold')}>Button</Text>
                    <Text style={applyTw('text-gray-400 text-sm')}>
                        Show loading state in buttons.
                    </Text>
                </View>
                <View style={applyTw('bg-[#0a0a0a] p-8 rounded-xl border border-[#27272a] gap-3')}>
                    <Button disabled size="sm">
                        <View style={applyTw('flex-row items-center gap-2')}>
                            <Spinner size={14} color="#fff" />
                            <Text style={applyTw('text-white text-sm font-medium')}>Loading...</Text>
                        </View>
                    </Button>
                    <Button variant="outline" disabled size="sm">
                        <View style={applyTw('flex-row items-center gap-2')}>
                            <Spinner size={14} color="#9ca3af" />
                            <Text style={applyTw('text-gray-400 text-sm font-medium')}>Please wait</Text>
                        </View>
                    </Button>
                    <Button variant="secondary" disabled size="sm">
                        <View style={applyTw('flex-row items-center gap-2')}>
                            <Spinner size={14} color="#fff" />
                            <Text style={applyTw('text-white text-sm font-medium')}>Processing</Text>
                        </View>
                    </Button>
                </View>
            </View>

            {/* Card Loading */}
            <View style={applyTw('gap-4')}>
                <View style={applyTw('gap-1')}>
                    <Text style={applyTw('text-white text-xl font-semibold')}>Card</Text>
                    <Text style={applyTw('text-gray-400 text-sm')}>
                        Show loading state in cards.
                    </Text>
                </View>
                <Card>
                    <CardHeader>
                        <View style={applyTw('flex-row items-center gap-3')}>
                            <Spinner size={20} />
                            <Text style={applyTw('text-white text-lg font-semibold')}>Loading Data</Text>
                        </View>
                    </CardHeader>
                    <CardContent>
                        <Text style={applyTw('text-gray-400')}>
                            Fetching your data from the server. This may take a few moments.
                        </Text>
                    </CardContent>
                    <CardFooter>
                        <Button variant="ghost" size="sm">Cancel</Button>
                    </CardFooter>
                </Card>
            </View>
        </ScrollView>
    );
};

export default Spinner;
