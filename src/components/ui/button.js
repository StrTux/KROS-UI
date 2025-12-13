import React from 'react';
import { TouchableOpacity, View, ActivityIndicator, ScrollView } from 'react-native';
import { applyTw } from '../../style/style';
import { Text } from './text';
import { renderFlaticon } from '../../functions/iconUtils';

/**
 * Button Component for React Native
 * Supports multiple variants, sizes, and icons
 */

// Button variant styles
const VARIANT_STYLES = {
    default: 'bg-white border-gray-300',
    destructive: 'bg-red-600 border-red-600',
    outline: 'bg-transparent border-gray-600',
    secondary: 'bg-gray-700 border-gray-700',
    ghost: 'bg-transparent border-transparent',
    link: 'bg-transparent border-transparent',
};

// Text color styles for variants
const TEXT_VARIANT_STYLES = {
    default: 'text-black',
    destructive: 'text-white',
    outline: 'text-white',
    secondary: 'text-white',
    ghost: 'text-white',
    link: 'text-white',
};

// Size styles
const SIZE_STYLES = {
    sm: 'h-8 px-3 py-1.5',
    default: 'h-9 px-4 py-2',
    lg: 'h-10 px-6 py-3',
    icon: 'w-9 h-9',
    'icon-sm': 'w-8 h-8',
    'icon-lg': 'w-10 h-10',
};

// Text size styles
const TEXT_SIZE_STYLES = {
    sm: 'text-sm',
    default: 'text-sm',
    lg: 'text-base',
    icon: 'text-base',
    'icon-sm': 'text-sm',
    'icon-lg': 'text-lg',
};

export const Button = ({
    children,
    variant = 'default',
    size = 'default',
    icon,
    iconPosition = 'left',
    onPress,
    disabled = false,
    loading = false,
    className = '',
    ...props
}) => {
    const variantClass = VARIANT_STYLES[variant] || VARIANT_STYLES.default;
    const textVariantClass = TEXT_VARIANT_STYLES[variant] || TEXT_VARIANT_STYLES.default;
    const sizeClass = SIZE_STYLES[size] || SIZE_STYLES.default;
    const textSizeClass = TEXT_SIZE_STYLES[size] || TEXT_SIZE_STYLES.default;

    const isIconOnly = size.includes('icon');

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
            style={applyTw(
                `${variantClass} ${sizeClass} border rounded-md items-center justify-center flex-row gap-2 ${disabled ? 'opacity-50' : ''
                } ${className}`
            )}
            {...props}
        >
            {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
            ) : (
                <>
                    {icon && iconPosition === 'left' && !isIconOnly && (
                        <View>{icon}</View>
                    )}
                    {isIconOnly && icon ? (
                        <View>{icon}</View>
                    ) : (
                        typeof children === 'string' ? (
                            <Text style={applyTw(`${textVariantClass} ${textSizeClass} font-medium`)}>
                                {children}
                            </Text>
                        ) : (
                            children
                        )
                    )}
                    {icon && iconPosition === 'right' && !isIconOnly && (
                        <View>{icon}</View>
                    )}
                </>
            )}
        </TouchableOpacity>
    );
};

// ==================== DEMO COMPONENT ====================

