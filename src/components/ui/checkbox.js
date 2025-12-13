import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { applyTw } from '../../style/style';
import { Text } from './text';
import { Label } from './label';
import { renderFlaticon } from '../../functions/iconUtils';

/**
 * Checkbox Component
 * @param {boolean} checked - Controlled checked state
 * @param {function} onCheckedChange - Callback when state changes
 * @param {boolean} disabled - Whether the checkbox is disabled
 * @param {string} className - Additional styles
 */
export const Checkbox = ({ checked, onCheckedChange, disabled, className = '', id }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => !disabled && onCheckedChange?.(!checked)}
            disabled={disabled}
            style={[
                applyTw(`w-5 h-5 rounded border items-center justify-center ${className}`),
                checked
                    ? applyTw(disabled ? 'bg-gray-700 border-gray-700' : 'bg-blue-600 border-blue-600')
                    : applyTw(disabled ? 'border-gray-700 bg-transparent' : 'border-gray-500 bg-transparent'),
            ]}
            testID={id}
        >
            {checked && renderFlaticon('fi fi-br-check', { size: 12, color: disabled ? '#9ca3af' : '#ffffff' })}
        </TouchableOpacity>
    );
};

export const CheckboxDemo = () => {
    const [terms1, setTerms1] = useState(false);
    const [terms2, setTerms2] = useState(true);
    const [notify, setNotify] = useState(false);
    const [notify2, setNotify2] = useState(true);

    return (
        <ScrollView style={applyTw('flex-1 bg-black')} contentContainerStyle={applyTw('p-6 gap-8')}>
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Checkbox</Text>
                <Text style={applyTw('text-gray-400 text-base')}>A controlled input that switches between checked and unchecked states.</Text>
            </View>

            {/* Example 1: Basic with Label */}
            <View style={applyTw('flex-row items-center gap-3')}>
                <Checkbox
                    checked={terms1}
                    onCheckedChange={setTerms1}
                    id="terms"
                />
                <Label onPress={() => setTerms1(!terms1)} style={applyTw('text-white')}>
                    Accept terms and conditions
                </Label>
            </View>

            {/* Example 2: With Description */}
            <View style={applyTw('flex-row items-start gap-3')}>
                <Checkbox
                    checked={terms2}
                    onCheckedChange={setTerms2}
                    className="mt-1"
                    id="terms-2"
                />
                <View style={applyTw('gap-1 flex-1')}>
                    <Label onPress={() => setTerms2(!terms2)} style={applyTw('text-white font-medium')}>
                        Accept terms and conditions
                    </Label>
                    <Text style={applyTw('text-gray-400 text-sm')}>
                        By clicking this checkbox, you agree to the terms and conditions.
                    </Text>
                </View>
            </View>

            {/* Example 3: Disabled */}
            <View style={applyTw('flex-row items-center gap-3')}>
                <Checkbox
                    checked={notify}
                    onCheckedChange={setNotify}
                    disabled
                    id="toggle"
                />
                <Label style={applyTw('text-gray-500')}>Enable notifications</Label>
            </View>

            {/* Example 4: Card Overlay Style */}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setNotify2(!notify2)}
                style={applyTw(`flex-row items-start gap-3 p-4 rounded-xl border ${notify2 ? 'bg-[#1e3a8a30] border-blue-600' : 'bg-transparent border-[#333]'}`)}
            >
                <Checkbox
                    checked={notify2}
                    onCheckedChange={setNotify2}
                    className={notify2 ? 'bg-blue-600 border-blue-600' : ''}
                    id="toggle-2"
                />
                <View style={applyTw('gap-1 flex-1')}>
                    <Text style={applyTw('text-white font-medium')}>
                        Enable notifications
                    </Text>
                    <Text style={applyTw('text-gray-400 text-sm')}>
                        You can enable or disable notifications at any time.
                    </Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Checkbox;
