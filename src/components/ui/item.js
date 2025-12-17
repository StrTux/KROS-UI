import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { applyTw } from '../../style/style';
import { renderFlaticon } from '../../functions/iconUtils';

// ==================== ITEM COMPONENTS ====================

// Item Container - Main wrapper
export const Item = ({
    children,
    variant = 'default',
    size = 'default',
    onPress,
    className = ''
}) => {
    const variantStyles = {
        default: 'bg-transparent border border-transparent',
        outline: 'bg-transparent border border-[#333]',
        muted: 'bg-[#0A0A0A] border border-transparent',
    };

    const sizeStyles = {
        default: 'p-4 gap-4',
        sm: 'py-3 px-4 gap-2.5',
    };

    const Component = onPress ? TouchableOpacity : View;

    return (
        <Component
            onPress={onPress}
            activeOpacity={onPress ? 0.7 : 1}
            style={applyTw(
                `flex-row items-center rounded-lg ${variantStyles[variant]} ${sizeStyles[size]} ${className}`
            )}
        >
            {children}
        </Component>
    );
};

// Item Group - Container for multiple items
export const ItemGroup = ({ children, className = '' }) => {
    return (
        <View style={applyTw(`flex-col ${className}`)}>
            {children}
        </View>
    );
};

// Item Separator
export const ItemSeparator = ({ className = '' }) => {
    return <View style={applyTw(`h-px bg-[#222] ${className}`)} />;
};

// Item Media - For icons, avatars, images
export const ItemMedia = ({
    children,
    variant = 'default',
    className = ''
}) => {
    const variantStyles = {
        default: 'bg-transparent',
        icon: 'w-8 h-8 border border-[#333] rounded-sm bg-[#0A0A0A] items-center justify-center',
        image: 'w-10 h-10 rounded-sm overflow-hidden',
    };

    return (
        <View style={applyTw(`flex-shrink-0 ${variantStyles[variant]} ${className}`)}>
            {children}
        </View>
    );
};

// Item Content - Main content area
export const ItemContent = ({ children, className = '' }) => {
    return (
        <View style={applyTw(`flex-1 flex-col gap-1 ${className}`)}>
            {children}
        </View>
    );
};

// Item Title
export const ItemTitle = ({ children, className = '' }) => {
    return (
        <Text style={applyTw(`text-white text-sm font-medium ${className}`)}>
            {children}
        </Text>
    );
};

// Item Description
export const ItemDescription = ({ children, className = '' }) => {
    return (
        <Text style={applyTw(`text-gray-400 text-sm ${className}`)} numberOfLines={2}>
            {children}
        </Text>
    );
};

// Item Actions - For buttons, icons on the right
export const ItemActions = ({ children, className = '' }) => {
    return (
        <View style={applyTw(`flex-row items-center gap-2 ${className}`)}>
            {children}
        </View>
    );
};

// Item Header - For top content
export const ItemHeader = ({ children, className = '' }) => {
    return (
        <View style={applyTw(`w-full items-center justify-between gap-2 ${className}`)}>
            {children}
        </View>
    );
};

// Item Footer - For bottom content
export const ItemFooter = ({ children, className = '' }) => {
    return (
        <View style={applyTw(`w-full flex-row items-center justify-between gap-2 ${className}`)}>
            {children}
        </View>
    );
};

// ==================== DEMO COMPONENT ====================

const people = [
    {
        username: 'shadcn',
        avatar: 'https://github.com/shadcn.png',
        email: 'shadcn@vercel.com',
        status: 'Online',
    },
    {
        username: 'maxleiter',
        avatar: 'https://github.com/maxleiter.png',
        email: 'maxleiter@vercel.com',
        status: 'Away',
    },
    {
        username: 'evilrabbit',
        avatar: 'https://github.com/evilrabbit.png',
        email: 'evilrabbit@vercel.com',
        status: 'Offline',
    },
];

const music = [
    { title: 'Midnight City Lights', artist: 'Neon Dreams', duration: '3:45' },
    { title: 'Coffee Shop Conversations', artist: 'The Morning Brew', duration: '4:05' },
    { title: 'Digital Rain', artist: 'Cyber Symphony', duration: '3:30' },
];

