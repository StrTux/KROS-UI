import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
} from 'react-native';
import { applyTw, roundedLeft, roundedRight } from '../../style/style';

// ==================== INPUT OTP COMPONENTS ====================

// Context for sharing state
const InputOTPContext = React.createContext(null);

// InputOTP Container - Main component
export const InputOTP = ({ children, maxLength = 6, value, onChange, pattern }) => {
    const [internalValue, setInternalValue] = useState(value || '');
    const inputRefs = useRef([]);

    const handleChange = (newValue) => {
        // Apply pattern if provided
        if (pattern && !pattern.test(newValue)) {
            return;
        }

        setInternalValue(newValue);
        onChange?.(newValue);
    };

    return (
        <InputOTPContext.Provider value={{
            value: value !== undefined ? value : internalValue,
            setValue: handleChange,
            maxLength,
            inputRefs
        }}>
            <View style={applyTw('flex-row items-center gap-2')}>
                {children}
            </View>
        </InputOTPContext.Provider>
    );
};

// InputOTP Group - Groups slots together (no gaps for connected look)
export const InputOTPGroup = ({ children, className = '' }) => {
    return (
        <View style={applyTw(`flex-row ${className}`)}>
            {children}
        </View>
    );
};

// InputOTP Slot - Individual digit input
export const InputOTPSlot = ({ index, isFirst, isLast, className = '' }) => {
    const context = React.useContext(InputOTPContext);
    const { value, setValue, maxLength, inputRefs } = context;
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        inputRefs.current[index] = inputRef.current;
    }, []);

    const handleChangeText = (text) => {
        const newValue = value.split('');
        newValue[index] = text;
        const finalValue = newValue.join('').slice(0, maxLength);

        setValue(finalValue);

        // Auto-focus next input
        if (text && index < maxLength - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = ({ nativeEvent }) => {
        // Handle backspace to focus previous
        if (nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const char = value[index] || '';

    // Apply rounded corners only to first and last boxes
    const cornerStyle = isFirst ? roundedLeft(8) : isLast ? roundedRight(8) : {};

    return (
        <View style={applyTw('relative -mr-[1px]')}>
            <TextInput
                ref={inputRef}
                value={char}
                onChangeText={handleChangeText}
                onKeyPress={handleKeyPress}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                maxLength={1}
                keyboardType="number-pad"
                style={[
                    applyTw(
                        `w-14 h-16 border border-[#333] text-white text-center text-2xl font-medium bg-[#0A0A0A] ${isFocused ? 'border-blue-500 z-10' : ''
                        } ${className}`
                    ),
                    cornerStyle
                ]}
                placeholderTextColor="#444"
            />
            {isFocused && !char && (
                <View style={applyTw('absolute inset-0 items-center justify-center pointer-events-none')}>
                    <View style={applyTw('w-0.5 h-8 bg-blue-500')} />
                </View>
            )}
        </View>
    );
};

// InputOTP Separator - Visual separator between groups
export const InputOTPSeparator = ({ children }) => {
    return (
        <View style={applyTw('mx-2')}>
            {children || <Text style={applyTw('text-gray-500 text-2xl font-bold')}>-</Text>}
        </View>
    );
};

// ==================== DEMO EXAMPLES ====================

// Example 1: 3-3 Format (like your first image)
const Example1 = () => {
    const [value, setValue] = useState('');

    return (
        <View style={applyTw('gap-4')}>
            <Text style={applyTw('text-white text-lg font-semibold')}>
                3-3 Format
            </Text>
            <InputOTP maxLength={6} value={value} onChange={setValue}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} isFirst />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} isLast />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={3} isFirst />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} isLast />
                </InputOTPGroup>
            </InputOTP>
            {value && (
                <Text style={applyTw('text-gray-400 text-sm')}>Value: {value}</Text>
            )}
        </View>
    );
};

// Example 2: 6 Digits No Separator (like your second image)
const Example2 = () => {
    const [value, setValue] = useState('');

    return (
        <View style={applyTw('gap-4')}>
            <Text style={applyTw('text-white text-lg font-semibold')}>
                6 Digits Continuous
            </Text>
            <InputOTP maxLength={6} value={value} onChange={setValue}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} isFirst />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} isLast />
                </InputOTPGroup>
            </InputOTP>
            <Text style={applyTw('text-gray-400 text-sm text-center')}>
                Enter your one-time password.
            </Text>
        </View>
    );
};