export const ButtonDemo = () => {
    // Icons using custom font
    const ArrowUpIcon = () => renderFlaticon('fi fi-tr-arrow-up', { size: 16, color: '#4e4949ff' });
    const ArrowRightIcon = () => renderFlaticon('fi fi-tr-arrow-right', { size: 16, color: '#ffffff' });
    const CheckIcon = () => renderFlaticon('fi fi-tr-check', { size: 16, color: '#ffffff' });
    const TrashIcon = () => renderFlaticon('fi fi-tr-trash-xmark', { size: 16, color: '#ffffff' });
    const DownloadIcon = () => renderFlaticon('fi fi-tr-download', { size: 16, color: '#ffffff' });
    const HeartIcon = () => renderFlaticon('fi fi-tr-heart', { size: 16, color: '#ffffff' });
    const StarIcon = () => renderFlaticon('fi fi-tr-star', { size: 16, color: '#ffffff' });
    const PlusIcon = () => renderFlaticon('fi fi-tr-plus', { size: 16, color: '#ffffff' });

    return (
        <ScrollView
            style={applyTw('flex-1')}
            contentContainerStyle={applyTw('p-5 gap-8')}
        >
            {/* Header */}
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Button Component</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    Versatile button component with variants, sizes, and icon support
                </Text>
            </View>

            {/* SECTION 1: Variants */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>
                    🎨 Button Variants
                </Text>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Different visual styles for various use cases
                </Text>

                <View style={applyTw('bg-black border border-[#ffffff40] rounded-lg p-4 gap-3')}>
                    <View style={applyTw('gap-2')}>
                        <Text style={applyTw('text-gray-400 text-xs')}>Default - Primary action</Text>
                        <Button variant="default" onPress={() => console.log('Default')}>
                            Default Button
                        </Button>
                    </View>

                    <View style={applyTw('gap-2')}>
                        <Text style={applyTw('text-gray-400 text-xs')}>Destructive - Dangerous actions</Text>
                        <Button variant="destructive" onPress={() => console.log('Destructive')}>
                            Delete Item
                        </Button>
                    </View>

                    <View style={applyTw('gap-2')}>
                        <Text style={applyTw('text-gray-400 text-xs')}>Outline - Secondary action</Text>
                        <Button variant="outline" onPress={() => console.log('Outline')}>
                            Cancel
                        </Button>
                    </View>

                    <View style={applyTw('gap-2')}>
                        <Text style={applyTw('text-gray-400 text-xs')}>Secondary - Alternative style</Text>
                        <Button variant="secondary" onPress={() => console.log('Secondary')}>
                            Secondary
                        </Button>
                    </View>

                    <View style={applyTw('gap-2')}>
                        <Text style={applyTw('text-gray-400 text-xs')}>Ghost - Minimal style</Text>
                        <Button variant="ghost" onPress={() => console.log('Ghost')}>
                            Ghost Button
                        </Button>
                    </View>

                    <View style={applyTw('gap-2')}>
                        <Text style={applyTw('text-gray-400 text-xs')}>Link - Text link style</Text>
                        <Button variant="link" onPress={() => console.log('Link')}>
                            Learn More
                        </Button>
                    </View>
                </View>
            </View>

            {/* SECTION 2: Sizes */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>
                    📏 Button Sizes
                </Text>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Small, default, and large sizes
                </Text>

                <View style={applyTw('bg-black rounded-lg p-4 gap-3')}>
                    <View style={applyTw('gap-2')}>
                        <Text style={applyTw('text-gray-400 text-xs')}>Small (sm)</Text>
                        <Button variant="outline" size="sm" onPress={() => console.log('Small')}>
                            Small Button
                        </Button>
                    </View>

                    <View style={applyTw('gap-2')}>
                        <Text style={applyTw('text-gray-400 text-xs')}>Default</Text>
                        <Button variant="outline" onPress={() => console.log('Default')}>
                            Default Button
                        </Button>
                    </View>

                    <View style={applyTw('gap-2')}>
                        <Text style={applyTw('text-gray-400 text-xs')}>Large (lg)</Text>
                        <Button variant="outline" size="lg" onPress={() => console.log('Large')}>
                            Large Button
                        </Button>
                    </View>
                </View>
            </View>

            {/* SECTION 3: With Icons */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>
                    🎯 Buttons with Icons
                </Text>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Icons can be positioned left or right
                </Text>

                <View style={applyTw('bg-black rounded-lg p-4 gap-3')}>
                    <View style={applyTw('gap-2')}>
                        <Text style={applyTw('text-gray-400 text-xs')}>Icon on Left</Text>
                        <Button
                            variant="default"
                            icon={<DownloadIcon />}
                            iconPosition="left"
                            onPress={() => console.log('Download')}
                        >
                            Download File
                        </Button>
                    </View>

                    <View style={applyTw('gap-2')}>
                        <Text style={applyTw('text-gray-400 text-xs')}>Icon on Right</Text>
                        <Button
                            variant="outline"
                            icon={<ArrowRightIcon />}
                            iconPosition="right"
                            onPress={() => console.log('Next')}
                        >
                            Continue
                        </Button>
                    </View>

                    <View style={applyTw('gap-2')}>
                        <Text style={applyTw('text-gray-400 text-xs')}>Multiple Icon Buttons</Text>
                        <View style={applyTw('flex-row gap-2 flex-wrap')}>
                            <Button
                                variant="secondary"
                                size="sm"
                                icon={<CheckIcon />}
                                iconPosition="left"
                            >
                                Approve
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                icon={<TrashIcon />}
                                iconPosition="left"
                            >
                                Delete
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                icon={<HeartIcon />}
                                iconPosition="left"
                            >
                                Like
                            </Button>
                        </View>
                    </View>
                </View>
            </View>

            {/* SECTION 4: Icon Only Buttons */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>
                    ⭐ Icon-Only Buttons
                </Text>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Compact buttons with only icons
                </Text>

                <View style={applyTw('bg-black rounded-lg p-4 gap-4')}>
                    <View style={applyTw('gap-2')}>
                        <Text style={applyTw('text-gray-400 text-xs')}>Small Icon Buttons</Text>
                        <View style={applyTw('flex-row gap-2')}>
                            <Button variant="outline" size="icon-sm" icon={<ArrowUpIcon />} />
                            <Button variant="outline" size="icon-sm" icon={<CheckIcon />} />
                            <Button variant="outline" size="icon-sm" icon={<TrashIcon />} />
                            <Button variant="outline" size="icon-sm" icon={<HeartIcon />} />
                        </View>
                    </View>

                    <View style={applyTw('gap-2')}>
                        <Text style={applyTw('text-gray-400 text-xs')}>Default Icon Buttons</Text>
                        <View style={applyTw('flex-row gap-2')}>
                            <Button variant="default" size="icon" icon={<ArrowUpIcon />} />
                            <Button variant="destructive" size="icon" icon={<TrashIcon />} />
                            <Button variant="outline" size="icon" icon={<HeartIcon />} />
                            <Button variant="secondary" size="icon" icon={<StarIcon />} />
                        </View>
                    </View>

                    <View style={applyTw('gap-2')}>
                        <Text style={applyTw('text-gray-400 text-xs')}>Large Icon Buttons</Text>
                        <View style={applyTw('flex-row gap-2')}>
                            <Button variant="outline" size="icon-lg" icon={<ArrowUpIcon />} />
                            <Button variant="outline" size="icon-lg" icon={<CheckIcon />} />
                            <Button variant="outline" size="icon-lg" icon={<PlusIcon />} />
                        </View>
                    </View>
                </View>
            </View>

            {/* SECTION 5: Button States */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>
                    ⚙️ Button States
                </Text>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Loading and disabled states
                </Text>

                <View style={applyTw('bg-black border border-[#ffffff40] rounded-lg p-4 gap-3')}>
                    <View style={applyTw('gap-2')}>
                        <Text style={applyTw('text-gray-400 text-xs')}>Loading State</Text>
                        <Button variant="default" loading={true}>
                            Processing...
                        </Button>
                    </View>

                    <View style={applyTw('gap-2')}>
                        <Text style={applyTw('text-gray-400 text-xs')}>Disabled State</Text>
                        <Button variant="outline" disabled={true}>
                            Unavailable
                        </Button>
                    </View>
                </View>
            </View>

            {/* SECTION 6: Real World Examples */}
            <View style={applyTw('gap-4 mb-8')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>
                    💼 Real-World Examples
                </Text>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Common button combinations
                </Text>

                <View style={applyTw('bg-black rounded-lg p-4 gap-4')}>
                    {/* Action Buttons */}
                    <View style={applyTw('gap-2')}>
                        <Text style={applyTw('text-white font-medium')}>Form Actions</Text>
                        <View style={applyTw('flex-row gap-2')}>
                            <Button variant="default" icon={<CheckIcon />} className="flex-1">
                                Submit
                            </Button>
                            <Button variant="outline" className="flex-1">
                                Cancel
                            </Button>
                        </View>
                    </View>

                    {/* Destructive Confirmation */}
                    <View style={applyTw('gap-2')}>
                        <Text style={applyTw('text-white font-medium')}>Delete Confirmation</Text>
                        <View style={applyTw('flex-row gap-2')}>
                            <Button variant="destructive" icon={<TrashIcon />} className="flex-1">
                                Delete
                            </Button>
                            <Button variant="ghost" className="flex-1">
                                Cancel
                            </Button>
                        </View>
                    </View>

                    {/* Social Actions */}
                    <View style={applyTw('gap-2')}>
                        <Text style={applyTw('text-white font-medium')}>Social Actions</Text>
                        <View style={applyTw('flex-row gap-2')}>
                            <Button
                                variant="outline"
                                size="sm"
                                icon={<HeartIcon />}
                                iconPosition="left"
                            >
                                Like
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                icon={<StarIcon />}
                                iconPosition="left"
                            >
                                Favorite
                            </Button>
                            <Button variant="outline" size="icon-sm" icon={<PlusIcon />} />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default ButtonDemo;