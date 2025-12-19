// ==================== TEXTAREA ====================

import React, { useState, useRef } from 'react';
import { View, TextInput, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { applyTw } from '../../style/style';
import { Text } from './text';
import { Label } from './label';

/**
 * Textarea Component for React Native
 * Multiline text input with auto-grow and character counter support
 */

export const Textarea = ({
    value,
    onChangeText,
    label,
    placeholder = 'Type your message here.',
    placeholderTextColor = '#9CA3AF',
    helperText,
    error,
    disabled = false,
    className = '',
    inputClassName = '',
    containerStyle,
    maxLength,
    showCharCount = false,
    minHeight = 96,
    maxHeight = 200,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [text, setText] = useState(value || '');
    const hasError = !!error;
    const inputRef = useRef(null);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleChangeText = (newText) => {
        setText(newText);
        if (onChangeText) onChangeText(newText);
    };

    const handleContainerPress = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    // Box Styles (Wrapper)
    const boxClasses = [
        'w-full rounded-lg border relative overflow-hidden',
        'bg-[#111]',
        hasError ? 'border-red-500' : isFocused ? 'border-white' : 'border-[#333]',
        disabled ? 'opacity-50' : '',
        inputClassName
    ].join(' ');

    const textInputClasses = [
        'w-full text-base text-white font-normal',
        'bg-transparent border-0 m-0 p-3',
        inputClassName
    ].join(' ');

    const charCount = (value || text).length;
    const showCounter = showCharCount || maxLength;

    return (
        <View style={[applyTw(`mb-4 relative ${className}`), containerStyle]}>
            {/* Label */}
            {label && (
                <Label className={`mb-2 ${hasError ? 'text-red-500' : ''}`}>{label}</Label>
            )}

            {/* Textarea Box Wrapper */}
            <TouchableWithoutFeedback onPress={handleContainerPress} disabled={disabled}>
                <View style={applyTw(boxClasses)}>
                    <TextInput
                        ref={inputRef}
                        value={value}
                        onChangeText={handleChangeText}
                        placeholder={placeholder}
                        placeholderTextColor={placeholderTextColor}
                        editable={!disabled}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        multiline
                        maxLength={maxLength}
                        style={[
                            applyTw(textInputClasses),
                            {
                                minHeight,
                                maxHeight,
                                textAlignVertical: 'top',
                            }
                        ]}
                        {...props}
                    />
                </View>
            </TouchableWithoutFeedback>

            {/* Helper/Error/Counter Row */}
            <View style={applyTw('flex-row justify-between items-center mt-1.5')}>
                {/* Helper or Error */}
                {(helperText || hasError) && (
                    <Text style={applyTw(`text-xs flex-1 ${hasError ? 'text-red-500' : 'text-gray-500'}`)}>
                        {hasError ? error : helperText}
                    </Text>
                )}

                {/* Character Counter */}
                {showCounter && (
                    <Text style={applyTw(`text-xs ${maxLength && charCount > maxLength * 0.9 ? 'text-yellow-500' : 'text-gray-500'}`)}>
                        {charCount}{maxLength ? `/${maxLength}` : ''}
                    </Text>
                )}
            </View>
        </View>
    );
};

// ==================== TEXTAREA DEMO ====================

export const TextareaDemo = () => {
    const [message, setMessage] = useState('');
    const [bio, setBio] = useState('');

    return (
        <ScrollView
            style={applyTw('flex-1')}
            contentContainerStyle={applyTw('p-5 gap-8 pb-20')}
            keyboardShouldPersistTaps="handled"
        >
            {/* Header */}
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Textarea</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    Multiline text input for longer content.
                </Text>
            </View>

            {/* Basic Example */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Basic</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <Textarea placeholder="Type your message here." />
                </View>
            </View>

            {/* With Label */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>With Label</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <Textarea
                        label="Your message"
                        placeholder="Type your message here."
                        value={message}
                        onChangeText={setMessage}
                    />
                </View>
            </View>

            {/* With Helper Text */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>With Helper Text</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <Textarea
                        label="Your Message"
                        placeholder="Type your message here."
                        helperText="Your message will be copied to the support team."
                    />
                </View>
            </View>

            {/* With Character Counter */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>With Character Limit</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <Textarea
                        label="Bio"
                        placeholder="Tell us about yourself..."
                        value={bio}
                        onChangeText={setBio}
                        maxLength={200}
                        showCharCount
                        helperText="Maximum 200 characters"
                    />
                </View>
            </View>

            {/* Disabled */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Disabled</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <Textarea
                        placeholder="Type your message here."
                        disabled
                        value="This textarea is disabled"
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default Textarea;
