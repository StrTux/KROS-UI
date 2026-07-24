import React, { useRef, useEffect, useState } from 'react';
import {
    Modal,
    View,
    TouchableOpacity,
    Pressable,
    Animated,
    Dimensions,
    ScrollView,
} from 'react-native';
import { applyTw } from '../../style/_elst';
import { Text } from './text';
import { Button } from './button';
import { renderFlaticon } from '../../functions/iconUtils';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * Sheet — a panel that slides in from an edge of the screen, used for
 * supplementary content (filters, settings, forms) without leaving the page.
 *
 * @param {boolean} visible
 * @param {function} onClose
 * @param {string} side - 'right' | 'left' | 'top' | 'bottom'
 */
export const Sheet = ({ visible, onClose, side = 'right', children }) => {
    const isVertical = side === 'top' || side === 'bottom';
    const offscreen = isVertical ? SCREEN_HEIGHT : SCREEN_WIDTH;
    const anim = useRef(new Animated.Value(offscreen)).current;

    useEffect(() => {
        Animated.timing(anim, {
            toValue: visible ? 0 : offscreen,
            duration: visible ? 280 : 220,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    const getPositionStyle = () => {
        switch (side) {
            case 'left':
                return { left: 0, top: 0, bottom: 0, width: '82%', maxWidth: 380, transform: [{ translateX: anim.interpolate({ inputRange: [0, offscreen], outputRange: [0, -offscreen] }) }] };
            case 'top':
                return { top: 0, left: 0, right: 0, height: '50%', transform: [{ translateY: anim.interpolate({ inputRange: [0, offscreen], outputRange: [0, -offscreen] }) }] };
            case 'bottom':
                return { bottom: 0, left: 0, right: 0, height: '50%', transform: [{ translateY: anim }] };
            case 'right':
            default:
                return { right: 0, top: 0, bottom: 0, width: '82%', maxWidth: 380, transform: [{ translateX: anim }] };
        }
    };

    return (
        <Modal visible={visible} transparent animationType="fade" statusBarTranslucent onRequestClose={onClose}>
            <Pressable style={applyTw('flex-1 bg-black/70')} onPress={onClose}>
                <Animated.View
                    style={[applyTw('absolute bg-[#0d0d0d] border-[#222]'), getPositionStyle()]}
                >
                    <Pressable onPress={(e) => e.stopPropagation()} style={applyTw('flex-1')}>
                        {children}
                    </Pressable>
                </Animated.View>
            </Pressable>
        </Modal>
    );
};

export const SheetHeader = ({ children, onClose, className = '' }) => (
    <View style={applyTw(`px-5 pt-5 pb-4 border-b border-[#2A2A2A] flex-row items-start justify-between ${className}`)}>
        <View style={applyTw('flex-1 gap-1')}>{children}</View>
        {onClose && (
            <TouchableOpacity onPress={onClose} activeOpacity={0.7} style={applyTw('p-1 -mt-1 -mr-1')}>
                {renderFlaticon('fi fi-rr-cross-small', { size: 18, color: '#9ca3af' })}
            </TouchableOpacity>
        )}
    </View>
);

export const SheetTitle = ({ children }) => (
    <Text style={applyTw('text-white text-lg font-bold')}>{children}</Text>
);

export const SheetDescription = ({ children }) => (
    <Text style={applyTw('text-gray-400 text-sm')}>{children}</Text>
);

export const SheetContent = ({ children, scrollable = true, className = '' }) =>
    scrollable ? (
        <ScrollView style={applyTw('flex-1')} contentContainerStyle={applyTw(`px-5 py-4 ${className}`)}>
            {children}
        </ScrollView>
    ) : (
        <View style={applyTw(`flex-1 px-5 py-4 ${className}`)}>{children}</View>
    );

export const SheetFooter = ({ children, className = '' }) => (
    <View style={applyTw(`px-5 py-4 border-t border-[#2A2A2A] flex-row gap-3 ${className}`)}>{children}</View>
);

// ==================== DEMO COMPONENT ====================

export const SheetDemo = () => {
    const [rightOpen, setRightOpen] = useState(false);
    const [bottomOpen, setBottomOpen] = useState(false);

    return (
        <View style={applyTw('gap-8')}>
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Sheet</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    A supplementary panel that slides in from the edge of the screen.
                </Text>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Edit Profile (right)</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <Button variant="outline" onPress={() => setRightOpen(true)}>Open Sheet</Button>
                </View>
            </View>

            <View style={applyTw('gap-4 mb-8')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Filters (bottom)</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <Button variant="outline" onPress={() => setBottomOpen(true)}>Open Filters</Button>
                </View>
            </View>

            <Sheet visible={rightOpen} onClose={() => setRightOpen(false)} side="right">
                <SheetHeader onClose={() => setRightOpen(false)}>
                    <SheetTitle>Edit Profile</SheetTitle>
                    <SheetDescription>Make changes to your profile here.</SheetDescription>
                </SheetHeader>
                <SheetContent>
                    <View style={applyTw('gap-4')}>
                        <View style={applyTw('gap-1.5')}>
                            <Text style={applyTw('text-gray-300 text-xs font-medium')}>Name</Text>
                            <View style={applyTw('h-10 rounded-md border border-[#2A2A2A] bg-[#161616] px-3 justify-center')}>
                                <Text style={applyTw('text-white text-sm')}>Sofia Sharma</Text>
                            </View>
                        </View>
                        <View style={applyTw('gap-1.5')}>
                            <Text style={applyTw('text-gray-300 text-xs font-medium')}>Username</Text>
                            <View style={applyTw('h-10 rounded-md border border-[#2A2A2A] bg-[#161616] px-3 justify-center')}>
                                <Text style={applyTw('text-white text-sm')}>@sofia</Text>
                            </View>
                        </View>
                    </View>
                </SheetContent>
                <SheetFooter>
                    <Button className="flex-1" onPress={() => setRightOpen(false)}>Save changes</Button>
                </SheetFooter>
            </Sheet>

            <Sheet visible={bottomOpen} onClose={() => setBottomOpen(false)} side="bottom">
                <SheetHeader onClose={() => setBottomOpen(false)}>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Narrow down results.</SheetDescription>
                </SheetHeader>
                <SheetContent scrollable={false}>
                    <Text style={applyTw('text-gray-400 text-sm')}>Filter controls go here.</Text>
                </SheetContent>
                <SheetFooter>
                    <Button variant="outline" className="flex-1" onPress={() => setBottomOpen(false)}>Cancel</Button>
                    <Button className="flex-1" onPress={() => setBottomOpen(false)}>Apply</Button>
                </SheetFooter>
            </Sheet>
        </View>
    );
};

export default Sheet;
