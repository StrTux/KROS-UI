import React, { createContext, useContext, useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { applyTw } from '../../style/_elst';
import { Text } from './text';
import { renderFlaticon } from '../../functions/iconUtils';

const ToggleGroupContext = createContext(null);

/**
 * ToggleGroup — a set of toggle buttons where only one (single) or
 * many (multiple) items can be selected at a time.
 *
 * @param {string} type - 'single' | 'multiple'
 * @param {string|string[]} value - Controlled value
 * @param {function} onValueChange - Callback with new value
 * @param {string} variant - 'default' | 'outline'
 */
export const ToggleGroup = ({
    type = 'single',
    value,
    defaultValue,
    onValueChange,
    variant = 'default',
    className = '',
    children,
}) => {
    const [internalValue, setInternalValue] = useState(
        defaultValue !== undefined ? defaultValue : type === 'multiple' ? [] : null
    );
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const toggleItem = (itemValue) => {
        let next;
        if (type === 'multiple') {
            const arr = Array.isArray(currentValue) ? currentValue : [];
            next = arr.includes(itemValue) ? arr.filter((v) => v !== itemValue) : [...arr, itemValue];
        } else {
            next = currentValue === itemValue ? null : itemValue;
        }
        if (!isControlled) setInternalValue(next);
        onValueChange?.(next);
    };

    const isSelected = (itemValue) =>
        type === 'multiple'
            ? Array.isArray(currentValue) && currentValue.includes(itemValue)
            : currentValue === itemValue;

    return (
        <ToggleGroupContext.Provider value={{ toggleItem, isSelected, variant }}>
            <View style={applyTw(`flex-row items-center gap-1 ${className}`)}>{children}</View>
        </ToggleGroupContext.Provider>
    );
};

/**
 * ToggleGroupItem — a single item within a ToggleGroup.
 */
export const ToggleGroupItem = ({ value, disabled = false, className = '', children }) => {
    const ctx = useContext(ToggleGroupContext);
    if (!ctx) return null;
    const { toggleItem, isSelected, variant } = ctx;
    const selected = isSelected(value);

    const base = variant === 'outline' ? 'border border-[#3A3A3A]' : 'border border-transparent';
    const bg = selected ? 'bg-[#2A2A2A]' : 'bg-transparent';

    return (
        <TouchableOpacity
            onPress={() => !disabled && toggleItem(value)}
            disabled={disabled}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={{ selected, disabled }}
            style={applyTw(
                `h-10 px-3 items-center justify-center rounded-md ${base} ${bg} ${disabled ? 'opacity-50' : ''} ${className}`
            )}
        >
            {typeof children === 'function' ? children(selected) : children}
        </TouchableOpacity>
    );
};

// ==================== DEMO COMPONENT ====================

export const ToggleGroupDemo = () => {
    const [align, setAlign] = useState('left');
    const [marks, setMarks] = useState(['bold']);

    const AlignIcon = ({ name, color }) => renderFlaticon(`fi fi-rr-${name}`, { size: 16, color });

    return (
        <ScrollView style={applyTw('flex-1')} contentContainerStyle={applyTw('p-5 gap-8 pb-20')}>
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Toggle Group</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    A set of two-state buttons that can be toggled on or off.
                </Text>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Single Selection</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <ToggleGroup type="single" variant="outline" value={align} onValueChange={setAlign}>
                        <ToggleGroupItem value="left">
                            {(sel) => <AlignIcon name="align-left" color={sel ? '#fff' : '#9ca3af'} />}
                        </ToggleGroupItem>
                        <ToggleGroupItem value="center">
                            {(sel) => <AlignIcon name="align-center" color={sel ? '#fff' : '#9ca3af'} />}
                        </ToggleGroupItem>
                        <ToggleGroupItem value="justify">
                            {(sel) => <AlignIcon name="align-justify" color={sel ? '#fff' : '#9ca3af'} />}
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <Text style={applyTw('text-gray-500 text-xs mt-3')}>Selected: {align ?? 'none'}</Text>
                </View>
            </View>

            <View style={applyTw('gap-4 mb-8')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Multiple Selection</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <ToggleGroup type="multiple" variant="outline" value={marks} onValueChange={setMarks}>
                        <ToggleGroupItem value="bold">
                            {(sel) => <Text style={applyTw(`text-sm font-bold ${sel ? 'text-white' : 'text-gray-400'}`)}>B</Text>}
                        </ToggleGroupItem>
                        <ToggleGroupItem value="italic">
                            {(sel) => <Text style={applyTw(`text-sm italic ${sel ? 'text-white' : 'text-gray-400'}`)}>I</Text>}
                        </ToggleGroupItem>
                        <ToggleGroupItem value="underline">
                            {(sel) => <Text style={applyTw(`text-sm underline ${sel ? 'text-white' : 'text-gray-400'}`)}>U</Text>}
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <Text style={applyTw('text-gray-500 text-xs mt-3')}>
                        Selected: {marks.length ? marks.join(', ') : 'none'}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default ToggleGroup;
