import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { applyTw } from '../../style/_elst';
import { Text } from './text';
import { renderFlaticon } from '../../functions/iconUtils';

const VARIANT_STYLES = {
    default: { off: 'bg-transparent border-transparent', on: 'bg-[#2A2A2A] border-transparent' },
    outline: { off: 'bg-transparent border-[#3A3A3A]', on: 'bg-[#2A2A2A] border-[#3A3A3A]' },
};

const SIZE_STYLES = {
    sm: 'h-8 px-2',
    default: 'h-10 px-3',
    lg: 'h-11 px-4',
};

/**
 * Toggle — a two-state button that can be on or off.
 *
 * @param {boolean} pressed - Controlled pressed state
 * @param {function} onPressedChange - Callback when state changes
 * @param {string} variant - 'default' | 'outline'
 * @param {string} size - 'sm' | 'default' | 'lg'
 * @param {boolean} disabled
 */
export const Toggle = ({
    pressed,
    defaultPressed = false,
    onPressedChange,
    variant = 'default',
    size = 'default',
    disabled = false,
    className = '',
    children,
}) => {
    const [internalPressed, setInternalPressed] = useState(defaultPressed);
    const isControlled = pressed !== undefined;
    const isOn = isControlled ? pressed : internalPressed;

    const handlePress = () => {
        if (disabled) return;
        const next = !isOn;
        if (!isControlled) setInternalPressed(next);
        onPressedChange?.(next);
    };

    const variantClass = VARIANT_STYLES[variant] || VARIANT_STYLES.default;
    const sizeClass = SIZE_STYLES[size] || SIZE_STYLES.default;

    return (
        <TouchableOpacity
            onPress={handlePress}
            disabled={disabled}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={{ selected: isOn, disabled }}
            style={applyTw(
                `flex-row items-center justify-center gap-2 rounded-md border ${sizeClass} ${isOn ? variantClass.on : variantClass.off
                } ${disabled ? 'opacity-50' : ''} ${className}`
            )}
        >
            {typeof children === 'function' ? children(isOn) : children}
        </TouchableOpacity>
    );
};

// ==================== DEMO COMPONENT ====================

const BoldIcon = ({ color }) => renderFlaticon('fi fi-rr-bold', { size: 16, color });
const ItalicIcon = ({ color }) => renderFlaticon('fi fi-rr-italic', { size: 16, color });
const UnderlineIcon = ({ color }) => renderFlaticon('fi fi-rr-underline', { size: 16, color });

export const ToggleDemo = () => {
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(true);
    const [starred, setStarred] = useState(false);

    return (
        <ScrollView style={applyTw('flex-1')} contentContainerStyle={applyTw('p-5 gap-8 pb-20')}>
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Toggle</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    A two-state button that can be either on or off.
                </Text>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Default</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222] flex-row gap-2')}>
                    <Toggle pressed={bold} onPressedChange={setBold}>
                        {(isOn) => <BoldIcon color={isOn ? '#fff' : '#9ca3af'} />}
                    </Toggle>
                    <Toggle pressed={italic} onPressedChange={setItalic}>
                        {(isOn) => <ItalicIcon color={isOn ? '#fff' : '#9ca3af'} />}
                    </Toggle>
                    <Toggle disabled>
                        <UnderlineIcon color="#6b7280" />
                    </Toggle>
                </View>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Outline</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222] flex-row gap-2')}>
                    <Toggle variant="outline" pressed={starred} onPressedChange={setStarred}>
                        {(isOn) => (
                            <>
                                {renderFlaticon('fi fi-rr-star', { size: 16, color: isOn ? '#facc15' : '#9ca3af' })}
                                <Text style={applyTw(`text-sm font-medium ${isOn ? 'text-white' : 'text-gray-400'}`)}>
                                    Star
                                </Text>
                            </>
                        )}
                    </Toggle>
                </View>
            </View>

            <View style={applyTw('gap-4 mb-8')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Sizes</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222] flex-row items-center gap-2')}>
                    <Toggle variant="outline" size="sm" defaultPressed>
                        {(isOn) => <BoldIcon color={isOn ? '#fff' : '#9ca3af'} />}
                    </Toggle>
                    <Toggle variant="outline" size="default" defaultPressed>
                        {(isOn) => <BoldIcon color={isOn ? '#fff' : '#9ca3af'} />}
                    </Toggle>
                    <Toggle variant="outline" size="lg" defaultPressed>
                        {(isOn) => <BoldIcon color={isOn ? '#fff' : '#9ca3af'} />}
                    </Toggle>
                </View>
            </View>
        </ScrollView>
    );
};

export default Toggle;
