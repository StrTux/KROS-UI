// ==================== SONNER (toast notifications) ====================
// A global, imperative toast API — call `toast('message')` from anywhere
// (no hooks, no context needed) and mount <Toaster /> once near the root
// of your app to render them.

import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { applyTw } from '../../style/_elst';
import { Text } from './text';
import { Button } from './button';
import { renderFlaticon } from '../../functions/iconUtils';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ---- Module-level store (pub/sub) --------------------------------------

let listeners = [];
let toastId = 0;

const emit = (toasts) => listeners.forEach((l) => l(toasts));

let toasts = [];

const addToast = (message, options = {}) => {
    const id = options.id ?? ++toastId;
    const next = {
        id,
        message,
        description: options.description,
        variant: options.variant || 'default',
        duration: options.duration ?? 3500,
        action: options.action,
    };
    toasts = [...toasts.filter((t) => t.id !== id), next];
    emit(toasts);
    return id;
};

const dismissToast = (id) => {
    toasts = toasts.filter((t) => t.id !== id);
    emit(toasts);
};

export const toast = Object.assign(
    (message, options) => addToast(message, options),
    {
        success: (message, options) => addToast(message, { ...options, variant: 'success' }),
        error: (message, options) => addToast(message, { ...options, variant: 'error' }),
        warning: (message, options) => addToast(message, { ...options, variant: 'warning' }),
        info: (message, options) => addToast(message, { ...options, variant: 'info' }),
        dismiss: (id) => dismissToast(id),
    }
);

const useToasts = () => {
    const [state, setState] = useState(toasts);
    useEffect(() => {
        listeners.push(setState);
        return () => {
            listeners = listeners.filter((l) => l !== setState);
        };
    }, []);
    return state;
};

// ---- Visual pieces ------------------------------------------------------

const VARIANT_ICON = {
    success: { name: 'fi fi-rr-check', color: '#4ade80' },
    error: { name: 'fi fi-rr-cross-small', color: '#f87171' },
    warning: { name: 'fi fi-rr-triangle-warning', color: '#facc15' },
    info: { name: 'fi fi-rr-info', color: '#60a5fa' },
    default: null,
};

const ToastCard = ({ item, onDismiss }) => {
    const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(anim, { toValue: 1, useNativeDriver: true, tension: 80, friction: 10 }).start();

        if (item.duration > 0) {
            const timer = setTimeout(() => close(), item.duration);
            return () => clearTimeout(timer);
        }
    }, []);

    const close = () => {
        Animated.timing(anim, { toValue: 0, duration: 150, useNativeDriver: true }).start(() => {
            onDismiss(item.id);
        });
    };

    const icon = VARIANT_ICON[item.variant];

    return (
        <Animated.View
            style={[
                applyTw('bg-[#18181b] border border-[#27272a] rounded-lg px-4 py-3 flex-row items-start gap-3'),
                {
                    opacity: anim,
                    transform: [
                        { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) },
                        { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] }) },
                    ],
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.35,
                    shadowRadius: 10,
                    elevation: 10,
                },
            ]}
        >
            {icon && <View style={applyTw('mt-0.5')}>{renderFlaticon(icon.name, { size: 16, color: icon.color })}</View>}
            <View style={applyTw('flex-1 gap-0.5')}>
                <Text style={applyTw('text-white text-sm font-medium')}>{item.message}</Text>
                {item.description && (
                    <Text style={applyTw('text-gray-400 text-xs')}>{item.description}</Text>
                )}
                {item.action && (
                    <TouchableOpacity
                        onPress={() => {
                            item.action.onPress?.();
                            close();
                        }}
                        activeOpacity={0.7}
                        style={applyTw('mt-1.5 self-start')}
                    >
                        <Text style={applyTw('text-white text-xs font-semibold underline')}>
                            {item.action.label}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
            <TouchableOpacity onPress={close} activeOpacity={0.7} style={applyTw('p-0.5')}>
                {renderFlaticon('fi fi-rr-cross-small', { size: 14, color: '#71717a' })}
            </TouchableOpacity>
        </Animated.View>
    );
};

/**
 * Toaster — mount once (e.g. in App.js, as a sibling to the rest of your
 * UI) to render toasts pushed via the `toast()` API.
 *
 * @param {string} position - 'bottom' | 'top'
 */
export const Toaster = ({ position = 'bottom' }) => {
    const items = useToasts();

    if (items.length === 0) return null;

    return (
        <View
            pointerEvents="box-none"
            style={[
                applyTw(`absolute left-0 right-0 px-4 gap-2 ${position === 'top' ? 'top-4' : 'bottom-4'}`),
                {
                    zIndex: 9999,
                    alignItems: 'center',
                },
            ]}
        >
            {items.map((item) => (
                <ToastCard key={item.id} item={item} onDismiss={dismissToast} />
            ))}
        </View>
    );
};

// ==================== DEMO COMPONENT ====================

export const SonnerDemo = () => {
    return (
        <View style={applyTw('gap-8')}>
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Sonner</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    An opinionated, global toast notification system — call{' '}
                    <Text style={applyTw('text-white font-semibold')}>toast()</Text> from anywhere.
                </Text>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Variants</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222] gap-3')}>
                    <Button variant="outline" onPress={() => toast('Event has been created')}>
                        Default
                    </Button>
                    <Button variant="outline" onPress={() => toast.success('Changes saved successfully')}>
                        Success
                    </Button>
                    <Button variant="outline" onPress={() => toast.error('Something went wrong')}>
                        Error
                    </Button>
                    <Button variant="outline" onPress={() => toast.warning('Your session is about to expire')}>
                        Warning
                    </Button>
                    <Button variant="outline" onPress={() => toast.info('A new version is available')}>
                        Info
                    </Button>
                </View>
            </View>

            <View style={applyTw('gap-4 mb-8')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>With Description &amp; Action</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <Button
                        variant="outline"
                        onPress={() =>
                            toast('Event created', {
                                description: 'Monday, July 27th at 4:00pm',
                                action: { label: 'Undo', onPress: () => toast('Undo pressed') },
                            })
                        }
                    >
                        Show Toast with Action
                    </Button>
                </View>
            </View>

            <Toaster />
        </View>
    );
};

export default Toaster;
