// ==================== SWITCH ====================

import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { applyTw } from '../../style/style';
import { Text } from './text';
import { Label } from './label';

/**
 * Switch Component for React Native
 * Animated toggle switch with controlled/uncontrolled modes
 */

export const Switch = ({
    checked = false,
    onCheckedChange,
    disabled = false,
    className = '',
    id,
    ...props
}) => {
    const [isChecked, setIsChecked] = useState(checked);
    const animatedValue = useRef(new Animated.Value(checked ? 1 : 0)).current;

    // Sync with controlled prop
    useEffect(() => {
        setIsChecked(checked);
        Animated.spring(animatedValue, {
            toValue: checked ? 1 : 0,
            useNativeDriver: true,
            tension: 50,
            friction: 7,
        }).start();
    }, [checked]);

    const handleToggle = () => {
        if (disabled) return;

        const newValue = !isChecked;
        setIsChecked(newValue);

        Animated.spring(animatedValue, {
            toValue: newValue ? 1 : 0,
            useNativeDriver: true,
            tension: 50,
            friction: 7,
        }).start();

        if (onCheckedChange) {
            onCheckedChange(newValue);
        }
    };

    const thumbTranslateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 14], // 32px track - 18px thumb = 14px travel
    });

    const trackColor = isChecked ? '#FFFFFF' : '#3F3F46';
    const thumbColor = isChecked ? '#18181B' : '#FFFFFF';

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleToggle}
            disabled={disabled}
            style={[
                applyTw(`w-8 h-[18px] rounded-full p-[2px] ${disabled ? 'opacity-50' : ''}`),
                { backgroundColor: trackColor }
            ]}
            {...props}
        >
            <Animated.View
                style={[
                    applyTw('w-[14px] h-[14px] rounded-full'),
                    {
                        backgroundColor: thumbColor,
                        transform: [{ translateX: thumbTranslateX }],
                    }
                ]}
            />
        </TouchableOpacity>
    );
};

// ==================== SWITCH DEMO ====================

export const SwitchDemo = () => {
    const [airplaneMode, setAirplaneMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [marketing, setMarketing] = useState(false);

    return (
        <ScrollView
            style={applyTw('flex-1')}
            contentContainerStyle={applyTw('p-5 gap-8 pb-20')}
        >
            {/* Header */}
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Switch</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    A control that allows users to toggle between checked and unchecked states.
                </Text>
            </View>

            {/* Basic Example */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Basic</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <View style={applyTw('flex-row items-center gap-2')}>
                        <Switch id="airplane-mode" checked={airplaneMode} onCheckedChange={setAirplaneMode} />
                        <Label className="mb-0">Airplane Mode</Label>
                    </View>
                </View>
            </View>

            {/* Settings Example */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Settings</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222] gap-4')}>
                    {/* Notifications */}
                    <View style={applyTw('flex-row items-center justify-between')}>
                        <View style={applyTw('flex-1')}>
                            <Text style={applyTw('text-white font-medium')}>Push Notifications</Text>
                            <Text style={applyTw('text-gray-400 text-sm')}>Receive notifications on this device</Text>
                        </View>
                        <Switch checked={notifications} onCheckedChange={setNotifications} />
                    </View>

                    {/* Divider */}
                    <View style={applyTw('h-[1px] bg-[#333]')} />

                    {/* Marketing */}
                    <View style={applyTw('flex-row items-center justify-between')}>
                        <View style={applyTw('flex-1')}>
                            <Text style={applyTw('text-white font-medium')}>Marketing Emails</Text>
                            <Text style={applyTw('text-gray-400 text-sm')}>Receive emails about new products</Text>
                        </View>
                        <Switch checked={marketing} onCheckedChange={setMarketing} />
                    </View>
                </View>
            </View>

            {/* Disabled */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Disabled</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <View style={applyTw('flex-row items-center gap-2')}>
                        <Switch disabled checked={false} />
                        <Label className="mb-0 opacity-50">Disabled Off</Label>
                    </View>
                    <View style={applyTw('flex-row items-center gap-2 mt-3')}>
                        <Switch disabled checked={true} />
                        <Label className="mb-0 opacity-50">Disabled On</Label>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default Switch;
