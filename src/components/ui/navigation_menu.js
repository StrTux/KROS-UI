import React, { createContext, useContext, useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { applyTw } from '../../style/_elst';
import { Text } from './text';
import { renderFlaticon } from '../../functions/iconUtils';

const NavigationMenuContext = createContext(null);

/**
 * NavigationMenu — a horizontal row of top-level links, some of which
 * expand into a content panel shown directly beneath the menu.
 */
export const NavigationMenu = ({ className = '', children }) => {
    const [activeItem, setActiveItem] = useState(null);

    return (
        <NavigationMenuContext.Provider value={{ activeItem, setActiveItem }}>
            <View style={applyTw(className)}>{children}</View>
        </NavigationMenuContext.Provider>
    );
};

export const NavigationMenuList = ({ children }) => (
    <View style={applyTw('flex-row items-center gap-1 flex-wrap')}>{children}</View>
);

/**
 * NavigationMenuItem — a single top-level entry. Pass `content` to make
 * it expandable, or `onPress` for a plain link.
 */
export const NavigationMenuItem = ({ id, title, content, onPress }) => {
    const { activeItem, setActiveItem } = useContext(NavigationMenuContext);
    const isOpen = activeItem === id;

    const handlePress = () => {
        if (content) {
            setActiveItem(isOpen ? null : id);
        } else {
            onPress?.();
        }
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            style={applyTw(
                `flex-row items-center gap-1 px-3 h-9 rounded-md ${isOpen ? 'bg-[#1f1f1f]' : 'bg-transparent'}`
            )}
        >
            <Text style={applyTw('text-sm font-medium text-gray-100')}>{title}</Text>
            {content && renderFlaticon('fi fi-rr-angle-down', {
                size: 12,
                color: '#9ca3af',
            })}
        </TouchableOpacity>
    );
};

/**
 * NavigationMenuContent — renders the active item's expanded panel.
 * Place once, directly under <NavigationMenuList>. Register content per
 * item via the `items` prop so the panel can look it up by id.
 */
export const NavigationMenuContent = ({ items = [] }) => {
    const { activeItem } = useContext(NavigationMenuContext);
    const item = items.find((i) => i.id === activeItem);

    if (!item) return null;

    return (
        <View style={applyTw('mt-2 p-4 rounded-lg border border-[#2A2A2A] bg-[#111111] gap-3')}>
            {item.content}
        </View>
    );
};

const LinkRow = ({ title, description, icon }) => (
    <TouchableOpacity activeOpacity={0.7} style={applyTw('flex-row gap-3 p-2 rounded-md')}>
        {icon && (
            <View style={applyTw('w-9 h-9 rounded-md bg-[#1f1f1f] items-center justify-center')}>
                {renderFlaticon(icon, { size: 16, color: '#fff' })}
            </View>
        )}
        <View style={applyTw('flex-1 gap-0.5')}>
            <Text style={applyTw('text-white text-sm font-medium')}>{title}</Text>
            {description && <Text style={applyTw('text-gray-400 text-xs')}>{description}</Text>}
        </View>
    </TouchableOpacity>
);

// ==================== DEMO COMPONENT ====================

export const NavigationMenuDemo = () => {
    const items = [
        {
            id: 'getting-started',
            content: (
                <>
                    <LinkRow icon="fi fi-rr-rocket-lunch" title="Introduction" description="Re-usable components built with applyTw." />
                    <LinkRow icon="fi fi-rr-book-open-cover" title="Installation" description="Copy the component source into your project." />
                    <LinkRow icon="fi fi-rr-list-check" title="Typography" description="Styles for headings, paragraphs and lists." />
                </>
            ),
        },
        {
            id: 'components',
            content: (
                <>
                    <LinkRow icon="fi fi-rr-square" title="Alert Dialog" description="A modal dialog that interrupts the user." />
                    <LinkRow icon="fi fi-rr-menu-burger" title="Dropdown Menu" description="Displays a menu of actions." />
                    <LinkRow icon="fi fi-rr-toggle-on" title="Switch" description="A control for toggling a setting." />
                </>
            ),
        },
    ];

    return (
        <ScrollView style={applyTw('flex-1')} contentContainerStyle={applyTw('p-5 gap-8 pb-20')}>
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Navigation Menu</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    A collection of links, tap to expand each section's content panel.
                </Text>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Example</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem id="getting-started" title="Getting Started" content />
                            <NavigationMenuItem id="components" title="Components" content />
                            <NavigationMenuItem title="Docs" onPress={() => {}} />
                        </NavigationMenuList>
                        <NavigationMenuContent items={items} />
                    </NavigationMenu>
                </View>
            </View>
        </ScrollView>
    );
};

export default NavigationMenu;
