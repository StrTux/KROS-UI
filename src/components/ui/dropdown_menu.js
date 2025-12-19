import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    Dimensions,
    Platform,
    ScrollView,
} from 'react-native';
import { applyTw } from '../../style/style';
import { renderFlaticon } from '../../functions/iconUtils';
import { Button } from './button';

const DropdownMenuContext = createContext(null);

/**
 * DropdownMenu Root Component
 */
export function DropdownMenu({ children }) {
    const [visible, setVisible] = useState(false);
    const [triggerLayout, setTriggerLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const triggerRef = useRef(null);

    const toggleMenu = () => {
        if (visible) {
            setVisible(false);
        } else {
            measureTrigger();
        }
    };

    const measureTrigger = () => {
        if (triggerRef.current) {
            triggerRef.current.measureInWindow((x, y, width, height) => {
                setTriggerLayout({ x, y, width, height });
                setVisible(true);
            });
        }
    };

    return (
        <DropdownMenuContext.Provider
            value={{
                visible,
                setVisible,
                toggleMenu,
                triggerLayout,
                triggerRef,
            }}
        >
            {children}
        </DropdownMenuContext.Provider>
    );
}

/**
 * DropdownMenu Trigger
 */
export function DropdownMenuTrigger({ children, asChild, ...props }) {
    const { toggleMenu, triggerRef } = useContext(DropdownMenuContext);

    if (asChild) {
        return (
            <View
                ref={triggerRef}
                collapsable={false}
                onTouchEnd={(e) => {
                    // Prevent default touch handling if needed, but for now we wrap functionality
                    e.stopPropagation();
                }}
                style={applyTw('self-start')}
            >
                {React.cloneElement(children, {
                    onPress: (e) => {
                        if (children.props.onPress) children.props.onPress(e);
                        toggleMenu();
                    }
                })}
            </View>
        );
    }

    return (
        <TouchableOpacity
            ref={triggerRef}
            onPress={toggleMenu}
            style={applyTw('self-start')}
            activeOpacity={0.7}
            {...props}
        >
            {children}
        </TouchableOpacity>
    );
}

/**
 * DropdownMenu Content
 */
export function DropdownMenuContent({ children, className = '', align = 'start', width = 200 }) {
    const { visible, setVisible, triggerLayout } = useContext(DropdownMenuContext);
    const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

    if (!visible) return null;

    // Calculate position
    let top = triggerLayout.y + triggerLayout.height + 4; // 4px gap
    let left = triggerLayout.x;

    // Adjust horizontal alignment
    if (align === 'end') {
        left = triggerLayout.x + triggerLayout.width - width;
    } else if (align === 'center') {
        left = triggerLayout.x + (triggerLayout.width / 2) - (width / 2);
    }

    // Boundary checks
    if (left < 10) left = 10;
    if (left + width > screenWidth - 10) left = screenWidth - width - 10;

    // Check if dropdown goes off screen bottom (rough estimation)
    // If so, we could flip it up, but for simplicity keeping it down or bounded
    // A robust solution would measure content height first.

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={() => setVisible(false)}
        >
            <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                <View style={applyTw('flex-1 bg-transparent')}>
                    {/* Backdrop */}
                </View>
            </TouchableWithoutFeedback>

            <View
                style={[
                    applyTw(`absolute bg-[#111111] border border-[#2A2A2A] rounded-md shadow-lg overflow-hidden`),
                    {
                        top,
                        left,
                        width: width === 'auto' ? undefined : width,
                        minWidth: width === 'auto' ? 128 : undefined,
                        maxHeight: screenHeight * 0.4, // unexpected large menus
                        zIndex: 1000,
                    },
                    applyTw(className)
                ]}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={applyTw('p-1')}
                >
                    {children}
                </ScrollView>
            </View>
        </Modal>
    );
}

/**
 * DropdownMenu Item
 */
export function DropdownMenuItem({ children, icon, disabled, destructive, onSelect, className = '' }) {
    const { setVisible } = useContext(DropdownMenuContext);

    const handlePress = () => {
        if (disabled) return;
        if (onSelect) onSelect();
        setVisible(false);
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={disabled ? 1 : 0.7}
            style={applyTw(
                `flex-row items-center px-2 py-2 rounded-sm ${disabled ? 'opacity-50' : 'opacity-100'
                } ${destructive ? 'bg-red-900/10' : ''} ${className}`
            )}
        >
            {icon && (
                <View style={applyTw('mr-2')}>
                    {/* Render icon based on type */}
                    {typeof icon === 'string' ? renderFlaticon(icon, { size: 16, color: destructive ? '#EF4444' : '#ffffff' }) : icon}
                </View>
            )}
            <Text
                style={applyTw(
                    `text-sm ${destructive ? 'text-red-500 font-medium' : 'text-gray-100'
                    }`
                )}
            >
                {children}
            </Text>
        </TouchableOpacity>
    );
}

/**
 * DropdownMenu CheckboxItem
 */
