import React, { createContext, useContext, useState, useRef } from 'react';
import {
    View,
    TouchableOpacity,
    Modal,
    Pressable,
    Dimensions,
    ScrollView,
} from 'react-native';
import { applyTw } from '../../style/_elst';
import { Text } from './text';
import { Button } from './button';
import { renderFlaticon } from '../../functions/iconUtils';

const TooltipContext = createContext(null);

/**
 * Tooltip — a popup that displays information related to an element
 * when the element is long-pressed (mobile equivalent of hover).
 */
export const Tooltip = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [triggerLayout, setTriggerLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const triggerRef = useRef(null);

    const show = () => {
        if (triggerRef.current) {
            triggerRef.current.measureInWindow((x, y, width, height) => {
                setTriggerLayout({ x, y, width, height });
                setVisible(true);
            });
        }
    };

    const hide = () => setVisible(false);

    return (
        <TooltipContext.Provider value={{ visible, show, hide, triggerLayout, triggerRef }}>
            {children}
        </TooltipContext.Provider>
    );
};

/**
 * TooltipTrigger — wrap the element that should show a tooltip on long-press.
 */
export const TooltipTrigger = ({ children, asChild, className = '' }) => {
    const { show, hide, triggerRef } = useContext(TooltipContext);

    if (asChild) {
        return (
            <View ref={triggerRef} collapsable={false} style={applyTw(`self-start ${className}`)}>
                {React.cloneElement(children, {
                    onLongPress: show,
                    onPressOut: hide,
                    delayLongPress: 200,
                })}
            </View>
        );
    }

    return (
        <TouchableOpacity
            ref={triggerRef}
            onLongPress={show}
            onPressOut={hide}
            delayLongPress={200}
            activeOpacity={0.7}
            style={applyTw(`self-start ${className}`)}
        >
            {children}
        </TouchableOpacity>
    );
};

/**
 * TooltipContent — the floating label shown above/below the trigger.
 */
export const TooltipContent = ({ children, className = '', side = 'top' }) => {
    const { visible, triggerLayout } = useContext(TooltipContext);
    const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

    if (!visible) return null;

    const estimatedWidth = 160;
    let left = triggerLayout.x + triggerLayout.width / 2 - estimatedWidth / 2;
    if (left < 8) left = 8;
    if (left + estimatedWidth > screenWidth - 8) left = screenWidth - estimatedWidth - 8;

    const top =
        side === 'bottom'
            ? triggerLayout.y + triggerLayout.height + 8
            : triggerLayout.y - 40;

    return (
        <Modal visible={visible} transparent animationType="fade">
            <Pressable style={applyTw('flex-1')} pointerEvents="none">
                <View
                    style={[
                        applyTw(`absolute bg-[#f4f4f5] rounded-md px-3 py-1.5 ${className}`),
                        {
                            top,
                            left,
                            maxWidth: estimatedWidth + 40,
                            zIndex: 1000,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 8,
                        },
                    ]}
                >
                    {typeof children === 'string' ? (
                        <Text style={applyTw('text-black text-xs font-medium')}>{children}</Text>
                    ) : (
                        children
                    )}
                </View>
            </Pressable>
        </Modal>
    );
};

// ==================== DEMO COMPONENT ====================

export const TooltipDemo = () => {
    return (
        <ScrollView style={applyTw('flex-1')} contentContainerStyle={applyTw('p-5 gap-8 pb-20')}>
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Tooltip</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    A popup that displays information on long-press.
                </Text>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Basic</Text>
                <View style={applyTw('bg-[#111] p-8 items-center rounded-lg border border-[#222]')}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline">Long press me</Button>
                        </TooltipTrigger>
                        <TooltipContent>Add to library</TooltipContent>
                    </Tooltip>
                </View>
            </View>

            <View style={applyTw('gap-4 mb-8')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Icon Buttons</Text>
                <View style={applyTw('bg-[#111] p-8 flex-row justify-center gap-6 rounded-lg border border-[#222]')}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <TouchableOpacity
                                style={applyTw('w-11 h-11 rounded-full bg-[#1f1f1f] items-center justify-center border border-[#2A2A2A]')}
                                activeOpacity={0.7}
                            >
                                {renderFlaticon('fi fi-rr-heart', { size: 18, color: '#fff' })}
                            </TouchableOpacity>
                        </TooltipTrigger>
                        <TooltipContent>Like</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <TouchableOpacity
                                style={applyTw('w-11 h-11 rounded-full bg-[#1f1f1f] items-center justify-center border border-[#2A2A2A]')}
                                activeOpacity={0.7}
                            >
                                {renderFlaticon('fi fi-rr-share', { size: 18, color: '#fff' })}
                            </TouchableOpacity>
                        </TooltipTrigger>
                        <TooltipContent>Share</TooltipContent>
                    </Tooltip>
                </View>
                <Text style={applyTw('text-gray-500 text-xs')}>
                    Note: on touch devices tooltips trigger via long-press instead of hover.
                </Text>
            </View>
        </ScrollView>
    );
};

export default Tooltip;
