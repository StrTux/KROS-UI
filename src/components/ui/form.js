import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Animated,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { applyTw } from '../../style/style';

// ==================== PRIMITIVE COMPONENTS ====================

// Label Component
export const Label = ({ children, className = '', ...props }) => {
    return (
        <Text
            style={applyTw(`text-sm font-medium text-white mb-2 ${className}`)}
            {...props}
        >
            {children}
        </Text>
    );
};

// Input Component with Focus Glow Animation
export const Input = React.forwardRef(({ className = '', ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const glowAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(glowAnim, {
            toValue: isFocused ? 1 : 0,
            duration: 200,
            useNativeDriver: false, // Color interpolation doesn't support native driver
        }).start();
    }, [isFocused]);

    const borderColor = glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#2A2A2A', '#3b82f6'], // Gray to Blue
    });

    const shadowOpacity = glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
    });

    return (
        <Animated.View
            style={[
                applyTw('rounded-lg bg-[#0A0A0A]'),
                {
                    borderWidth: 1,
                    borderColor: borderColor,
                    shadowColor: '#3b82f6',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: shadowOpacity,
                    shadowRadius: 8,
                    elevation: isFocused ? 5 : 0,
                },
            ]}
        >
            <TextInput
                ref={ref}
                style={applyTw(
                    `h-12 px-4 text-white text-base ${className}`
                )}
                placeholderTextColor="#666"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...props}
            />
        </Animated.View>
    );
});

// Helper for Gradient Text (mocked with simple color for now, can be enhanced)
const GradientText = ({ children, style }) => (
    <Text style={[applyTw('text-white font-bold'), style]}>{children}</Text>
);

// ==================== DEMO FORMS ====================

// Login Form
export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        Alert.alert('Login Attempt', `Email: ${email}\nPassword: ${password}`);
    };

    return (
        <View style={applyTw('bg-[#111] p-6 rounded-2xl border border-[#222]')}>
            <View style={applyTw('mb-6')}>
                <Text style={applyTw('text-2xl font-bold text-white mb-1')}>Welcome Back</Text>
                <Text style={applyTw('text-gray-400 text-sm')}>Enter your credentials to access your account</Text>
            </View>

            <View style={applyTw('gap-4')}>
                <View>
                    <Label>Email Address</Label>
                    <Input
                        placeholder="name@example.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View>
                    <Label>Password</Label>
                    <Input
                        placeholder="••••••••"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Reset link sent!')}>
                    <Text style={applyTw('text-blue-500 text-xs text-right font-medium')}>
                        Forgot password?
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={applyTw('bg-white h-12 rounded-lg items-center justify-center mt-2')}
                    onPress={handleLogin}
                    activeOpacity={0.9}
                >
                    <Text style={applyTw('text-black font-bold text-base')}>Sign In</Text>
                </TouchableOpacity>

                <View style={applyTw('flex-row justify-center mt-4')}>
                    <Text style={applyTw('text-gray-400 text-sm')}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => Alert.alert('Switch', 'Use the tabs above to switch to Sign Up')}>
                        <Text style={applyTw('text-white font-bold text-sm')}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

// Signup Form
export const SignupForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleSignup = () => {
        Alert.alert('Signup Attempt', JSON.stringify(formData, null, 2));
    };

    return (
        <View style={applyTw('bg-[#111] p-6 rounded-2xl border border-[#222]')}>
            <View style={applyTw('mb-6')}>
                <Text style={applyTw('text-2xl font-bold text-white mb-1')}>Create Account</Text>
                <Text style={applyTw('text-gray-400 text-sm')}>Join us and start building today</Text>
            </View>

            <View style={applyTw('gap-4')}>
                <View style={applyTw('flex-row gap-4')}>
                    <View style={applyTw('flex-1')}>
                        <Label>First Name</Label>
                        <Input
                            placeholder="John"
                            value={formData.firstName}
                            onChangeText={(t) => setFormData({ ...formData, firstName: t })}
                        />
                    </View>
                    <View style={applyTw('flex-1')}>
                        <Label>Last Name</Label>
                        <Input
                            placeholder="Doe"
                            value={formData.lastName}
                            onChangeText={(t) => setFormData({ ...formData, lastName: t })}
                        />
                    </View>
                </View>

                <View>
                    <Label>Email Address</Label>
                    <Input
                        placeholder="name@example.com"
                        value={formData.email}
                        onChangeText={(t) => setFormData({ ...formData, email: t })}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View>
                    <Label>Password</Label>
                    <Input
                        placeholder="••••••••"
                        value={formData.password}
                        onChangeText={(t) => setFormData({ ...formData, password: t })}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity
                    style={applyTw('bg-blue-600 h-12 rounded-lg items-center justify-center mt-2 border border-blue-500')}
                    onPress={handleSignup}
                    activeOpacity={0.9}
                >
                    <Text style={applyTw('text-white font-bold text-base')}>Create Account</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={applyTw('bg-[#222] h-12 rounded-lg items-center justify-center flex-row gap-2 border border-[#333]')}
                    onPress={() => Alert.alert('Github', 'Github Auth')}
                    activeOpacity={0.9}
                >
                    {/* GitHub Icon Placeholder */}
                    <Text style={applyTw('text-white font-medium')}>Continue with GitHub</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Main Demo Component
export const FormDemo = () => {
    const [activeTab, setActiveTab] = useState('login'); // 'login' | 'signup'

    return (
        <View style={applyTw('gap-6')}>
            {/* Switcher */}
            <View style={applyTw('bg-[#111] p-1 rounded-lg flex-row border border-[#222]')}>
                <TouchableOpacity
                    style={applyTw(
                        `flex-1 py-2 rounded-md items-center ${activeTab === 'login' ? 'bg-[#2A2A2A]' : 'bg-transparent'
                        }`
                    )}
                    onPress={() => setActiveTab('login')}
                >
                    <Text
                        style={applyTw(
                            `text-sm font-medium ${activeTab === 'login' ? 'text-white' : 'text-gray-500'
                            }`
                        )}
                    >
                        Login
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={applyTw(
                        `flex-1 py-2 rounded-md items-center ${activeTab === 'signup' ? 'bg-[#2A2A2A]' : 'bg-transparent'
                        }`
                    )}
                    onPress={() => setActiveTab('signup')}
                >
                    <Text
                        style={applyTw(
                            `text-sm font-medium ${activeTab === 'signup' ? 'text-white' : 'text-gray-500'
                            }`
                        )}
                    >
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Content */}
            {activeTab === 'login' ? <LoginForm /> : <SignupForm />}
        </View>
    );
};

export default FormDemo;
