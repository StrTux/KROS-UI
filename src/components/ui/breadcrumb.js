import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { applyTw } from '../../style/style';
import { Text } from './text';

/**
 * Breadcrumb Component for React Native
 * Navigation component showing hierarchical path
 */

// Breadcrumb Container
export const Breadcrumb = ({ children, className = '', ...props }) => {
    return (
        <View style={applyTw(className)} {...props}>
            {children}
        </View>
    );
};

// Breadcrumb List (scrollable for long paths)
export const BreadcrumbList = ({
    children,
    className = '',
    scrollable = true,
    ...props
}) => {
    const contentClasses = `flex-row items-center gap-2 flex-wrap ${className}`;

    if (scrollable) {
        return (
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={applyTw(contentClasses)}
                {...props}
            >
                {children}
            </ScrollView>
        );
    }

    return (
        <View style={applyTw(contentClasses)} {...props}>
            {children}
        </View>
    );
};

// Breadcrumb Item
export const BreadcrumbItem = ({ children, className = '', ...props }) => {
    return (
        <View
            style={applyTw(`flex-row items-center gap-2 ${className}`)}
            {...props}
        >
            {children}
        </View>
    );
};

// Breadcrumb Link (clickable)
export const BreadcrumbLink = ({
    children,
    onPress,
    className = '',
    disabled = false,
    ...props
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.7}
            style={applyTw(className)}
            {...props}
        >
            <Text
                style={applyTw(
                    `text-gray-400 text-sm ${disabled ? 'opacity-50' : ''}`,
                )}
            >
                {children}
            </Text>
        </TouchableOpacity>
    );
};

// Breadcrumb Page (current page - not clickable)
export const BreadcrumbPage = ({ children, className = '', ...props }) => {
    return (
        <Text
            style={applyTw(`text-white text-sm font-medium ${className}`)}
            {...props}
        >
            {children}
        </Text>
    );
};

// Breadcrumb Separator
export const BreadcrumbSeparator = ({ children, className = '' }) => {
    return (
        <Text style={applyTw(`text-gray-600 text-sm ${className}`)}>
            {children || '>'}
        </Text>
    );
};

// Breadcrumb Ellipsis (for collapsed items)
export const BreadcrumbEllipsis = ({ onPress, className = '' }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={applyTw(`w-9 h-9 items-center justify-center ${className}`)}
        >
            <Text style={applyTw('text-gray-400 text-sm')}>...</Text>
        </TouchableOpacity>
    );
};

// ==================== DEMO COMPONENT ====================

export const BreadcrumbDemo = () => {
    const handleNavigate = (path) => {
        console.log('Navigate to:', path);
    };

    return (
        <View style={applyTw('w-full gap-8')}>
            {/* Header */}
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-2xl font-bold')}>
                    Breadcrumb Component
                </Text>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Navigation component showing hierarchical path
                </Text>
            </View>

            {/* Basic Breadcrumb (matching uploaded image) */}
            <View style={applyTw('gap-3')}>
                <Text style={applyTw('text-white text-lg font-semibold')}>
                    Basic Breadcrumb
                </Text>
                <View style={applyTw('border-[#6f6f6fb9] border bg-black rounded-lg p-4')}>
                    <Breadcrumb>
                        <BreadcrumbList scrollable={false}>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    onPress={() => handleNavigate('home')}
                                >
                                    Home
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbEllipsis
                                    onPress={() => console.log('Show more')}
                                />
                                <BreadcrumbSeparator />
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    onPress={() =>
                                        handleNavigate('components')
                                    }
                                >
                                    Components
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </View>
            </View>

            {/* Simple Path */}
            <View style={applyTw('gap-3')}>
                <Text style={applyTw('text-white text-lg font-semibold')}>
                    Simple Path
                </Text>
                <View style={applyTw('border-[#6f6f6fb9] border bg-black rounded-lg p-4')}>
                    <Breadcrumb>
                        <BreadcrumbList scrollable={false}>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    onPress={() => handleNavigate('home')}
                                >
                                    Home
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbPage>Current Page</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </View>
            </View>

            {/* Custom Separator */}
            <View style={applyTw('gap-3')}>
                <Text style={applyTw('text-white text-lg font-semibold')}>
                    Custom Separator
                </Text>
                <View style={applyTw('border-[#6f6f6fb9] border bg-black rounded-lg p-4')}>
                    <Breadcrumb>
                        <BreadcrumbList scrollable={false}>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    onPress={() => handleNavigate('home')}
                                >
                                    Home
                                </BreadcrumbLink>
                                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    onPress={() => handleNavigate('docs')}
                                >
                                    Documentation
                                </BreadcrumbLink>
                                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbPage>
                                    API Reference
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </View>
            </View>

            {/* Long Path with Scroll */}
            <View style={applyTw('gap-3')}>
                <Text style={applyTw('text-white text-lg font-semibold')}>
                    Scrollable Long Path
                </Text>
                <View style={applyTw('border-[#6f6f6fb9] border bg-black rounded-lg p-4')}>
                    <Breadcrumb>
                        <BreadcrumbList scrollable={true}>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    onPress={() => handleNavigate('home')}
                                >
                                    Home
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    onPress={() =>
                                        handleNavigate('products')
                                    }
                                >
                                    Products
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    onPress={() =>
                                        handleNavigate('electronics')
                                    }
                                >
                                    Electronics
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    onPress={() =>
                                        handleNavigate('computers')
                                    }
                                >
                                    Computers
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    onPress={() => handleNavigate('laptops')}
                                >
                                    Laptops
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbPage>MacBook Pro</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </View>
            </View>

            {/* With Ellipsis for Collapsed Items */}
            <View style={applyTw('gap-3')}>
                <Text style={applyTw('text-white text-lg font-semibold')}>
                    With Collapsed Items
                </Text>
                <View style={applyTw('border-[#6f6f6fb9] border bg-black rounded-lg p-4')}>
                    <Breadcrumb>
                        <BreadcrumbList scrollable={false}>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    onPress={() => handleNavigate('home')}
                                >
                                    Home
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbEllipsis />
                                <BreadcrumbSeparator />
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    onPress={() => handleNavigate('category')}
                                >
                                    Category
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbPage>Item</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </View>
            </View>

            {/* Use Case Example */}
            <View style={applyTw('gap-3')}>
                <Text style={applyTw('text-white text-lg font-semibold')}>
                    Usage Example
                </Text>
                <View style={applyTw('border-[#6f6f6fb9] border bg-black rounded-lg p-4 gap-4')}>
                    <Text style={applyTw('text-white font-medium')}>
                        Settings Navigation
                    </Text>
                    <Breadcrumb>
                        <BreadcrumbList scrollable={false}>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    onPress={() => handleNavigate('settings')}
                                >
                                    Settings
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    onPress={() => handleNavigate('account')}
                                >
                                    Account
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbPage>Privacy</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </View>
            </View>
        </View>
    );
};

export default Breadcrumb;