// Example 3: 2-2-2 Format (like your third image)
const Example3 = () => {
    const [value, setValue] = useState('');

    return (
        <View style={applyTw('gap-4')}>
            <Text style={applyTw('text-white text-lg font-semibold')}>
                2-2-2 Format
            </Text>
            <InputOTP maxLength={6} value={value} onChange={setValue}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} isFirst />
                    <InputOTPSlot index={1} isLast />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={2} isFirst />
                    <InputOTPSlot index={3} isLast />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={4} isFirst />
                    <InputOTPSlot index={5} isLast />
                </InputOTPGroup>
            </InputOTP>
        </View>
    );
};

// Example 4: 4 Digits Only
const Example4 = () => {
    const [value, setValue] = useState('');

    return (
        <View style={applyTw('gap-4')}>
            <Text style={applyTw('text-white text-lg font-semibold')}>
                4 Digits PIN
            </Text>
            <InputOTP maxLength={4} value={value} onChange={setValue}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} isFirst />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} isLast />
                </InputOTPGroup>
            </InputOTP>
        </View>
    );
};

// Example 5: 5 Digits
const Example5 = () => {
    const [value, setValue] = useState('');

    return (
        <View style={applyTw('gap-4')}>
            <Text style={applyTw('text-white text-lg font-semibold')}>
                5 Digits Code
            </Text>
            <InputOTP maxLength={5} value={value} onChange={setValue}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} isFirst />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} isLast />
                </InputOTPGroup>
            </InputOTP>
        </View>
    );
};

// Example 6: Custom Separator
const Example6 = () => {
    const [value, setValue] = useState('');

    return (
        <View style={applyTw('gap-4')}>
            <Text style={applyTw('text-white text-lg font-semibold')}>
                Custom Separator (Dot)
            </Text>
            <InputOTP maxLength={6} value={value} onChange={setValue}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} isFirst />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator>
                    <Text style={applyTw('text-blue-500 text-2xl font-bold')}>•</Text>
                </InputOTPSeparator>
                <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} isLast />
                </InputOTPGroup>
            </InputOTP>
        </View>
    );
};

export const InputOTPDemo = () => {
    return (
        <ScrollView
            style={applyTw('flex-1 bg-black')}
            contentContainerStyle={applyTw('p-5 gap-8')}
        >
            {/* Header */}
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>
                    InputOTP Component
                </Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    Flexible OTP input - customize digits, groups, and separators
                </Text>
            </View>

            {/* Examples */}
            <View style={applyTw('gap-6')}>
                <Example1 />
                <View style={applyTw('h-px bg-[#222]')} />

                <Example2 />
                <View style={applyTw('h-px bg-[#222]')} />

                <Example3 />
                <View style={applyTw('h-px bg-[#222]')} />

                <Example4 />
                <View style={applyTw('h-px bg-[#222]')} />

                <Example5 />
                <View style={applyTw('h-px bg-[#222]')} />

                <Example6 />
            </View>

            {/* Usage Guide */}
            <View style={applyTw('bg-[#111] rounded-lg p-4 border border-[#222] mt-4 mb-8')}>
                <Text style={applyTw('text-white text-lg font-semibold mb-3')}>
                    💡 How to Use
                </Text>
                <Text style={applyTw('text-gray-300 text-sm mb-2')}>
                    The component is fully customizable:
                </Text>
                <View style={applyTw('gap-2 ml-2')}>
                    <Text style={applyTw('text-gray-400 text-sm')}>
                        • Change <Text style={applyTw('text-blue-400')}>maxLength</Text> for different digit counts
                    </Text>
                    <Text style={applyTw('text-gray-400 text-sm')}>
                        • Use <Text style={applyTw('text-blue-400')}>InputOTPGroup</Text> to group slots
                    </Text>
                    <Text style={applyTw('text-gray-400 text-sm')}>
                        • Add <Text style={applyTw('text-blue-400')}>InputOTPSeparator</Text> between groups
                    </Text>
                    <Text style={applyTw('text-gray-400 text-sm')}>
                        • Customize separator content (-, •, etc.)
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default InputOTPDemo;
