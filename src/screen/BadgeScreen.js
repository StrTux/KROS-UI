import React from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { applyTw } from '../style/style';
import { Badge } from '../components/ui/badge';
import { Text } from '../components/ui/text';

/**
 * BadgeScreen Component
 * Demonstrates all badge variants and use cases
 */

const BadgeScreen = () => {
    // Icon Components
    const CheckIcon = () => (
        <Text className="text-white text-xs">✓</Text>
    );

    return (
        <SafeAreaView style={applyTw('flex-1 bg-black')}>
            <ScrollView
                style={applyTw('flex-1')}
                contentContainerStyle={applyTw('px-5 py-6')}
            >
                <View style={applyTw('gap-8')}>
                    {/* Header */}
                    <View style={applyTw('gap-2')}>
                        <Text className="text-white text-3xl font-bold">Badge Component</Text>
                        <Text className="text-gray-400 text-base">
                            Display badges with different variants, sizes, and styles
                        </Text>
                    </View>

                    {/* Main Badge Variants Row (matching uploaded image) */}
                    <View style={applyTw('gap-4')}>
                        <Text className="text-white text-xl font-semibold">Primary Variants</Text>
                        <View style={applyTw('flex-row flex-wrap gap-3')}>
                            <Badge variant="default">Badge</Badge>
                            <Badge variant="secondary">Secondary</Badge>
                            <Badge variant="destructive">Destructive</Badge>
                            <Badge variant="outline">Outline</Badge>
                        </View>
                    </View>

                    {/* Icon Badges Row (matching uploaded image) */}
                    <View style={applyTw('gap-4')}>
                        <Text className="text-white text-xl font-semibold">With Icons</Text>
                        <View style={applyTw('flex-row flex-wrap gap-3')}>
                            <Badge variant="info" icon={<CheckIcon />} rounded>
                                Verified
                            </Badge>
                            <Badge variant="secondary" rounded size="sm">
                                8
                            </Badge>
                            <Badge variant="destructive" rounded size="md">
                                99
                            </Badge>
                            <Badge variant="outline" rounded>
                                20+
                            </Badge>
                        </View>
                    </View>

                    {/* All Variants */}
                    <View style={applyTw('gap-4')}>
                        <Text className="text-white text-xl font-semibold">All Variants</Text>
                        <View style={applyTw('flex-row flex-wrap gap-3')}>
                            <Badge variant="default">Default</Badge>
                            <Badge variant="secondary">Secondary</Badge>
                            <Badge variant="destructive">Destructive</Badge>
                            <Badge variant="outline">Outline</Badge>
                            <Badge variant="success">Success</Badge>
                            <Badge variant="warning">Warning</Badge>
                            <Badge variant="info">Info</Badge>
                        </View>
                    </View>

                    {/* Sizes */}
                    <View style={applyTw('gap-4')}>
                        <Text className="text-white text-xl font-semibold">Sizes</Text>
                        <View style={applyTw('flex-row items-center flex-wrap gap-3')}>
                            <Badge variant="secondary" size="sm">Small</Badge>
                            <Badge variant="secondary" size="md">Medium</Badge>
                            <Badge variant="secondary" size="lg">Large</Badge>
                        </View>
                    </View>

                    {/* Rounded Badges */}
                    <View style={applyTw('gap-4')}>
                        <Text className="text-white text-xl font-semibold">Rounded (Pills)</Text>
                        <View style={applyTw('flex-row flex-wrap gap-3')}>
                            <Badge variant="default" rounded>Default Pill</Badge>
                            <Badge variant="secondary" rounded>Secondary Pill</Badge>
                            <Badge variant="destructive" rounded>Destructive Pill</Badge>
                            <Badge variant="success" rounded>Success Pill</Badge>
                        </View>
                    </View>

                    {/* Count Badges */}
                    <View style={applyTw('gap-4')}>
                        <Text className="text-white text-xl font-semibold">Count Badges</Text>
                        <View style={applyTw('flex-row flex-wrap gap-3')}>
                            <Badge variant="destructive" rounded size="sm">1</Badge>
                            <Badge variant="destructive" rounded size="sm">5</Badge>
                            <Badge variant="secondary" rounded size="md">12</Badge>
                            <Badge variant="secondary" rounded size="md">99</Badge>
                            <Badge variant="outline" rounded>99+</Badge>
                            <Badge variant="outline" rounded>1.5k</Badge>
                        </View>
                    </View>

                    {/* Status Badges */}
                    <View style={applyTw('gap-4')}>
                        <Text className="text-white text-xl font-semibold">Status Badges</Text>
                        <View style={applyTw('flex-row flex-wrap gap-3')}>
                            <Badge variant="success" icon={<CheckIcon />} rounded>
                                Active
                            </Badge>
                            <Badge variant="warning" rounded>
                                Pending
                            </Badge>
                            <Badge variant="destructive" rounded>
                                Inactive
                            </Badge>
                            <Badge variant="info" rounded>
                                In Progress
                            </Badge>
                        </View>
                    </View>

                    {/* Use Cases */}
                    <View style={applyTw('gap-4')}>
                        <Text className="text-white text-xl font-semibold">Use Cases</Text>

                        {/* User Profile Badge */}
                        <View style={applyTw('bg-gray-900 rounded-lg p-4 gap-3')}>
                            <View style={applyTw('flex-row items-center gap-3')}>
                                <Text className="text-white text-lg font-medium">John Doe</Text>
                                <Badge variant="info" size="sm" rounded icon={<CheckIcon />}>
                                    Verified
                                </Badge>
                            </View>
                            <Text className="text-gray-400">
                                Premium user with verified account status
                            </Text>
                        </View>

                        {/* Notification Badge */}
                        <View style={applyTw('bg-gray-900 rounded-lg p-4 gap-3')}>
                            <View style={applyTw('flex-row items-center justify-between')}>
                                <Text className="text-white text-lg font-medium">Messages</Text>
                                <Badge variant="destructive" size="sm" rounded>
                                    5
                                </Badge>
                            </View>
                            <Text className="text-gray-400">
                                You have 5 unread messages
                            </Text>
                        </View>

                        {/* Tag/Category Badge */}
                        <View style={applyTw('bg-gray-900 rounded-lg p-4 gap-3')}>
                            <Text className="text-white text-lg font-medium mb-2">Article Tags</Text>
                            <View style={applyTw('flex-row flex-wrap gap-2')}>
                                <Badge variant="secondary" size="sm">React Native</Badge>
                                <Badge variant="secondary" size="sm">JavaScript</Badge>
                                <Badge variant="secondary" size="sm">Mobile Dev</Badge>
                                <Badge variant="outline" size="sm">UI/UX</Badge>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default BadgeScreen;