export const ItemDemo = () => {
    return (
        <ScrollView
            style={applyTw('flex-1 bg-black')}
            contentContainerStyle={applyTw('p-5 gap-8')}
        >
            {/* Header */}
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>
                    Item Component
                </Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    Flexible list items with variants and actions
                </Text>
            </View>

            {/* Section 1: Basic Variants */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>
                    📋 Variants
                </Text>

                <Item variant="default">
                    <ItemContent>
                        <ItemTitle>Default Variant</ItemTitle>
                        <ItemDescription>
                            Standard styling with transparent background
                        </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                        <TouchableOpacity style={applyTw('px-3 py-1.5 bg-[#222] rounded-md')}>
                            <Text style={applyTw('text-white text-sm')}>Open</Text>
                        </TouchableOpacity>
                    </ItemActions>
                </Item>

                <Item variant="outline">
                    <ItemContent>
                        <ItemTitle>Outline Variant</ItemTitle>
                        <ItemDescription>
                            Outlined style with clear borders
                        </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                        <TouchableOpacity style={applyTw('px-3 py-1.5 bg-[#222] rounded-md')}>
                            <Text style={applyTw('text-white text-sm')}>Open</Text>
                        </TouchableOpacity>
                    </ItemActions>
                </Item>

                <Item variant="muted">
                    <ItemContent>
                        <ItemTitle>Muted Variant</ItemTitle>
                        <ItemDescription>
                            Subdued appearance with muted background
                        </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                        <TouchableOpacity style={applyTw('px-3 py-1.5 bg-[#222] rounded-md')}>
                            <Text style={applyTw('text-white text-sm')}>Open</Text>
                        </TouchableOpacity>
                    </ItemActions>
                </Item>
            </View>

            <View style={applyTw('h-px bg-[#222]')} />

            {/* Section 2: With Icons */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>
                    🎨 With Icons
                </Text>

                <Item variant="outline" size="sm" onPress={() => { }}>
                    <ItemMedia>
                        {renderFlaticon('fi fi-rr-check-circle', { size: 20, color: '#10b981' })}
                    </ItemMedia>
                    <ItemContent>
                        <ItemTitle>Profile Verified</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                        {renderFlaticon('fi fi-rr-angle-right', { size: 16, color: '#999' })}
                    </ItemActions>
                </Item>

                <Item variant="outline" size="sm" onPress={() => { }}>
                    <ItemMedia variant="icon">
                        {renderFlaticon('fi fi-rr-bell', { size: 16, color: '#3b82f6' })}
                    </ItemMedia>
                    <ItemContent>
                        <ItemTitle>Notifications</ItemTitle>
                        <ItemDescription>3 new messages</ItemDescription>
                    </ItemContent>
                    <ItemActions>
                        <View style={applyTw('w-2 h-2 bg-blue-500 rounded-full')} />
                    </ItemActions>
                </Item>
            </View>

            <View style={applyTw('h-px bg-[#222]')} />

            {/* Section 3: User List with Avatars */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>
                    👥 User List
                </Text>

                <ItemGroup className="gap-0">
                    {people.map((person, index) => (
                        <React.Fragment key={person.username}>
                            <Item onPress={() => { }}>
                                <ItemMedia>
                                    <Image
                                        source={{ uri: person.avatar }}
                                        style={applyTw('w-10 h-10 rounded-full')}
                                    />
                                </ItemMedia>
                                <ItemContent>
                                    <ItemTitle>{person.username}</ItemTitle>
                                    <ItemDescription>{person.email}</ItemDescription>
                                </ItemContent>
                                <ItemActions>
                                    <View style={applyTw(`w-2 h-2 rounded-full ${person.status === 'Online' ? 'bg-green-500' :
                                        person.status === 'Away' ? 'bg-yellow-500' : 'bg-gray-500'
                                        }`)} />
                                </ItemActions>
                            </Item>
                            {index !== people.length - 1 && <ItemSeparator />}
                        </React.Fragment>
                    ))}
                </ItemGroup>
            </View>

            <View style={applyTw('h-px bg-[#222]')} />

            {/* Section 4: Music List */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>
                    🎵 Music List
                </Text>

                <ItemGroup className="gap-2">
                    {music.map((song) => (
                        <Item key={song.title} variant="outline" onPress={() => { }}>
                            <ItemMedia variant="icon">
                                {renderFlaticon('fi fi-rr-music', { size: 16, color: '#8b5cf6' })}
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle>{song.title}</ItemTitle>
                                <ItemDescription>{song.artist}</ItemDescription>
                            </ItemContent>
                            <ItemContent className="flex-none">
                                <ItemDescription>{song.duration}</ItemDescription>
                            </ItemContent>
                        </Item>
                    ))}
                </ItemGroup>
            </View>

            <View style={applyTw('h-px bg-[#222]')} />

            {/* Section 5: Clickable Links */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>
                    🔗 Clickable Items
                </Text>

                <Item onPress={() => { }}>
                    <ItemContent>
                        <ItemTitle>Visit Documentation</ItemTitle>
                        <ItemDescription>
                            Learn how to get started with components
                        </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                        {renderFlaticon('fi fi-rr-angle-right', { size: 16, color: '#999' })}
                    </ItemActions>
                </Item>

                <Item variant="outline" onPress={() => { }}>
                    <ItemContent>
                        <ItemTitle>External Resource</ItemTitle>
                        <ItemDescription>
                            Opens in a new tab with security attributes
                        </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                        {renderFlaticon('fi fi-rr-arrow-up-right-from-square', { size: 16, color: '#999' })}
                    </ItemActions>
                </Item>
            </View>

            <View style={applyTw('h-px bg-[#222]')} />

            {/* Section 6: E-Commerce Product Grid */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>
                    🛍️ Product Grid (E-Commerce)
                </Text>

                <View style={applyTw('flex-row flex-wrap gap-3')}>
                    {[
                        {
                            name: "v0-1.5-sm",
                            description: "Everyday tasks and UI generation.",
                            image: "https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&w=640&auto=format&fit=crop",
                        },
                        {
                            name: "v0-1.5-lg",
                            description: "Advanced thinking or reasoning.",
                            image: "https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop",
                        },
                        {
                            name: "v0-2.0-mini",
                            description: "Open Source model for everyone.",
                            image: "https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop",
                        },
                    ].map((model) => (
                        <View key={model.name} style={applyTw('w-[48%]')}>
                            <Item variant="outline" className="flex-col items-start p-3 gap-3" onPress={() => { }}>
                                <ItemHeader className="w-full">
                                    <Image
                                        source={{ uri: model.image }}
                                        style={[applyTw('w-full rounded-sm'), { aspectRatio: 1 }]}
                                        resizeMode="cover"
                                    />
                                </ItemHeader>
                                <ItemContent className="w-full">
                                    <ItemTitle>{model.name}</ItemTitle>
                                    <ItemDescription numberOfLines={2}>{model.description}</ItemDescription>
                                </ItemContent>
                            </Item>
                        </View>
                    ))}
                </View>
            </View>

            {/* Features */}
            <View style={applyTw('bg-[#111] rounded-lg p-4 border border-[#222] mt-4 mb-8')}>
                <Text style={applyTw('text-white text-lg font-semibold mb-3')}>
                    ✨ Features
                </Text>
                <View style={applyTw('gap-2 ml-2')}>
                    <Text style={applyTw('text-gray-400 text-sm')}>
                        • Multiple variants (default, outline, muted)
                    </Text>
                    <Text style={applyTw('text-gray-400 text-sm')}>
                        • Flexible sizing (default, sm)
                    </Text>
                    <Text style={applyTw('text-gray-400 text-sm')}>
                        • Support for icons, avatars, and images
                    </Text>
                    <Text style={applyTw('text-gray-400 text-sm')}>
                        • Clickable with onPress support
                    </Text>
                    <Text style={applyTw('text-gray-400 text-sm')}>
                        • Group items with separators
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default ItemDemo;
