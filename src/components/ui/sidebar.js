import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { applyTw } from '../../style/_elst';
import { Text } from './text';
import { renderFlaticon } from '../../functions/iconUtils';

const SidebarContext = createContext(null);

const EXPANDED_WIDTH = 220;
const COLLAPSED_WIDTH = 60;

/**
 * SidebarProvider — wraps a sidebar + main content pair, tracking
 * collapsed/expanded state and animating the sidebar's width.
 */
export const SidebarProvider = ({ defaultOpen = true, className = '', children }) => {
    const [open, setOpen] = useState(defaultOpen);
    const width = useRef(new Animated.Value(defaultOpen ? EXPANDED_WIDTH : COLLAPSED_WIDTH)).current;

    useEffect(() => {
        Animated.timing(width, {
            toValue: open ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
            duration: 220,
            useNativeDriver: false,
        }).start();
    }, [open]);

    return (
        <SidebarContext.Provider value={{ open, setOpen, toggle: () => setOpen((o) => !o), width }}>
            <View style={applyTw(`flex-row ${className}`)}>{children}</View>
        </SidebarContext.Provider>
    );
};

/**
 * Sidebar — the collapsible side panel itself.
 */
export const Sidebar = ({ className = '', children }) => {
    const { width } = useContext(SidebarContext);

    return (
        <Animated.View style={[applyTw(`bg-[#0c0c0c] border-r border-[#222] ${className}`), { width }]}>
            {children}
        </Animated.View>
    );
};

export const SidebarTrigger = () => {
    const { toggle } = useContext(SidebarContext);
    return (
        <TouchableOpacity
            onPress={toggle}
            activeOpacity={0.7}
            style={applyTw('w-8 h-8 rounded-md items-center justify-center bg-[#161616] border border-[#2A2A2A]')}
        >
            {renderFlaticon('fi fi-rr-sidebar', { size: 14, color: '#fff' })}
        </TouchableOpacity>
    );
};

export const SidebarHeader = ({ children, className = '' }) => (
    <View style={applyTw(`px-3 py-4 border-b border-[#1e1e1e] ${className}`)}>{children}</View>
);

export const SidebarFooter = ({ children, className = '' }) => (
    <View style={applyTw(`px-3 py-3 border-t border-[#1e1e1e] ${className}`)}>{children}</View>
);

export const SidebarContent = ({ children, className = '' }) => (
    <ScrollView style={applyTw('flex-1')} contentContainerStyle={applyTw(`py-2 ${className}`)}>
        {children}
    </ScrollView>
);

export const SidebarGroup = ({ label, children }) => {
    const { open } = useContext(SidebarContext);
    return (
        <View style={applyTw('mb-3 px-2')}>
            {label && open && (
                <Text style={applyTw('text-gray-500 text-xs font-semibold uppercase tracking-wider px-2 mb-1')}>
                    {label}
                </Text>
            )}
            <View style={applyTw('gap-0.5')}>{children}</View>
        </View>
    );
};

export const SidebarMenuButton = ({ icon, label, active = false, onPress, badge }) => {
    const { open } = useContext(SidebarContext);
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={applyTw(
                `flex-row items-center gap-3 px-2.5 h-10 rounded-md ${active ? 'bg-[#1f1f1f]' : 'bg-transparent'} ${open ? '' : 'justify-center'
                }`
            )}
        >
            {icon && renderFlaticon(icon, { size: 16, color: active ? '#fff' : '#9ca3af' })}
            {open && (
                <Text
                    numberOfLines={1}
                    style={applyTw(`flex-1 text-sm ${active ? 'text-white font-medium' : 'text-gray-300'}`)}
                >
                    {label}
                </Text>
            )}
            {open && badge != null && (
                <View style={applyTw('bg-[#2A2A2A] rounded-full px-1.5 py-0.5 min-w-[20px] items-center')}>
                    <Text style={applyTw('text-white text-[10px] font-semibold')}>{badge}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

// ==================== DEMO COMPONENT ====================

export const SidebarDemo = () => {
    const [active, setActive] = useState('inbox');

    const items = [
        { id: 'inbox', label: 'Inbox', icon: 'fi fi-rr-inbox', badge: 4 },
        { id: 'search', label: 'Search', icon: 'fi fi-rr-search' },
        { id: 'calendar', label: 'Calendar', icon: 'fi fi-rr-calendar' },
        { id: 'settings', label: 'Settings', icon: 'fi fi-rr-settings' },
    ];

    return (
        <View style={applyTw('gap-4')}>
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Sidebar</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    A collapsible navigation panel for app layouts.
                </Text>
            </View>

            <View style={applyTw('h-[420px] rounded-lg border border-[#222] overflow-hidden')}>
                <SidebarProvider className="flex-1 bg-black">
                    <Sidebar>
                        <SidebarHeader>
                            <View style={applyTw('flex-row items-center gap-2')}>
                                <View style={applyTw('w-7 h-7 rounded-md bg-white items-center justify-center')}>
                                    <Text style={applyTw('text-black text-xs font-bold')}>K</Text>
                                </View>
                                <Text style={applyTw('text-white text-sm font-semibold')}>KROS UI</Text>
                            </View>
                        </SidebarHeader>
                        <SidebarContent>
                            <SidebarGroup label="Workspace">
                                {items.map((item) => (
                                    <SidebarMenuButton
                                        key={item.id}
                                        icon={item.icon}
                                        label={item.label}
                                        badge={item.badge}
                                        active={active === item.id}
                                        onPress={() => setActive(item.id)}
                                    />
                                ))}
                            </SidebarGroup>
                        </SidebarContent>
                        <SidebarFooter>
                            <SidebarMenuButton icon="fi fi-rr-user" label="Account" />
                        </SidebarFooter>
                    </Sidebar>

                    <View style={applyTw('flex-1 p-4')}>
                        <SidebarTrigger />
                        <Text style={applyTw('text-white text-lg font-semibold mt-4 capitalize')}>{active}</Text>
                        <Text style={applyTw('text-gray-500 text-sm mt-1')}>
                            Main content area next to the sidebar. Tap the icon above to collapse.
                        </Text>
                    </View>
                </SidebarProvider>
            </View>
        </View>
    );
};

export default SidebarProvider;
