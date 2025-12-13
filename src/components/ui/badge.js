import React from 'react';
import { View } from 'react-native';
import { applyTw } from '../../style/style';
import { Text } from './text';

// Badge variant styles
const VARIANT_STYLES = {
    default: 'bg-white border-gray-300',
    secondary: 'bg-gray-700 border-gray-600',
    destructive: 'bg-red-600 border-red-500',
    outline: 'bg-transparent border-white',
    success: 'bg-green-600 border-green-500',
    warning: 'bg-amber-500 border-amber-400',
    info: 'bg-blue-600 border-blue-500',
};

// Text color for each variant
const TEXT_COLOR_STYLES = {
    default: 'text-black',
    secondary: 'text-white',
    destructive: 'text-white',
    outline: 'text-white',
    success: 'text-white',
    warning: 'text-black',
    info: 'text-white',
};

// Size styles
const SIZE_STYLES = {
    sm: 'px-2 py-0.5',
    md: 'px-2.5 py-1',
    lg: 'px-3 py-1.5',
};

const FONT_SIZE_STYLES = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
};

export const Badge = ({
    variant = 'default',
    size = 'md',
    rounded = false,
    children,
    icon,
    className = '',
}) => {
    const variantClass = VARIANT_STYLES[variant] || VARIANT_STYLES.default;
    const textColorClass = TEXT_COLOR_STYLES[variant] || TEXT_COLOR_STYLES.default;
    const sizeClass = SIZE_STYLES[size] || SIZE_STYLES.md;
    const fontSizeClass = FONT_SIZE_STYLES[size] || FONT_SIZE_STYLES.md;
    const roundedClass = rounded ? 'rounded-full' : 'rounded-md';

    return (
        <View
            style={applyTw(
                `flex-row items-center justify-center border ${roundedClass} ${variantClass} ${sizeClass} ${className}`
            )}
        >
            {icon && <View style={applyTw('mr-1')}>{icon}</View>}
            <Text
                style={applyTw(`${fontSizeClass} ${textColorClass} font-medium`)}
            >
                {children}
            </Text>
        </View>
    );
};

export const BadgeDemo = () => {
    const CheckIcon = () => (
        <Text style={applyTw('text-white text-xs')}>✓</Text>
    );

    return (
        <View style={applyTw('w-full gap-6')}>
            {/* Default Variants */}
            <View style={applyTw('gap-3')}>
                <Text style={applyTw('text-white text-lg font-semibold')}>
                    Variants
                </Text>
                <View style={applyTw('flex-row flex-wrap gap-2')}>
                    <Badge variant="default">Badge</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                </View>
            </View>

            {/* With Icons */}
            <View style={applyTw('gap-3')}>
                <Text style={applyTw('text-white text-lg font-semibold')}>
                    With Icon
                </Text>
                <View style={applyTw('flex-row flex-wrap gap-2')}>
                    <Badge variant="info" icon={<CheckIcon />} rounded>
                        Verified
                    </Badge>
                    <Badge variant="success" icon={<CheckIcon />} rounded>
                        Active
                    </Badge>
                </View>
            </View>

            {/* Circular Badges */}
            <View style={applyTw('gap-3')}>
                <Text style={applyTw('text-white text-lg font-semibold')}>
                    Circular (Counts)
                </Text>
                <View style={applyTw('flex-row flex-wrap gap-2')}>
                    <Badge variant="secondary" rounded size="sm">
                        8
                    </Badge>
                    <Badge variant="destructive" rounded size="md">
                        99
                    </Badge>
                    <Badge variant="outline" rounded>
                        20+
                    </Badge>
                </View>
            </View>

            {/* Sizes */}
            <View style={applyTw('gap-3')}>
                <Text style={applyTw('text-white text-lg font-semibold')}>
                    Sizes
                </Text>
                <View style={applyTw('flex-row items-center flex-wrap gap-2')}>
                    <Badge variant="secondary" size="sm">
                        Small
                    </Badge>
                    <Badge variant="secondary" size="md">
                        Medium
                    </Badge>
                    <Badge variant="secondary" size="lg">
                        Large
                    </Badge>
                </View>
            </View>

            {/* All Variants */}
            <View style={applyTw('gap-3')}>
                <Text style={applyTw('text-white text-lg font-semibold')}>
                    All Variants
                </Text>
                <View style={applyTw('flex-row flex-wrap gap-2')}>
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="info">Info</Badge>
                </View>
            </View>
        </View>
    );
};

export default BadgeDemo;
