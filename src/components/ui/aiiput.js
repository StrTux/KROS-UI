import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { applyTw } from '../../style/style';
import { renderFlaticon } from '../../functions/iconUtils';

/**
 * AI Input Component
 * Floating-style bottom input bar with voice toggle
 */

export const AIInput = ({
    onSend,
    placeholder = 'Send a message...',
    voicePlaceholder = 'Record and send audio...',
    onVoiceToggle,
    className = '',
}) => {
    const [voiceEnabled, setVoiceEnabled] = useState(false);
    const [message, setMessage] = useState('');

    // Icons
    const PlusIcon = () =>
        renderFlaticon('plus', { size: 20, color: '#ffffff' });

    const VoiceIcon = () =>
        renderFlaticon('waveform', {
            size: 18,
            color: voiceEnabled ? '#ffffff' : '#9ca3af',
        });

    // ⭐ UPDATED SEND ICON
    const SendIcon = () =>
        renderFlaticon('fi fi-ts-paper-plane-top', {
            size: 18,
            color: '#000000',
        });

    const handleVoiceToggle = () => {
        const newState = !voiceEnabled;
        setVoiceEnabled(newState);
        onVoiceToggle?.(newState);
    };

    const handleSend = () => {
        if (message.trim()) {
            onSend?.(message.trim());
            setMessage('');
        }
    };

    return (
        <View
            style={applyTw(
                `px-4 pb-4 pt-2 bg-transparent ${className}`,
            )}
        >
            <View style={applyTw('flex-row items-center justify-center gap-3')}>

                {/* Plus Button */}
                <TouchableOpacity
                    style={applyTw(
                        'w-11 h-11 rounded-full bg-black border border-gray-700 items-center justify-center'
                    )}
                    activeOpacity={0.7}
                >
                    <PlusIcon />
                </TouchableOpacity>

                {/* Input Box */}
                <View
                    style={applyTw(
                        'flex-1 flex-row items-center bg-black rounded-full border border-gray-700 px-4 py-2'
                    )}
                >
                    <TextInput
                        value={message}
                        onChangeText={setMessage}
                        placeholder={voiceEnabled ? voicePlaceholder : placeholder}
                        placeholderTextColor="#9ca3af"
                        editable={!voiceEnabled}
                        style={applyTw('flex-1 text-white text-base')}
                        multiline={false}
                        maxLength={500}
                    />

                    {/* Voice Button */}
                    <TouchableOpacity
                        onPress={handleVoiceToggle}
                        activeOpacity={0.7}
                        style={applyTw(
                            `w-8 h-8 rounded-full items-center justify-center ml-2 ${voiceEnabled ? 'bg-gray-700' : 'bg-black'
                            }`
                        )}
                    >
                        <VoiceIcon />
                    </TouchableOpacity>
                </View>

                {/* Send Button */}
                {message.trim().length > 0 && !voiceEnabled && (
                    <TouchableOpacity
                        onPress={handleSend}
                        activeOpacity={0.7}
                        style={applyTw(
                            'w-11 h-11 rounded-full bg-white border border-gray-300 items-center justify-center'
                        )}
                    >
                        <SendIcon />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default AIInput;
