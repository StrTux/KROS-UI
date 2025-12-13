import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { applyTw } from '../../style/style';
import { Text } from './text';

/**
 * Button Group Component for React Native
 * Groups multiple buttons together with various orientations and styles
 */

// Button Group Container
export const ButtonGroup = ({
    children,
    orientation = 'horizontal',
    className = '',
    ...props
}) => {
    const orientationStyles = orientation === 'vertical'
        ? 'flex-col'
        : 'flex-row';

    return (
        <View
            style={applyTw(`${orientationStyles} ${className}`)}
            {...props}
        >
            {children}
        </View>
    );
};

// Individual Button in Group
export const ButtonGroupItem = ({
    children,
    onPress,
    variant = 'default',
    position = 'middle', // 'first', 'middle', 'last', 'only'
    orientation = 'horizontal',
    size = 'md',
    icon,
    disabled = false,
    className = '',
    ...props
}) => {
    // Variant styles
    const variantStyles = {
        default: 'bg-gray-800 border-gray-700',
        outline: 'bg-transparent border-gray-600',
        secondary: 'bg-gray-700 border-gray-600',
        destructive: 'bg-red-600 border-red-500',
        ghost: 'bg-transparent border-transparent',
    };

    // Size styles
    const sizeStyles = {
        sm: 'px-3 py-1.5',
        md: 'px-4 py-2',
        lg: 'px-6 py-3',
    };

    // Position-based border radius (horizontal)
    const horizontalRadius = {
        first: 'rounded-l-lg rounded-r-none border-r-0',
        middle: 'rounded-none border-r-0',
        last: 'rounded-r-lg rounded-l-none',
        only: 'rounded-lg',
    };

    // Position-based border radius (vertical)
    const verticalRadius = {
        first: 'rounded-t-lg rounded-b-none border-b-0',
        middle: 'rounded-none border-b-0',
        last: 'rounded-b-lg rounded-t-none',
        only: 'rounded-lg',
    };

    const radiusStyle = orientation === 'vertical'
        ? verticalRadius[position]
        : horizontalRadius[position];

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.7}
            style={applyTw(
                `${variantStyles[variant]} ${sizeStyles[size]} ${radiusStyle} border flex-row items-center justify-center gap-2 ${disabled ? 'opacity-50' : ''
                } ${className}`
            )}
            {...props}
        >
            {icon && <View>{icon}</View>}
            {typeof children === 'string' ? (
                <Text className="text-white text-sm font-medium">{children}</Text>
            ) : (
                children
            )}
        </TouchableOpacity>
    );
};

// Button Group Separator
export const ButtonGroupSeparator = ({ orientation = 'horizontal' }) => {
    return (
        <View
            style={applyTw(
                orientation === 'vertical'
                    ? 'h-px bg-gray-700 w-full'
                    : 'w-px bg-gray-700 h-full'
            )}
        />
    );
};

// ==================== DEMO COMPONENT ====================

