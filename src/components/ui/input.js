// ==================== INPUT ====================

import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { applyTw } from '../../style/style';
import { Text } from './text';
import { Label } from './label';
import { Button } from './button';
import { renderFlaticon } from '../../functions/iconUtils';

/**
 * Input Component for React Native
 * Supports standard, floating label, and icon variants
 */

export const Input = ({
    value,
    onChangeText,
    label,
    placeholder,
    placeholderTextColor = '#9CA3AF',
    helperText,
    error,
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'none',
    disabled = false,
    icon,
    iconPosition = 'left',
    className = '',
    inputClassName = '',
    containerStyle,
    variant = 'default', // 'default' | 'floating' | 'ghost'
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasError = !!error;
    const isFloating = variant === 'floating';
    const inputRef = useRef(null);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    // Box Styles (Wrapper)
    const boxClasses = [
        'w-full rounded-lg flex-row items-center border relative overflow-hidden',
        'bg-[#111]',
        hasError ? 'border-red-500' : isFocused ? 'border-white' : 'border-[#333]',
        isFloating ? 'min-h-[56px] pt-4' : 'min-h-[48px]',
        disabled ? 'opacity-50' : '', 'px-3',
        inputClassName // Layout props (h-8, px-10) apply here
    ].join(' ');

    const textInputClasses = [
        'flex-1 text-base text-white font-normal',
        'bg-transparent border-0 m-0',
        'h-full ',
        'ml-2',
        inputClassName // Text props (text-sm) apply here
    ].join(' ');

    const handleContainerPress = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <View style={[applyTw(`mb-4 relative ${className}`), containerStyle]}>
            {/* Standard Label (Outside) */}
            {label && !isFloating && (
                <Label className={`mb-2 ${hasError ? 'text-red-500' : ''}`}>{label}</Label>
            )}

            {/* Input Box Wrapper - Made touchable to focus inner input */}
            <TouchableWithoutFeedback onPress={handleContainerPress} disabled={disabled}>
                <View style={applyTw(boxClasses)}>
                    {/* Floating Label (Inside) */}
                    {label && isFloating && (
                        <Text
                            style={[
                                applyTw(`absolute left-4 z-10 text-xs font-normal`),
                                {
                                    top: 8,
                                    color: hasError ? '#EF4444' : '#9CA3AF'
                                }
                            ]}
                        >
                            {label} {props.required && <Text style={applyTw('text-red-500')}>*</Text>}
                        </Text>
                    )}

                    {/* Left Icon */}
                    {icon && iconPosition === 'left' && (
                        <View style={applyTw('mr-3 justify-center')}>
                            {icon}
                        </View>
                    )}

                    {/* Actual Input */}
                    <TextInput
                        ref={inputRef}
                        value={value}
                        onChangeText={onChangeText}
                        placeholder={isFloating ? (isFocused ? placeholder : '') : placeholder}
                        placeholderTextColor={placeholderTextColor}
                        secureTextEntry={secureTextEntry}
                        keyboardType={keyboardType}
                        autoCapitalize={autoCapitalize}
                        editable={!disabled}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        style={[
                            applyTw(textInputClasses),
                            {
                                paddingLeft: 0,
                                paddingRight: 0,
                                paddingHorizontal: 0,
                                paddingVertical: 0,
                                textAlignVertical: 'center',
                                minHeight: isFloating ? undefined : 0,
                            }
                        ]}
                        {...props}
                    />

                    {/* Right Icon */}
                    {icon && iconPosition === 'right' && (
                        <View style={applyTw('ml-3 justify-center')}>
                            {icon}
                        </View>
                    )}
                </View>
            </TouchableWithoutFeedback>

            {/* Helper/Error */}
            {(helperText || hasError) && (
                <Text style={applyTw(`text-xs mt-1.5 ${hasError ? 'text-red-500' : 'text-gray-500'}`)}>
                    {hasError ? error : helperText}
                </Text>
            )}
        </View>
    );
};

// ==================== INPUT DEMO ====================

export const InputDemo = () => {
    const [email, setEmail] = useState('');

    const UserIcon = () => renderFlaticon('fi-rr-user', { size: 18, color: '#999' });
    const MailIcon = () => renderFlaticon('fi-rr-envelope', { size: 18, color: '#999' });
    const LockIcon = () => renderFlaticon('fi-rr-lock', { size: 18, color: '#999' });
    const SearchIcon = () => renderFlaticon('fi-rr-search', { size: 18, color: '#999' });

    return (
        <ScrollView
            style={applyTw('flex-1')}
            contentContainerStyle={applyTw('p-5 gap-8 pb-20')}
            keyboardShouldPersistTaps="handled"
        >
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Input Component</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    Refactored with Box-Text architecture and focus handling.
                </Text>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Standard Inputs</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <Input placeholder="Default Input" />
                    <Input label="Email Address" placeholder="name@example.com" />
                </View>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>With Icons</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <Input
                        label="Search"
                        placeholder="Search..."
                        icon={<SearchIcon />}
                        iconPosition="left"
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default Input;

