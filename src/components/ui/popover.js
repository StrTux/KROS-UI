// ==================== POPOVER ====================

import React, { createContext, useContext, useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    Dimensions,
    ScrollView,
    Platform,
} from 'react-native';
import { applyTw } from '../../style/style';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { renderFlaticon } from '../../functions/iconUtils';

const PopoverContext = createContext(null);

/**
 * Popover Root
 */
export function Popover({ children }) {
    const [visible, setVisible] = useState(false);
    const [triggerLayout, setTriggerLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const triggerRef = useRef(null);

    const togglePopover = () => {
        if (visible) {
            setVisible(false);
        } else {
            measureTrigger();
        }
    };

    const measureTrigger = () => {
        if (triggerRef.current) {
            triggerRef.current.measureInWindow((x, y, width, height) => {
                setTriggerLayout({ x, y, width, height });
                setVisible(true);
            });
        }
    };

    return (
        <PopoverContext.Provider value={{ visible, setVisible, togglePopover, triggerLayout, triggerRef }}>
            {children}
        </PopoverContext.Provider>
    );
}

/**
 * Popover Trigger
 */
export function PopoverTrigger({ children, asChild, className = '', ...props }) {
    const { togglePopover, triggerRef } = useContext(PopoverContext);

    const handlePress = (e) => {
        if (children.props.onPress) children.props.onPress(e);
        togglePopover();
    };

    if (asChild) {
        return (
            <View ref={triggerRef} collapsable={false} style={[applyTw(className)]}>
                {React.cloneElement(children, { onPress: handlePress })}
            </View>
        );
    }

    return (
        <TouchableOpacity
            ref={triggerRef}
            onPress={togglePopover}
            activeOpacity={0.7}
            style={applyTw(className)}
            {...props}
        >
            {children}
        </TouchableOpacity>
    );
}

/**
 * Popover Content  (UI same, behavior fixed)
 */
export function PopoverContent({ children, className = '', align = 'center', width = 288, sideOffset = 6 }) {
    const { visible, setVisible, triggerLayout } = useContext(PopoverContext);
    const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

    if (!visible) return null;

    // Default positioning: Bottom
    let top = triggerLayout.y + triggerLayout.height + sideOffset;
    let left = triggerLayout.x;

    // Alignment logic
    if (align === 'center') {
        left = triggerLayout.x + (triggerLayout.width / 2) - (width / 2);
    } else if (align === 'end') {
        left = triggerLayout.x + triggerLayout.width - width;
    }

    // Boundary Checks
    if (left < 10) left = 10;
    if (left + width > screenWidth - 10) left = screenWidth - width - 10;

    const estimatedHeight = 300;
    if (top + estimatedHeight > screenHeight) {
        // optional: upar shift kar sakte ho agar chaho
        // top = triggerLayout.y - estimatedHeight - sideOffset;
    }

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={() => setVisible(false)}
        >
            {/* Same transparent overlay */}
            <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                <View style={applyTw('flex-1 bg-transparent')} />
            </TouchableWithoutFeedback>

            <View
                style={[
                    applyTw(`absolute bg-[#09090b] border border-[#27272a] rounded-lg p-4`),
                    {
                        top,
                        left,
                        width,
                        maxHeight: screenHeight * 0.5,
                        zIndex: 1000,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 10,
                    },
                    applyTw(className)
                ]}
            >
                {/* IMPORTANT: ScrollView inside with keyboardShouldPersistTaps */}
                <ScrollView
                    style={applyTw('w-full')}
                    contentContainerStyle={applyTw('gap-4')}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>
            </View>
        </Modal>
    );
}

// ==================== DEMO COMPONENT ====================

export function PopoverDemo() {
    const [vals, setVals] = useState({ w: '100%', mw: '300px', h: '25px', mh: 'none' });

    return (
        <ScrollView
            style={applyTw('flex-1')}
            contentContainerStyle={applyTw('p-5 gap-8')}
            keyboardShouldPersistTaps="handled"   // IMPORTANT for parents too [web:67][web:90][web:86]
        >
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Popover</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    Displays rich content in a portal, triggered by a button.
                </Text>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Example</Text>
                <View style={applyTw('p-6 items-center justify-center border border-[#333] rounded-lg bg-[#111] h-96')}>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">Open settings</Button>
                        </PopoverTrigger>
                        <PopoverContent width={300} className="items-start">
                            <View style={applyTw('gap-4')}>
                                <View style={applyTw('gap-1.5')}>
                                    <Text style={applyTw('text-white font-semibold text-base leading-none')}>Dimensions</Text>
                                    <Text style={applyTw('text-[#a1a1aa] text-sm')}>Set the dimensions for the layer.</Text>
                                </View>
                                <View style={applyTw('gap-3 w-full')}>
                                    {/* Row 1 */}
                                    <View style={applyTw('flex-row items-center gap-4')}>
                                        <Label className="w-20 mb-0 text-right pr-2 text-white">Width</Label>
                                        <Input
                                            value={vals.w}
                                            onChangeText={(t) => setVals({ ...vals, w: t })}
                                            className="flex-1 mb-0"
                                            inputClassName="h-8 py-0 px-10 text-sm min-h-0"
                                            containerStyle={applyTw('mb-0')}
                                            keyboardType="default"
                                        />
                                    </View>
                                    {/* Row 2 */}
                                    <View style={applyTw('flex-row items-center gap-4')}>
                                        <Label className="w-20 mb-0 text-right pr-2 text-white">Max. w</Label>
                                        <Input
                                            value={vals.mw}
                                            onChangeText={(t) => setVals({ ...vals, mw: t })}
                                            className="flex-1 mb-0"
                                            inputClassName="h-10 py-0 px-10 text-sm min-h-0"
                                            containerStyle={applyTw('mb-0')}
                                        />
                                    </View>
                                    {/* Row 3 */}
                                    <View style={applyTw('flex-row items-center gap-4')}>
                                        <Label className="w-20 mb-0 text-right pr-2 text-white">Height</Label>
                                        <Input
                                            value={vals.h}
                                            onChangeText={(t) => setVals({ ...vals, h: t })}
                                            className="flex-1 mb-0"
                                            inputClassName="h-8 py-0 px-10 text-sm min-h-0"
                                            containerStyle={applyTw('mb-0')}
                                        />
                                    </View>
                                    {/* Row 4 */}
                                    <View style={applyTw('flex-row items-center gap-4')}>
                                        <Label className="w-20 mb-0 text-right pr-2 text-white">Max. h</Label>
                                        <Input
                                            value={vals.mh}
                                            onChangeText={(t) => setVals({ ...vals, mh: t })}
                                            className="flex-1 mb-0"
                                            inputClassName="h-8 py-0 px-10 text-sm min-h-0"
                                            containerStyle={applyTw('mb-0')}
                                        />
                                    </View>
                                </View>
                            </View>
                        </PopoverContent>
                    </Popover>
                </View>
            </View>
        </ScrollView>
    );
}

export default Popover;
