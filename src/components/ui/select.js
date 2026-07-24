import React, { createContext, useContext, useState, useRef } from 'react';
import {
    View,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    Dimensions,
    ScrollView,
} from 'react-native';
import { applyTw } from '../../style/_elst';
import { Text } from './text';
import { renderFlaticon } from '../../functions/iconUtils';

const SelectContext = createContext(null);

/**
 * Select — a control for choosing a single value from a list of options,
 * presented in a popover menu anchored to the trigger.
 *
 * @param {string} value - Controlled selected value
 * @param {function} onValueChange - Callback with new value
 */
export const Select = ({ value, defaultValue, onValueChange, disabled = false, children }) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [visible, setVisible] = useState(false);
    const [triggerLayout, setTriggerLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const triggerRef = useRef(null);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const open = () => {
        if (disabled) return;
        if (triggerRef.current) {
            triggerRef.current.measureInWindow((x, y, width, height) => {
                setTriggerLayout({ x, y, width, height });
                setVisible(true);
            });
        }
    };

    const select = (val) => {
        if (!isControlled) setInternalValue(val);
        onValueChange?.(val);
        setVisible(false);
    };

    return (
        <SelectContext.Provider
            value={{ visible, open, close: () => setVisible(false), select, currentValue, triggerLayout, triggerRef, disabled }}
        >
            {children}
        </SelectContext.Provider>
    );
};

/**
 * SelectTrigger — the tappable control that opens the option list.
 */
export const SelectTrigger = ({ className = '', children }) => {
    const { open, triggerRef, disabled } = useContext(SelectContext);

    return (
        <TouchableOpacity
            ref={triggerRef}
            onPress={open}
            disabled={disabled}
            activeOpacity={0.7}
            style={applyTw(
                `flex-row items-center justify-between h-10 px-3 rounded-md border border-[#3A3A3A] bg-transparent ${disabled ? 'opacity-50' : ''
                } ${className}`
            )}
        >
            {children}
            {renderFlaticon('fi fi-rr-angle-down', { size: 14, color: '#9ca3af' })}
        </TouchableOpacity>
    );
};

/**
 * SelectValue — displays the current value, or a placeholder when empty.
 */
export const SelectValue = ({ placeholder = 'Select...', className = '' }) => {
    const { currentValue } = useContext(SelectContext);
    return (
        <Text style={applyTw(`text-sm ${currentValue ? 'text-white' : 'text-gray-500'} ${className}`)}>
            {currentValue || placeholder}
        </Text>
    );
};

/**
 * SelectContent — the modal list of options.
 */
export const SelectContent = ({ children, width = 240 }) => {
    const { visible, close, triggerLayout } = useContext(SelectContext);
    const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

    if (!visible) return null;

    let top = triggerLayout.y + triggerLayout.height + 4;
    let left = triggerLayout.x;
    const finalWidth = Math.max(width, triggerLayout.width);

    if (left + finalWidth > screenWidth - 10) left = screenWidth - finalWidth - 10;
    if (left < 10) left = 10;

    return (
        <Modal transparent visible={visible} animationType="fade" onRequestClose={close}>
            <TouchableWithoutFeedback onPress={close}>
                <View style={applyTw('flex-1')} />
            </TouchableWithoutFeedback>
            <View
                style={[
                    applyTw('absolute bg-[#111111] border border-[#2A2A2A] rounded-md overflow-hidden'),
                    {
                        top,
                        left,
                        width: finalWidth,
                        maxHeight: screenHeight * 0.4,
                        zIndex: 1000,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 10,
                    },
                ]}
            >
                <ScrollView contentContainerStyle={applyTw('p-1')} showsVerticalScrollIndicator={false}>
                    {children}
                </ScrollView>
            </View>
        </Modal>
    );
};

/**
 * SelectItem — a single selectable option.
 */
export const SelectItem = ({ value, children, disabled = false }) => {
    const { select, currentValue } = useContext(SelectContext);
    const selected = currentValue === value;

    return (
        <TouchableOpacity
            onPress={() => !disabled && select(value)}
            disabled={disabled}
            activeOpacity={0.7}
            style={applyTw(
                `flex-row items-center justify-between px-3 py-2.5 rounded-sm ${disabled ? 'opacity-50' : ''} ${selected ? 'bg-[#1f1f1f]' : ''
                }`
            )}
        >
            <Text style={applyTw(`text-sm ${selected ? 'text-white font-medium' : 'text-gray-200'}`)}>
                {children}
            </Text>
            {selected && renderFlaticon('fi fi-rr-check', { size: 14, color: '#fff' })}
        </TouchableOpacity>
    );
};

export const SelectGroup = ({ children }) => <View>{children}</View>;

export const SelectLabel = ({ children }) => (
    <Text style={applyTw('px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider')}>
        {children}
    </Text>
);

export const SelectSeparator = () => <View style={applyTw('h-[1px] bg-[#2A2A2A] my-1')} />;

// ==================== DEMO COMPONENT ====================

export const SelectDemo = () => {
    const [fruit, setFruit] = useState('apple');
    const [timezone, setTimezone] = useState(undefined);

    return (
        <ScrollView style={applyTw('flex-1')} contentContainerStyle={applyTw('p-5 gap-8 pb-20')}>
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Select</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    Displays a list of options for the user to pick from, triggered by a button.
                </Text>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Basic</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <Select value={fruit} onValueChange={setFruit}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectSeparator />
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple" disabled>
                                Pineapple (out of stock)
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </View>
            </View>

            <View style={applyTw('gap-4 mb-8')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>With Placeholder</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <Select value={timezone} onValueChange={setTimezone}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose a timezone" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
                            <SelectItem value="utc">UTC</SelectItem>
                            <SelectItem value="pst">PST (UTC-8)</SelectItem>
                            <SelectItem value="est">EST (UTC-5)</SelectItem>
                        </SelectContent>
                    </Select>
                </View>
            </View>
        </ScrollView>
    );
};

export default Select;
