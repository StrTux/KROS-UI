import React, { useState, useRef, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Pressable,
    Animated,
    PanResponder,
    Dimensions,
    ScrollView,
} from 'react-native';
import { applyTw } from '../../style/style';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base Drawer Component
export const Drawer = ({ visible, onClose, children, position = 'bottom' }) => {
    const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const translateX = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

    useEffect(() => {
        if (visible) {
            Animated.spring(position === 'bottom' || position === 'top' ? translateY : translateX, {
                toValue: 0,
                useNativeDriver: true,
                tension: 50,
                friction: 8,
            }).start();
        } else {
            Animated.timing(position === 'bottom' || position === 'top' ? translateY : translateX, {
                toValue: SCREEN_HEIGHT,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }
    }, [visible, position]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return Math.abs(gestureState.dy) > 5;
            },
            onPanResponderMove: (_, gestureState) => {
                if (position === 'bottom' && gestureState.dy > 0) {
                    translateY.setValue(gestureState.dy);
                } else if (position === 'top' && gestureState.dy < 0) {
                    translateY.setValue(-gestureState.dy);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 100 || gestureState.vy > 0.5) {
                    onClose();
                } else {
                    Animated.spring(translateY, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    const getDrawerStyle = () => {
        switch (position) {
            case 'bottom':
                return {
                    transform: [{ translateY }],
                    bottom: 0,
                    left: 0,
                    right: 0,
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                };
            case 'top':
                return {
                    transform: [{
                        translateY: translateY.interpolate({
                            inputRange: [0, SCREEN_HEIGHT],
                            outputRange: [0, -SCREEN_HEIGHT],
                        })
                    }],
                    top: 0,
                    left: 0,
                    right: 0,
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                };
            case 'left':
                return {
                    transform: [{
                        translateX: translateX.interpolate({
                            inputRange: [0, SCREEN_HEIGHT],
                            outputRange: [0, -SCREEN_HEIGHT],
                        })
                    }],
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '80%',
                    maxWidth: 400,
                };
            case 'right':
                return {
                    transform: [{ translateX }],
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: '80%',
                    maxWidth: 400,
                };
            default:
                return {};
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <Pressable
                style={applyTw('flex-1 bg-black/70')}
                onPress={onClose}
            >
                <Animated.View
                    style={[
                        applyTw('bg-[#1A1A1A] absolute'),
                        getDrawerStyle(),
                    ]}
                    {...(position === 'bottom' ? panResponder.panHandlers : {})}
                >
                    <Pressable onPress={(e) => e.stopPropagation()}>
                        {children}
                    </Pressable>
                </Animated.View>
            </Pressable>
        </Modal>
    );
};

// Drawer Handle (drag indicator)
export const DrawerHandle = () => {
    return (
        <View style={applyTw('items-center py-3')}>
            <View style={applyTw('w-12 h-1 bg-gray-600 rounded-full')} />
        </View>
    );
};

// Drawer Header
export const DrawerHeader = ({ children, className = '' }) => {
    return (
        <View style={applyTw(`px-6 py-4 border-b border-[#2A2A2A] ${className}`)}>
            {children}
        </View>
    );
};

// Drawer Title
export const DrawerTitle = ({ children, className = '' }) => {
    return (
        <Text style={applyTw(`text-white text-xl font-bold ${className}`)}>
            {children}
        </Text>
    );
};

// Drawer Description
export const DrawerDescription = ({ children, className = '' }) => {
    return (
        <Text style={applyTw(`text-gray-400 text-sm mt-1 ${className}`)}>
            {children}
        </Text>
    );
};

// Drawer Content
export const DrawerContent = ({ children, className = '', scrollable = true }) => {
    if (scrollable) {
        return (
            <ScrollView style={applyTw(`px-6 py-4 ${className}`)}>
                {children}
            </ScrollView>
        );
    }
    return (
        <View style={applyTw(`px-6 py-4 ${className}`)}>
            {children}
        </View>
    );
};

// Drawer Footer
export const DrawerFooter = ({ children, className = '' }) => {
    return (
        <View style={applyTw(`px-6 py-4 border-t border-[#2A2A2A] flex-row gap-3 ${className}`)}>
            {children}
        </View>
    );
};

// Drawer Button
export const DrawerButton = ({
    children,
    onPress,
    variant = 'primary',
    className = '',
}) => {
    const variantStyles = {
        primary: 'bg-blue-600 border-blue-500',
        secondary: 'bg-[#2A2A2A] border-[#3A3A3A]',
        outline: 'bg-transparent border-[#3A3A3A]',
    };

    return (
        <TouchableOpacity
            style={applyTw(
                `flex-1 py-3 px-4 rounded-xl border ${variantStyles[variant]} ${className}`
            )}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={applyTw('text-white text-center font-semibold text-base')}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

// ==================== DEMO COMPONENTS ====================

// 1. Bottom Drawer Demo
export const BottomDrawerDemo = () => {
    const [visible, setVisible] = useState(false);
    const [goal, setGoal] = useState(350);

    return (
        <View>
            <TouchableOpacity
                style={applyTw('bg-purple-600 py-3 px-6 rounded-xl border border-purple-500')}
                onPress={() => setVisible(true)}
                activeOpacity={0.8}
            >
                <Text style={applyTw('text-white text-center font-semibold text-base')}>
                    Open Bottom Drawer
                </Text>
            </TouchableOpacity>

            <Drawer visible={visible} onClose={() => setVisible(false)} position="bottom">
                <View style={applyTw('max-h-[80%]')}>
                    <DrawerHandle />
                    <DrawerHeader>
                        <DrawerTitle>Set Your Goal</DrawerTitle>
                        <DrawerDescription>
                            Adjust your daily activity goal using the controls below.
                        </DrawerDescription>
                    </DrawerHeader>

                    <DrawerContent scrollable={false}>
                        <View style={applyTw('items-center py-8')}>
                            <Text style={applyTw('text-white text-6xl font-bold')}>
                                {goal}
                            </Text>
                            <Text style={applyTw('text-gray-400 text-sm mt-2 uppercase tracking-wide')}>
                                Calories/day
                            </Text>

                            <View style={applyTw('flex-row gap-4 mt-8')}>
                                <TouchableOpacity
                                    style={applyTw('bg-[#2A2A2A] w-12 h-12 rounded-full items-center justify-center border border-[#3A3A3A]')}
                                    onPress={() => setGoal(Math.max(200, goal - 10))}
                                    activeOpacity={0.7}
                                >
                                    <Text style={applyTw('text-white text-2xl')}>−</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={applyTw('bg-[#2A2A2A] w-12 h-12 rounded-full items-center justify-center border border-[#3A3A3A]')}
                                    onPress={() => setGoal(Math.min(400, goal + 10))}
                                    activeOpacity={0.7}
                                >
                                    <Text style={applyTw('text-white text-2xl')}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </DrawerContent>

                    <DrawerFooter>
                        <DrawerButton variant="primary" onPress={() => setVisible(false)}>
                            Submit
                        </DrawerButton>
                        <DrawerButton variant="outline" onPress={() => setVisible(false)}>
                            Cancel
                        </DrawerButton>
                    </DrawerFooter>
                </View>
            </Drawer>
        </View>
    );
};

// 2. Side Drawer Demo (Right)
export const SideDrawerDemo = () => {
    const [visible, setVisible] = useState(false);

    const menuItems = [
        { id: 1, title: 'Profile', icon: '👤' },
        { id: 2, title: 'Settings', icon: '⚙️' },
        { id: 3, title: 'Notifications', icon: '🔔' },
        { id: 4, title: 'Help & Support', icon: '❓' },
        { id: 5, title: 'About', icon: 'ℹ️' },
    ];

    return (
        <View>
            <TouchableOpacity
                style={applyTw('bg-indigo-600 py-3 px-6 rounded-xl border border-indigo-500')}
                onPress={() => setVisible(true)}
                activeOpacity={0.8}
            >
                <Text style={applyTw('text-white text-center font-semibold text-base')}>
                    Open Side Drawer
                </Text>
            </TouchableOpacity>

            <Drawer visible={visible} onClose={() => setVisible(false)} position="right">
                <DrawerHeader>
                    <DrawerTitle>Menu</DrawerTitle>
                    <DrawerDescription>Navigate to different sections</DrawerDescription>
                </DrawerHeader>

                <DrawerContent>
                    {menuItems.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={applyTw('flex-row items-center py-4 border-b border-[#2A2A2A]')}
                            onPress={() => setVisible(false)}
                            activeOpacity={0.7}
                        >
                            <Text style={applyTw('text-2xl mr-4')}>{item.icon}</Text>
                            <Text style={applyTw('text-white text-base font-medium')}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </DrawerContent>

                <DrawerFooter>
                    <DrawerButton variant="outline" onPress={() => setVisible(false)}>
                        Close
                    </DrawerButton>
                </DrawerFooter>
            </Drawer>
        </View>
    );
};

// 3. Confirmation Drawer Demo
export const ConfirmDrawerDemo = () => {
    const [visible, setVisible] = useState(false);

    const handleConfirm = () => {
        setVisible(false);
        // Handle confirmation logic
    };

    return (
        <View>
            <TouchableOpacity
                style={applyTw('bg-red-600 py-3 px-6 rounded-xl border border-red-500')}
                onPress={() => setVisible(true)}
                activeOpacity={0.8}
            >
                <Text style={applyTw('text-white text-center font-semibold text-base')}>
                    Delete Item
                </Text>
            </TouchableOpacity>

            <Drawer visible={visible} onClose={() => setVisible(false)} position="bottom">
                <View>
                    <DrawerHandle />
                    <DrawerHeader>
                        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                        <DrawerDescription>
                            This action cannot be undone. This will permanently delete your data from our servers.
                        </DrawerDescription>
                    </DrawerHeader>

                    <DrawerFooter>
                        <DrawerButton variant="primary" onPress={handleConfirm}>
                            Confirm Delete
                        </DrawerButton>
                        <DrawerButton variant="outline" onPress={() => setVisible(false)}>
                            Cancel
                        </DrawerButton>
                    </DrawerFooter>
                </View>
            </Drawer>
        </View>
    );
};

// Main Demo Component
export const DrawerDemo = () => {
    return (
        <View style={applyTw('gap-4')}>
            <BottomDrawerDemo />
            <SideDrawerDemo />
            <ConfirmDrawerDemo />
        </View>
    );
};

export default DrawerDemo;
