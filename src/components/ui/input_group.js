import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { applyTw } from '../../style/style';
import { renderFlaticon } from '../../functions/iconUtils';

// ==================== INPUT GROUP COMPONENTS ====================

// InputGroup Container
export const InputGroup = ({ children, className = '' }) => {
    return (
        <View style={applyTw(`flex-row items-center bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg overflow-hidden ${className}`)}>
            {children}
        </View>
    );
};

// InputGroup Input
export const InputGroupInput = ({ className = '', ...props }) => {
    return (
        <TextInput
            style={applyTw(`flex-1 h-12 px-4 text-white text-base ${className}`)}
            placeholderTextColor="#666"
            {...props}
        />
    );
};

// InputGroup Addon (icons, text, buttons on left/right)
export const InputGroupAddon = ({ children, align = 'left', className = '' }) => {
    const alignStyle = align === 'right' ? 'ml-auto' : '';
    return (
        <View style={applyTw(`px-3 flex-row items-center gap-2 ${alignStyle} ${className}`)}>
            {children}
        </View>
    );
};

// InputGroup Button
export const InputGroupButton = ({ children, onPress, className = '' }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={applyTw(`px-3 py-1.5 rounded-md bg-[#222] ${className}`)}
            activeOpacity={0.7}
        >
            {typeof children === 'string' ? (
                <Text style={applyTw('text-white text-sm font-medium')}>{children}</Text>
            ) : children}
        </TouchableOpacity>
    );
};

// InputGroup Text
export const InputGroupText = ({ children, className = '' }) => {
    return (
        <Text style={applyTw(`text-gray-400 text-sm ${className}`)}>
            {children}
        </Text>
    );
};

// ==================== DEMO COMPONENT ====================

export const InputGroupDemo = () => {
    const [search, setSearch] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [cardNumber, setCardNumber] = useState('');

    return (
        <ScrollView
            style={applyTw('flex-1')}
            contentContainerStyle={applyTw('p-5 gap-8')}
        >
            {/* Header */}
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>
                    InputGroup Component
                </Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    Enhanced inputs with icons, buttons, and text addons
                </Text>
            </View>

            {/* Section 1: Search Input */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>
                    🔍 Search Input
                </Text>

                <InputGroup>
                    <InputGroupInput
                        placeholder="Search..."
                        value={search}
                        onChangeText={setSearch}
                    />
                    <InputGroupAddon align="right">
                        {renderFlaticon('fi fi-rr-search', { size: 18, color: '#999' })}
                    </InputGroupAddon>
                    <InputGroupAddon align="right">
                        <InputGroupText>12 results</InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
            </View>

            {/* Section 2: Email Input with Icon */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>
                    ✉️ Email Input
                </Text>

                <InputGroup>
                    <InputGroupAddon>
                        {renderFlaticon('fi fi-rr-envelope', { size: 18, color: '#999' })}
                    </InputGroupAddon>
                    <InputGroupInput
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </InputGroup>
            </View>

            {/* Section 3: Username with Validation */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>
                    👤 Username Validation
                </Text>

                <InputGroup>
                    <InputGroupInput
                        placeholder="@username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <InputGroupAddon align="right">
                        {username.length > 3 ? (
                            <View style={applyTw('w-5 h-5 bg-green-600 rounded-full items-center justify-center')}>
                                {renderFlaticon('fi fi-rr-check', { size: 12, color: '#fff' })}
                            </View>
                        ) : null}
                    </InputGroupAddon>
                </InputGroup>
            </View>

            {/* Section 4: Card Number with Button */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>
                    💳 Card Number
                </Text>

                <InputGroup>
                    <InputGroupAddon>
                        {renderFlaticon('fi fi-rr-credit-card', { size: 18, color: '#999' })}
                    </InputGroupAddon>
                    <InputGroupInput
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChangeText={setCardNumber}
                        keyboardType="numeric"
                    />
                    <InputGroupAddon align="right">
                        <InputGroupButton onPress={() => setCardNumber('')}>
                            Clear
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </View>

            {/* Section 5: URL Input */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>
                    🔗 URL Input
                </Text>

                <InputGroup>
                    <InputGroupAddon>
                        <InputGroupText>https://</InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput
                        placeholder="example.com"
                        autoCapitalize="none"
                    />
                </InputGroup>
            </View>

            {/* Features */}
            <View style={applyTw('bg-[#111] rounded-lg p-4 gap-3 border border-[#222] mb-8')}>
                <Text style={applyTw('text-white text-xl font-semibold mb-2')}>
                    ✨ Features
                </Text>

                <View style={applyTw('flex-row items-start gap-3')}>
                    <Text style={applyTw('text-blue-500 text-lg')}>📍</Text>
                    <View style={applyTw('flex-1')}>
                        <Text style={applyTw('text-white font-medium mb-1')}>
                            Flexible Addons
                        </Text>
                        <Text style={applyTw('text-gray-400 text-sm')}>
                            Add icons, text, or buttons on either side
                        </Text>
                    </View>
                </View>

                <View style={applyTw('flex-row items-start gap-3')}>
                    <Text style={applyTw('text-blue-500 text-lg')}>🎨</Text>
                    <View style={applyTw('flex-1')}>
                        <Text style={applyTw('text-white font-medium mb-1')}>
                            Dark Theme
                        </Text>
                        <Text style={applyTw('text-gray-400 text-sm')}>
                            Consistent with app design system
                        </Text>
                    </View>
                </View>

                <View style={applyTw('flex-row items-start gap-3')}>
                    <Text style={applyTw('text-blue-500 text-lg')}>⚡</Text>
                    <View style={applyTw('flex-1')}>
                        <Text style={applyTw('text-white font-medium mb-1')}>
                            Interactive Elements
                        </Text>
                        <Text style={applyTw('text-gray-400 text-sm')}>
                            Buttons and status indicators
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default InputGroupDemo;
