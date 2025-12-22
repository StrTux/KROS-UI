import React from 'react';
import { View, TextInput } from 'react-native';
import { applyTw } from '../../style/style';

/**
 * Input Component for React Native
 * Text input field with consistent dark theme styling
 */

export const Input = ({
    value,
    onChangeText,
    placeholder,
    placeholderTextColor = '#9ca3af',
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'none',
    className = '',
    ...props
}) => {
    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            style={applyTw(
                `bg-black p-2 border border-[#ffffff40] rounded-md px-4 py-3 text-white text-base ${className}`
            )}
            {...props}
        />
    );
};

export default Input;