export const ButtonGroupDemo = () => {
    const [selectedOption, setSelectedOption] = useState('archive');

    // Icons using emojis (replace with actual icon library if needed)
    const BackIcon = () => <Text className="text-white">←</Text>;
    const ArchiveIcon = () => <Text className="text-white">📦</Text>;
    const ReportIcon = () => <Text className="text-white">⚠️</Text>;
    const SnoozeIcon = () => <Text className="text-white">💤</Text>;
    const MoreIcon = () => <Text className="text-white">⋯</Text>;
    const MarkReadIcon = () => <Text className="text-white">✉️</Text>;
    const CalendarIcon = () => <Text className="text-white">📅</Text>;
    const ListIcon = () => <Text className="text-white">📝</Text>;
    const TagIcon = () => <Text className="text-white">🏷️</Text>;
    const TrashIcon = () => <Text className="text-white">🗑️</Text>;
    const PlusIcon = () => <Text className="text-white">+</Text>;
    const MinusIcon = () => <Text className="text-white">−</Text>;

    return (
        <ScrollView
            style={applyTw('flex-1')}
            contentContainerStyle={applyTw('p-5 gap-8')}
        >
            {/* Header */}
            <View style={applyTw('gap-2')}>
                <Text className="text-white text-3xl font-bold">Button Group Component</Text>
                <Text className="text-gray-400 text-base">
                    Group multiple buttons together with various styles and orientations
                </Text>
            </View>

            {/* SECTION 1: Email Actions (matching uploaded image) */}
            <View style={applyTw('gap-4')}>
                <Text className="text-white text-xl font-semibold">
                    📧 Email Actions (Like Uploaded Image)
                </Text>
                <Text className="text-gray-400 text-sm">
                    Grouped buttons for email management with back button and action buttons
                </Text>

                <View style={applyTw('border-[#6f6f6fb9] bg-black border rounded-lg p-4 gap-4')}>
                    {/* Main Button Group */}
                    <ButtonGroup orientation="horizontal">
                        <ButtonGroupItem
                            onPress={() => console.log('Back')}
                            variant="outline"
                            position="first"
                            icon={<BackIcon />}
                            size="md"
                        />

                        <ButtonGroupItem
                            onPress={() => setSelectedOption('archive')}
                            variant={selectedOption === 'archive' ? 'secondary' : 'outline'}
                            position="middle"
                        >
                            Archive
                        </ButtonGroupItem>

                        <ButtonGroupItem
                            onPress={() => setSelectedOption('report')}
                            variant={selectedOption === 'report' ? 'secondary' : 'outline'}
                            position="middle"
                        >
                            Report
                        </ButtonGroupItem>

                        <ButtonGroupItem
                            onPress={() => setSelectedOption('snooze')}
                            variant={selectedOption === 'snooze' ? 'secondary' : 'outline'}
                            position="middle"
                        >
                            Snooze
                        </ButtonGroupItem>

                        <ButtonGroupItem
                            onPress={() => console.log('More options')}
                            variant="outline"
                            position="last"
                            icon={<MoreIcon />}
                        />
                    </ButtonGroup>

                    {/* Dropdown Menu Options */}
                    <View style={applyTw(' rounded-lg border border-gray-700 p-2')}>
                        <Text className="text-gray-400 text-xs mb-2 px-2">More Options:</Text>

                        <TouchableOpacity style={applyTw('flex-row items-center gap-3 px-3 py-2 rounded')}>
                            <MarkReadIcon />
                            <Text className="text-white text-sm">Mark as Read</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={applyTw('flex-row items-center gap-3 px-3 py-2 rounded')}>
                            <ArchiveIcon />
                            <Text className="text-white text-sm">Archive</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={applyTw('flex-row items-center gap-3 px-3 py-2 rounded')}>
                            <SnoozeIcon />
                            <Text className="text-white text-sm">Snooze</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={applyTw('flex-row items-center gap-3 px-3 py-2 rounded')}>
                            <CalendarIcon />
                            <Text className="text-white text-sm">Add to Calendar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={applyTw('flex-row items-center gap-3 px-3 py-2 rounded')}>
                            <ListIcon />
                            <Text className="text-white text-sm">Add to List</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={applyTw('flex-row items-center gap-3 px-3 py-2 rounded')}>
                            <TagIcon />
                            <View style={applyTw('flex-row items-center gap-1')}>
                                <Text className="text-white text-sm">Label As...</Text>
                                <Text className="text-gray-400">›</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={applyTw('h-px bg-gray-700 my-1')} />

                        <TouchableOpacity style={applyTw('flex-row items-center gap-3 px-3 py-2 rounded')}>
                            <TrashIcon />
                            <Text className="text-red-500 text-sm">Trash</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* SECTION 2: Basic Horizontal Group */}
            <View style={applyTw('gap-4')}>
                <Text className="text-white text-xl font-semibold">
                    ➡️ Basic Horizontal Group
                </Text>
                <Text className="text-gray-400 text-sm">
                    Simple horizontal button group - commonly used for option selection
                </Text>

                <View style={applyTw('border-[#6f6f6fb9] bg-black border rounded-lg p-4')}>
                    <ButtonGroup>
                        <ButtonGroupItem position="first" variant="outline">
                            Left
                        </ButtonGroupItem>
                        <ButtonGroupItem position="middle" variant="outline">
                            Center
                        </ButtonGroupItem>
                        <ButtonGroupItem position="last" variant="outline">
                            Right
                        </ButtonGroupItem>
                    </ButtonGroup>
                </View>
            </View>

            {/* SECTION 3: Vertical Group */}
            <View style={applyTw('gap-4')}>
                <Text className="text-white text-xl font-semibold">
                    ⬇️ Vertical Button Group
                </Text>
                <Text className="text-gray-400 text-sm">
                    Stacked buttons - useful for toolbars or compact interfaces
                </Text>

                <View style={applyTw('border-[#6f6f6fb9] bg-black border rounded-lg p-4 items-start')}>
                    <ButtonGroup orientation="vertical">
                        <ButtonGroupItem
                            position="first"
                            orientation="vertical"
                            variant="outline"
                            icon={<PlusIcon />}
                        >
                            Increment
                        </ButtonGroupItem>
                        <ButtonGroupItem
                            position="last"
                            orientation="vertical"
                            variant="outline"
                            icon={<MinusIcon />}
                        >
                            Decrement
                        </ButtonGroupItem>
                    </ButtonGroup>
                </View>
            </View>

            {/* SECTION 4: Size Variants */}
            <View style={applyTw('gap-4')}>
                <Text className="text-white text-xl font-semibold">
                    📏 Different Sizes
                </Text>
                <Text className="text-gray-400 text-sm">
                    Button groups in small, medium, and large sizes
                </Text>

                <View style={applyTw('border-[#6f6f6fb9] bg-black border rounded-lg p-4 gap-4')}>
                    {/* Small */}
                    <View>
                        <Text className="text-gray-400 text-xs mb-2">Small (sm)</Text>
                        <ButtonGroup>
                            <ButtonGroupItem position="first" size="sm" variant="outline">
                                Small
                            </ButtonGroupItem>
                            <ButtonGroupItem position="middle" size="sm" variant="outline">
                                Button
                            </ButtonGroupItem>
                            <ButtonGroupItem position="last" size="sm" variant="outline">
                                Group
                            </ButtonGroupItem>
                        </ButtonGroup>
                    </View>

                    {/* Medium */}
                    <View>
                        <Text className="text-gray-400 text-xs mb-2">Medium (md) - Default</Text>
                        <ButtonGroup>
                            <ButtonGroupItem position="first" size="md" variant="outline">
                                Medium
                            </ButtonGroupItem>
                            <ButtonGroupItem position="middle" size="md" variant="outline">
                                Button
                            </ButtonGroupItem>
                            <ButtonGroupItem position="last" size="md" variant="outline">
                                Group
                            </ButtonGroupItem>
                        </ButtonGroup>
                    </View>

                    {/* Large */}
                    <View>
                        <Text className="text-gray-400 text-xs mb-2">Large (lg)</Text>
                        <ButtonGroup>
                            <ButtonGroupItem position="first" size="lg" variant="outline">
                                Large
                            </ButtonGroupItem>
                            <ButtonGroupItem position="middle" size="lg" variant="outline">
                                Button
                            </ButtonGroupItem>
                            <ButtonGroupItem position="last" size="lg" variant="outline">
                                Group
                            </ButtonGroupItem>
                        </ButtonGroup>
                    </View>
                </View>
            </View>

            {/* SECTION 5: Variant Styles */}
            <View style={applyTw('gap-4')}>
                <Text className="text-white text-xl font-semibold">
                    🎨 Button Variants
                </Text>
                <Text className="text-gray-400 text-sm">
                    Different visual styles for various use cases
                </Text>

                <View style={applyTw('border-[#6f6f6fb9] bg-black border rounded-lg p-4 gap-4')}>
                    {/* Default */}
                    <View>
                        <Text className="text-gray-400 text-xs mb-2">Default - Standard gray background</Text>
                        <ButtonGroup>
                            <ButtonGroupItem position="first" variant="default">One</ButtonGroupItem>
                            <ButtonGroupItem position="middle" variant="default">Two</ButtonGroupItem>
                            <ButtonGroupItem position="last" variant="default">Three</ButtonGroupItem>
                        </ButtonGroup>
                    </View>

                    {/* Outline */}
                    <View>
                        <Text className="text-gray-400 text-xs mb-2">Outline - Transparent with border</Text>
                        <ButtonGroup>
                            <ButtonGroupItem position="first" variant="outline">One</ButtonGroupItem>
                            <ButtonGroupItem position="middle" variant="outline">Two</ButtonGroupItem>
                            <ButtonGroupItem position="last" variant="outline">Three</ButtonGroupItem>
                        </ButtonGroup>
                    </View>

                    {/* Secondary */}
                    <View>
                        <Text className="text-gray-400 text-xs mb-2">Secondary - Lighter gray</Text>
                        <ButtonGroup>
                            <ButtonGroupItem position="first" variant="secondary">One</ButtonGroupItem>
                            <ButtonGroupItem position="middle" variant="secondary">Two</ButtonGroupItem>
                            <ButtonGroupItem position="last" variant="secondary">Three</ButtonGroupItem>
                        </ButtonGroup>
                    </View>

                    {/* Destructive */}
                    <View>
                        <Text className="text-gray-400 text-xs mb-2">Destructive - For dangerous actions</Text>
                        <ButtonGroup>
                            <ButtonGroupItem position="first" variant="destructive">Delete</ButtonGroupItem>
                            <ButtonGroupItem position="middle" variant="destructive">Remove</ButtonGroupItem>
                            <ButtonGroupItem position="last" variant="destructive">Destroy</ButtonGroupItem>
                        </ButtonGroup>
                    </View>
                </View>
            </View>

            {/* SECTION 6: Icon Buttons */}
            <View style={applyTw('gap-4')}>
                <Text className="text-white text-xl font-semibold">
                    🎯 Icon Button Groups
                </Text>
                <Text className="text-gray-400 text-sm">
                    Icon-only buttons for compact toolbars
                </Text>

                <View style={applyTw('border-[#6f6f6fb9] bg-black border rounded-lg p-4')}>
                    <ButtonGroup>
                        <ButtonGroupItem
                            position="first"
                            variant="outline"
                            onPress={() => console.log('Plus')}
                        >
                            <PlusIcon />
                        </ButtonGroupItem>
                        <ButtonGroupItem
                            position="middle"
                            variant="outline"
                            onPress={() => console.log('Minus')}
                        >
                            <MinusIcon />
                        </ButtonGroupItem>
                        <ButtonGroupItem
                            position="last"
                            variant="outline"
                            onPress={() => console.log('More')}
                        >
                            <MoreIcon />
                        </ButtonGroupItem>
                    </ButtonGroup>
                </View>
            </View>

            {/* SECTION 7: With Separator */}
            <View style={applyTw('gap-4')}>
                <Text className="text-white text-xl font-semibold">
                    ➖ With Separators
                </Text>
                <Text className="text-gray-400 text-sm">
                    Visual separation between button groups
                </Text>

                <View style={applyTw('border-[#6f6f6fb9] bg-black border rounded-lg p-4')}>
                    <View style={applyTw('flex-row items-stretch')}>
                        <ButtonGroupItem position="first" variant="secondary">
                            Copy
                        </ButtonGroupItem>

                        <ButtonGroupSeparator />

                        <ButtonGroupItem position="last" variant="secondary">
                            Paste
                        </ButtonGroupItem>
                    </View>
                </View>
            </View>

            {/* Usage Guide */}
            <View style={applyTw('gap-3 mb-8')}>
                <Text className="text-white text-xl font-semibold">📚 Usage Guide</Text>
                <View style={applyTw('border-[#6f6f6fb9] bg-black border rounded-lg p-4 gap-3')}>
                    <Text className="text-white font-medium">When to use Button Groups:</Text>
                    <View style={applyTw('gap-2')}>
                        <Text className="text-gray-400 text-sm">• Email/messaging actions (archive, delete, snooze)</Text>
                        <Text className="text-gray-400 text-sm">• Text alignment tools (left, center, right)</Text>
                        <Text className="text-gray-400 text-sm">• View switchers (list, grid, kanban)</Text>
                        <Text className="text-gray-400 text-sm">• Pagination controls (prev, pages, next)</Text>
                        <Text className="text-gray-400 text-sm">• Toolbar actions (edit, share, more)</Text>
                        <Text className="text-gray-400 text-sm">• Number steppers (increment, decrement)</Text>
                    </View>
                </View>
            </View>
        </ScrollView >
    );
};

export default ButtonGroupDemo;
