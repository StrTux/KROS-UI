// ==================== TOAST ====================
// A controlled, single-toast primitive plus a `useToast()` hook for apps
// that prefer local component state over the global API in `sonner.js`.

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { applyTw } from '../../style/_elst';
import { Text } from './text';
import { Button } from './button';
import { renderFlaticon } from '../../functions/iconUtils';

/**
 * Toast — a single dismissible notification banner. Fully controlled:
 * render it conditionally from your own state (see `useToast` below for
 * a ready-made queue if you'd rather not manage that yourself).
 *
 * @param {boolean} open
 * @param {function} onOpenChange
 * @param {string} variant - 'default' | 'destructive'
 */
export const Toast = ({ open, onOpenChange, variant = 'default', title, description, action, className = '' }) => {
    const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(anim, {
            toValue: open ? 1 : 0,
            duration: open ? 200 : 150,
            useNativeDriver: true,
        }).start();
    }, [open]);

    if (!open) return null;

    const isDestructive = variant === 'destructive';

    return (
        <Animated.View
            style={[
                applyTw(
                    `flex-row items-start gap-3 rounded-lg border px-4 py-3 ${isDestructive ? 'bg-red-950 border-red-800' : 'bg-[#18181b] border-[#27272a]'
                    } ${className}`
                ),
                {
                    opacity: anim,
                    transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }],
                },
            ]}
        >
            <View style={applyTw('flex-1 gap-1')}>
                {title && (
                    <Text style={applyTw(`text-sm font-semibold ${isDestructive ? 'text-red-100' : 'text-white'}`)}>
                        {title}
                    </Text>
                )}
                {description && (
                    <Text style={applyTw(`text-xs ${isDestructive ? 'text-red-200' : 'text-gray-400'}`)}>
                        {description}
                    </Text>
                )}
                {action && (
                    <TouchableOpacity onPress={action.onPress} activeOpacity={0.7} style={applyTw('self-start mt-1')}>
                        <Text style={applyTw('text-white text-xs font-semibold underline')}>{action.label}</Text>
                    </TouchableOpacity>
                )}
            </View>
            <TouchableOpacity onPress={() => onOpenChange?.(false)} activeOpacity={0.7} style={applyTw('p-0.5')}>
                {renderFlaticon('fi fi-rr-cross-small', { size: 14, color: isDestructive ? '#fca5a5' : '#71717a' })}
            </TouchableOpacity>
        </Animated.View>
    );
};

/**
 * ToastViewport — stacks multiple Toast items; pair with `useToast()`.
 */
export const ToastViewport = ({ children, className = '' }) => (
    <View style={applyTw(`gap-2 ${className}`)}>{children}</View>
);

// ---- useToast() convenience hook ---------------------------------------

const ToastQueueContext = createContext(null);

export const ToastQueueProvider = ({ children, duration = 3500 }) => {
    const [items, setItems] = useState([]);
    const idRef = useRef(0);

    const dismiss = useCallback((id) => {
        setItems((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = useCallback(
        ({ title, description, variant = 'default', action } = {}) => {
            const id = ++idRef.current;
            setItems((prev) => [...prev, { id, title, description, variant, action, open: true }]);
            if (duration > 0) {
                setTimeout(() => dismiss(id), duration);
            }
            return id;
        },
        [dismiss, duration]
    );

    return (
        <ToastQueueContext.Provider value={{ items, showToast, dismiss }}>
            {children}
        </ToastQueueContext.Provider>
    );
};

export const useToast = () => {
    const ctx = useContext(ToastQueueContext);
    if (!ctx) throw new Error('useToast must be used within a <ToastQueueProvider>');
    return { toast: ctx.showToast, dismiss: ctx.dismiss, toasts: ctx.items };
};

// ==================== DEMO COMPONENT ====================

const ToastDemoInner = () => {
    const { toast, dismiss, toasts } = useToast();

    return (
        <View style={applyTw('gap-8')}>
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Toast</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    A controlled notification primitive with a `useToast()` queue hook.
                </Text>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Trigger</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222] gap-3')}>
                    <Button
                        variant="outline"
                        onPress={() =>
                            toast({
                                title: 'Scheduled: Catch up',
                                description: 'Friday, July 25th at 5:00pm',
                                action: { label: 'Undo', onPress: () => {} },
                            })
                        }
                    >
                        Show Toast
                    </Button>
                    <Button
                        variant="outline"
                        onPress={() =>
                            toast({
                                title: 'Uh oh! Something went wrong.',
                                description: 'There was a problem with your request.',
                                variant: 'destructive',
                            })
                        }
                    >
                        Show Destructive Toast
                    </Button>
                </View>
            </View>

            <View style={applyTw('gap-4 mb-8')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Live Queue</Text>
                <ToastViewport>
                    {toasts.length === 0 && (
                        <Text style={applyTw('text-gray-500 text-sm')}>No active toasts — tap a button above.</Text>
                    )}
                    {toasts.map((t) => (
                        <Toast
                            key={t.id}
                            open={t.open}
                            variant={t.variant}
                            title={t.title}
                            description={t.description}
                            action={t.action}
                            onOpenChange={(open) => !open && dismiss(t.id)}
                        />
                    ))}
                </ToastViewport>
            </View>
        </View>
    );
};

export const ToastDemo = () => (
    <ToastQueueProvider>
        <ToastDemoInner />
    </ToastQueueProvider>
);

export default Toast;
