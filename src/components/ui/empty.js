import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { applyTw } from '../../style/style';
import { Button } from './button';
import { renderFlaticon } from '../../functions/iconUtils';
import { InputGroup, InputGroupInput, InputGroupAddon } from './input_group';

// ==================== EMPTY COMPONENT PRIMITIVES ====================

export function Empty({ children, className = '', ...props }) {
    return (
        <View
            style={applyTw(`flex-1 items-center justify-center p-8 rounded-lg ${className}`)}
            {...props}
        >
            {children}
        </View>
    );
}

export function EmptyHeader({ children, className = '' }) {
    return (
        <View style={applyTw(`items-center gap-2 mb-6 ${className}`)}>
            {children}
        </View>
    );
}

export function EmptyMedia({ children, variant = 'default', className = '' }) {
    const isIcon = variant === 'icon';
    return (
        <View
            style={applyTw(
                `mb-4 items-center justify-center ${isIcon ? 'w-16 h-16 bg-[#27272a] rounded-xl' : ''
                } ${className}`
            )}
        >
            {children}
        </View>
    );
}

export function EmptyTitle({ children, className = '' }) {
    return (
        <Text style={applyTw(`text-white text-xl font-semibold text-center ${className}`)}>
            {children}
        </Text>
    );
}

export function EmptyDescription({ children, className = '' }) {
    return (
        <Text style={applyTw(`text-gray-400 text-center text-sm leading-6 max-w-xs ${className}`)}>
            {children}
        </Text>
    );
}

export function EmptyContent({ children, className = '' }) {
    return (
        <View style={applyTw(`w-full items-center gap-4 ${className}`)}>
            {children}
        </View>
    );
}

// ==================== DEMO COMPONENTS ====================

export function EmptyDemo() {
    return (
        <ScrollView style={applyTw('flex-1')} contentContainerStyle={applyTw('p-4 gap-8 pb-20')}>
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Empty State</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    Placeholder views for creating new content or when no data is found.
                </Text>
            </View>

            {/* Default Example */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Default</Text>
                <View style={applyTw('border border-[#2A2A2A] rounded-lg bg-[#111]')}>
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                {renderFlaticon('fi-rr-folder', { size: 32, color: '#fff' })}
                            </EmptyMedia>
                            <EmptyTitle>No Projects Yet</EmptyTitle>
                            <EmptyDescription>
                                You haven't created any projects yet. Get started by creating your first project.
                            </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                            <View style={applyTw('flex-row gap-3')}>
                                <Button size="sm">Create Project</Button>
                                <Button variant="outline" size="sm">Import Project</Button>
                            </View>
                        </EmptyContent>
                    </Empty>
                </View>
            </View>

            {/* Outlined Example */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Dashed Outline</Text>
                <View style={applyTw('bg-[#111]')}>
                    <Empty className="border-2 border-dashed border-[#2A2A2A]">
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                {renderFlaticon('fi-rr-cloud-upload', { size: 32, color: '#fff' })}
                            </EmptyMedia>
                            <EmptyTitle>Cloud Storage Empty</EmptyTitle>
                            <EmptyDescription>
                                Upload files to your cloud storage to access them anywhere.
                            </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                            <Button variant="outline" size="sm">Upload Files</Button>
                        </EmptyContent>
                    </Empty>
                </View>
            </View>

            {/* Muted Background Example */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Muted Background</Text>
                <View style={applyTw('border border-[#2A2A2A] rounded-lg overflow-hidden')}>
                    <Empty className="bg-[#1c1c1c]">
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                {renderFlaticon('fi-rr-bell', { size: 32, color: '#fff' })}
                            </EmptyMedia>
                            <EmptyTitle>No Notifications</EmptyTitle>
                            <EmptyDescription>
                                You're all caught up. New notifications will appear here.
                            </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                            <Button variant="outline" size="sm" icon={renderFlaticon('fi-rr-refresh', { size: 14, color: '#fff' })}>
                                Refresh
                            </Button>
                        </EmptyContent>
                    </Empty>
                </View>
            </View>

            {/* Avatar Example */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>With Avatar</Text>
                <View style={applyTw('border border-[#2A2A2A] rounded-lg bg-[#111]')}>
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia>
                                <Image
                                    source={{ uri: 'https://github.com/shadcn.png' }}
                                    style={applyTw('w-12 h-12 rounded-full grayscale opacity-80')}
                                />
                            </EmptyMedia>
                            <EmptyTitle>User Offline</EmptyTitle>
                            <EmptyDescription>
                                This user is currently offline. You can leave a message to notify them.
                            </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                            <Button size="sm">Leave Message</Button>
                        </EmptyContent>
                    </Empty>
                </View>
            </View>

            {/* Input Group Example */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>With Input Group</Text>
                <View style={applyTw('border border-[#2A2A2A] rounded-lg bg-[#111]')}>
                    <Empty>
                        <EmptyHeader>
                            <EmptyTitle>404 - Not Found</EmptyTitle>
                            <EmptyDescription>
                                The page you're looking for doesn't exist. Try searching below.
                            </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                            <View style={applyTw('w-full max-w-xs')}>
                                <InputGroup>
                                    <InputGroupInput placeholder="Search pages..." />
                                    <InputGroupAddon align="right">
                                        {renderFlaticon('fi-rr-search', { size: 16, color: '#666' })}
                                    </InputGroupAddon>
                                </InputGroup>
                            </View>
                            <TouchableOpacity>
                                <Text style={applyTw('text-blue-500 text-sm')}>Contact Support</Text>
                            </TouchableOpacity>
                        </EmptyContent>
                    </Empty>
                </View>
            </View>

        </ScrollView>
    );
}
