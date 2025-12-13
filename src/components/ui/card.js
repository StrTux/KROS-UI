import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { applyTw } from '../../style/style';
import { Text } from './text';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';

/**
 * Card Component System for React Native
 * Container for content with consistent styling
 */

// Main Card Container
export const Card = ({ children, className = '' }) => {
    return (
        <View style={applyTw(`bg-[#1e1e1e90] border border-[#ffffff40] rounded-2xl ${className}`)}>
            {children}
        </View>
    );
};

// Card Header
export const CardHeader = ({ children, className = '' }) => {
    return (
        <View style={applyTw(`p-6 ${className}`)}>
            {children}
        </View>
    );
};

// Card Title
export const CardTitle = ({ children, className = '' }) => {
    return (
        <Text style={applyTw(`text-white text-2xl font-bold mb-2 ${className}`)}>
            {children}
        </Text>
    );
};

// Card Description
export const CardDescription = ({ children, className = '' }) => {
    return (
        <Text style={applyTw(`text-gray-400 text-sm ${className}`)}>
            {children}
        </Text>
    );
};

// Card Action (for header actions like Sign Up button)
export const CardAction = ({ children, className = '' }) => {
    return (
        <View style={applyTw(`absolute top-6 right-6 ${className}`)}>
            {children}
        </View>
    );
};

// Card Content
export const CardContent = ({ children, className = '' }) => {
    return (
        <View style={applyTw(`px-6 pb-6 ${className}`)}>
            {children}
        </View>
    );
};

// Card Footer
export const CardFooter = ({ children, className = '' }) => {
    return (
        <View style={applyTw(`p-6 pt-0 ${className}`)}>
            {children}
        </View>
    );
};

// ==================== DEMO COMPONENT ====================

export const CardDemo = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Login:', { email, password });
    };

    const handleGoogleLogin = () => {
        console.log('Login with Google');
    };

    return (
        <ScrollView
            style={applyTw('flex-1')}
            contentContainerStyle={applyTw('p-5 gap-8')}
        >
            {/* Header */}
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>
                    Card Component
                </Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    Versatile card container for content
                </Text>
            </View>

            {/* SECTION 1: Login Card - Matching Reference Image */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>
                    🔐 Login Card
                </Text>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Login form card matching reference design
                </Text>

                <Card className="max-w-md">
                    <CardHeader>
                        <CardTitle>Login to your account</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
                        </CardDescription>
                        <CardAction>
                            <Button variant="link" size="sm">
                                Sign Up
                            </Button>
                        </CardAction>
                    </CardHeader>

                    <CardContent>
                        <View style={applyTw('gap-6')}>
                            {/* Email Field */}
                            <View style={applyTw('gap-2')}>
                                <Label>Email</Label>
                                <Input
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder="m@example.com"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            {/* Password Field */}
                            <View style={applyTw('gap-2')}>
                                <View style={applyTw('flex-row items-center justify-between')}>
                                    <Label>Password</Label>
                                    <TouchableOpacity>
                                        <Text style={applyTw('text-white text-sm')}>
                                            Forgot your password?
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <Input
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="••••••••"
                                    secureTextEntry
                                />
                            </View>
                        </View>
                    </CardContent>

                    <CardFooter className="gap-2">
                        <Button
                            variant="default"
                            onPress={handleLogin}
                            className="w-full"
                        >
                            Login
                        </Button>
                        <Button
                            variant="outline"
                            onPress={handleGoogleLogin}
                            className="w-full"
                        >
                            Login with Google
                        </Button>
                    </CardFooter>
                </Card>
            </View>

            {/* SECTION 2: Simple Card */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>
                    📄 Simple Card
                </Text>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Basic card with title and content
                </Text>

                <Card>
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>
                            This is a simple card description
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Text style={applyTw('text-white')}>
                            Card content goes here. You can add any content you want inside the card.
                        </Text>
                    </CardContent>
                </Card>
            </View>

            {/* SECTION 3: Card with Footer */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>
                    ⚡ Card with Actions
                </Text>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Card with footer buttons
                </Text>

                <Card>
                    <CardHeader>
                        <CardTitle>Confirm Action</CardTitle>
                        <CardDescription>
                            Are you sure you want to continue?
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Text style={applyTw('text-white mb-2')}>
                            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                        </Text>
                    </CardContent>
                    <CardFooter className="flex-row gap-2">
                        <Button variant="outline" className="flex-1">
                            Cancel
                        </Button>
                        <Button variant="default" className="flex-1">
                            Continue
                        </Button>
                    </CardFooter>
                </Card>
            </View>
        </ScrollView>
    );
};

export default Card;
