import React, { createContext, useContext, useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { applyTw } from '../../style/style';
import { Label } from './label';

// Context for RadioGroup
const RadioGroupContext = createContext(null);

/**
 * RadioGroup Component
 */
export function RadioGroup({ defaultValue, value, onValueChange, className = '', children, ...props }) {
    // If controlled, use value. If uncontrolled, use local state initialized with defaultValue
    const [localValue, setLocalValue] = useState(defaultValue);
    const resolvedValue = value !== undefined ? value : localValue;

    const handleValueChange = (newValue) => {
        setLocalValue(newValue);
        if (onValueChange) {
            onValueChange(newValue);
        }
    };

    return (
        <RadioGroupContext.Provider value={{ value: resolvedValue, onValueChange: handleValueChange }}>
            <View style={applyTw(`gap-3 ${className}`)} {...props}>
                {children}
            </View>
        </RadioGroupContext.Provider>
    );
}

/**
 * RadioGroupItem Component
 */
export function RadioGroupItem({ value, id, disabled, className = '', ...props }) {
    const context = useContext(RadioGroupContext);
    const isChecked = context?.value === value;

    const handlePress = () => {
        if (!disabled && context?.onValueChange) {
            context.onValueChange(value);
        }
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={disabled ? 0.8 : 0.6}
            disabled={disabled}
            style={applyTw(
                `h-4 w-4 rounded-full border border-white items-center justify-center ${disabled ? 'opacity-50' : ''
                } ${className}`
            )}
            {...props}
        >
            {isChecked && (
                <View style={applyTw('h-2 w-2 rounded-full bg-white')} />
            )}
        </TouchableOpacity>
    );
}

// ==================== DEMO COMPONENT ====================

export function RadioGroupDemo() {
    return (
        <ScrollView style={applyTw('flex-1')} contentContainerStyle={applyTw('p-5 gap-8')}>
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Radio Group</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
                </Text>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Example</Text>
                <View style={applyTw('p-6 border border-[#333] rounded-lg bg-[#111]')}>
                    <RadioGroup defaultValue="comfortable">
                        <View style={applyTw('flex-row items-center gap-3')}>
                            <RadioGroupItem value="default" id="r1" />
                            <Label style={applyTw('mb-0')}>Default</Label>
                        </View>
                        <View style={applyTw('flex-row items-center gap-3')}>
                            <RadioGroupItem value="comfortable" id="r2" />
                            <Label style={applyTw('mb-0')}>Comfortable</Label>
                        </View>
                        <View style={applyTw('flex-row items-center gap-3')}>
                            <RadioGroupItem value="compact" id="r3" />
                            <Label style={applyTw('mb-0')}>Compact</Label>
                        </View>
                    </RadioGroup>
                </View>
            </View>
        </ScrollView>
    );
}

export default RadioGroup;