export function DropdownMenuCheckboxItem({ children, checked, onCheckedChange, disabled }) {
    const { setVisible } = useContext(DropdownMenuContext);

    const handlePress = () => {
        if (disabled) return;
        if (onCheckedChange) onCheckedChange(!checked);
        // Don't close on checkbox toggle usually, but depends on UX preference. 
        // Standard dropdowns sometimes keep open. Let's keep open for multiple selection comfort.
        // If single select behavior desired, user can handle it.
        // Actually for mobile, closing is often safer to avoid confusion, but checkboxes implies multiple.
        // Let's close for now to mimic simple behavior, or keep open? 
        // Radix UI usually keeps open but focusing back.
        // Let's CLOSE it for simplicity in this V1 unless 'preventClose' prop.
        // Actually, let's keep it open for better UX on toggling multiple things.
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={disabled ? 1 : 0.7}
            style={applyTw(`flex-row items-center px-2 py-2 rounded-sm pl-8 relative ${disabled ? 'opacity-50' : ''}`)}
        >
            <View style={applyTw('absolute left-2 top-0 bottom-0 justify-center')}>
                {checked && (
                    <Text style={applyTw('text-white text-xs')}>✓</Text>
                    // Or use an icon if reliable:
                    // renderFlaticon('fi-rr-check', { size: 12, color: '#fff' })
                )}
            </View>
            <Text style={applyTw('text-gray-100 text-sm')}>{children}</Text>
        </TouchableOpacity>
    );
}

/**
 * DropdownMenu RadioItem
 */
export function DropdownMenuRadioItem({ children, value, groupValue, onValueChange }) {
    const { setVisible } = useContext(DropdownMenuContext);
    const checked = value === groupValue;

    const handlePress = () => {
        if (onValueChange) onValueChange(value);
        setVisible(false);
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            style={applyTw(`flex-row items-center px-2 py-2 rounded-sm pl-8 relative`)}
        >
            <View style={applyTw('absolute left-2 top-0 bottom-0 justify-center')}>
                {checked && (
                    <View style={applyTw('w-2 h-2 rounded-full bg-white')} />
                )}
            </View>
            <Text style={applyTw('text-gray-100 text-sm')}>{children}</Text>
        </TouchableOpacity>
    );
}


export function DropdownMenuRadioGroup({ value, onValueChange, children }) {
    // Pass context down to children manually or via cloneElement
    return (
        <View>
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        groupValue: value,
                        onValueChange: onValueChange
                    });
                }
                return child;
            })}
        </View>
    );
}

export function DropdownMenuLabel({ children }) {
    return (
        <Text style={applyTw('px-2 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider')}>
            {children}
        </Text>
    );
}

export function DropdownMenuSeparator() {
    return <View style={applyTw('h-[1px] bg-[#2A2A2A] my-1')} />;
}

export function DropdownMenuGroup({ children }) {
    return <View>{children}</View>;
}

export function DropdownMenuShortcut({ children }) {
    return (
        <Text style={applyTw('ml-auto text-xs text-gray-500 tracking-widest')}>
            {children}
        </Text>
    );
}

// Sub-menus are complex on mobile. Simplifying to just render items for now 
// or maybe flatter structure. Recursive menus on mobile are often bad UX without a navigation stack.
// We will skip "Sub" primitives implementation for this V1 or treat them as Groups.
export function DropdownMenuSub({ children }) { return <View>{children}</View>; }
export function DropdownMenuSubTrigger({ children }) { return <DropdownMenuItem>{children}</DropdownMenuItem>; }
export function DropdownMenuSubContent({ children }) { return <View style={applyTw('pl-4 border-l border-[#2A2A2A]')}>{children}</View>; }


// ==================== DEMO COMPONENT ====================

export function DropdownMenuDemo() {
    const [check1, setCheck1] = useState(true);
    const [check2, setCheck2] = useState(false);
    const [radioVal, setRadioVal] = useState('bottom');

    const UserIcon = () => renderFlaticon('fi-rr-user', { size: 16, color: '#fff' });
    const SettingsIcon = () => renderFlaticon('fi-rr-settings', { size: 16, color: '#fff' });
    const LogOutIcon = () => renderFlaticon('fi-rr-sign-out-alt', { size: 16, color: '#EF4444' }); // Red for destructive

    return (
        <ScrollView style={applyTw('flex-1')} contentContainerStyle={applyTw('p-4 gap-8')}>
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Dropdown Menu</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    Displays a menu to the user — such as a set of actions or functions — triggered by a button.
                </Text>
            </View>

            {/* Basic Example */}
            <View style={applyTw('gap-4 z-10')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Basic Usage</Text>
                <View style={applyTw('flex-row')}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">Open Menu</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem icon={<UserIcon />}>Profile</DropdownMenuItem>
                            <DropdownMenuItem icon="fi-rr-credit-card">Billing</DropdownMenuItem>
                            <DropdownMenuItem icon={<SettingsIcon />}>Settings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem destructive icon={<LogOutIcon />}>
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </View>
            </View>

            {/* Checkboxes */}
            <View style={applyTw('gap-4 z-10')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Checkboxes</Text>
                <View style={applyTw('flex-row')}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">View Options</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked={check1} onCheckedChange={setCheck1}>
                                Show Status Bar
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={check2} onCheckedChange={setCheck2}>
                                Show Full Path
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem disabled>
                                Force Dark Mode
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </View>
            </View>

            {/* Radio Group */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Radio Group</Text>
                <View style={applyTw('flex-row')}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">Position: {radioVal}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={radioVal} onValueChange={setRadioVal}>
                                <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="left">Left</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </View>
            </View>

            {/* Alignment Test */}
            <View style={applyTw('gap-4 mb-20')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Alignment</Text>
                <View style={applyTw('flex-row justify-between')}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="sm">Left Align</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem>Item 1</DropdownMenuItem>
                            <DropdownMenuItem>Item 2</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="sm">Center</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center">
                            <DropdownMenuItem>Item 1</DropdownMenuItem>
                            <DropdownMenuItem>Item 2</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="sm">Right Align</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Item 1</DropdownMenuItem>
                            <DropdownMenuItem>Item 2</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </View>
            </View>

        </ScrollView>
    );
}


