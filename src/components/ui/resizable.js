import React, { createContext, useContext, useRef, useState } from 'react';
import { View, PanResponder, ScrollView } from 'react-native';
import { applyTw } from '../../style/_elst';
import { Text } from './text';
import { renderFlaticon } from '../../functions/iconUtils';

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

const ResizableContext = createContext(null);

/**
 * ResizablePanelGroup — a set of panels that can be resized relative to
 * each other by dragging the handle(s) between them.
 *
 * @param {string} direction - 'horizontal' | 'vertical'
 * @param {number} initialSplit - Initial percentage (0-100) given to the first panel
 */
export const ResizablePanelGroup = ({
    direction = 'horizontal',
    initialSplit = 50,
    minSplit = 15,
    maxSplit = 85,
    className = '',
    style,
    children,
}) => {
    const [split, setSplit] = useState(initialSplit);
    const containerSize = useRef(0);
    const isHorizontal = direction === 'horizontal';

    return (
        <ResizableContext.Provider value={{ split, setSplit, containerSize, isHorizontal, minSplit, maxSplit }}>
            <View
                style={[applyTw(`${isHorizontal ? 'flex-row' : 'flex-col'} ${className}`), style]}
                onLayout={(e) =>
                    (containerSize.current = isHorizontal ? e.nativeEvent.layout.width : e.nativeEvent.layout.height)
                }
            >
                {children}
            </View>
        </ResizableContext.Provider>
    );
};

/**
 * ResizablePanel — one side of the split. `side` selects whether this
 * panel takes the `split` percentage ('first') or the remainder ('second').
 */
export const ResizablePanel = ({ side = 'first', className = '', children }) => {
    const { split, isHorizontal } = useContext(ResizableContext);
    const percent = side === 'first' ? split : 100 - split;

    return (
        <View
            style={[
                applyTw(className),
                isHorizontal ? { width: `${percent}%` } : { height: `${percent}%` },
            ]}
        >
            {children}
        </View>
    );
};

/**
 * ResizableHandle — the draggable divider between two panels.
 */
export const ResizableHandle = ({ withGrip = true }) => {
    const { setSplit, containerSize, isHorizontal, minSplit, maxSplit } = useContext(ResizableContext);
    const startSplit = useRef(50);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                setSplit((current) => {
                    startSplit.current = current;
                    return current;
                });
            },
            onPanResponderMove: (_, gesture) => {
                if (containerSize.current <= 0) return;
                const delta = isHorizontal ? gesture.dx : gesture.dy;
                const deltaPercent = (delta / containerSize.current) * 100;
                setSplit(clamp(startSplit.current + deltaPercent, minSplit, maxSplit));
            },
        })
    ).current;

    return (
        <View
            {...panResponder.panHandlers}
            style={applyTw(
                `bg-[#2A2A2A] items-center justify-center ${isHorizontal ? 'w-3 mx-[-6px]' : 'h-3 my-[-6px]'}`
            )}
        >
            {withGrip && (
                <View
                    style={applyTw(
                        `bg-[#3f3f46] rounded-full items-center justify-center ${isHorizontal ? 'w-4 h-8' : 'h-4 w-8'
                        }`
                    )}
                >
                    {renderFlaticon(isHorizontal ? 'fi fi-rr-grip-lines-vertical' : 'fi fi-rr-grip-lines', {
                        size: 12,
                        color: '#d4d4d8',
                    })}
                </View>
            )}
        </View>
    );
};

// ==================== DEMO COMPONENT ====================

const Placeholder = ({ label }) => (
    <View style={applyTw('flex-1 items-center justify-center')}>
        <Text style={applyTw('text-gray-300 text-sm font-medium')}>{label}</Text>
    </View>
);

export const ResizableDemo = () => {
    return (
        <ScrollView style={applyTw('flex-1')} contentContainerStyle={applyTw('p-5 gap-8 pb-20')}>
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Resizable</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    Drag the handle to resize panels relative to each other.
                </Text>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Horizontal</Text>
                <View style={applyTw('h-48 rounded-lg border border-[#222] overflow-hidden bg-[#0a0a0a]')}>
                    <ResizablePanelGroup direction="horizontal" initialSplit={40} className="h-full">
                        <ResizablePanel side="first" className="bg-[#141414]">
                            <Placeholder label="One" />
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel side="second" className="bg-[#0d0d0d]">
                            <Placeholder label="Two" />
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </View>
            </View>

            <View style={applyTw('gap-4 mb-8')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Vertical</Text>
                <View style={applyTw('h-64 rounded-lg border border-[#222] overflow-hidden bg-[#0a0a0a]')}>
                    <ResizablePanelGroup direction="vertical" initialSplit={35} className="h-full">
                        <ResizablePanel side="first" className="bg-[#141414]">
                            <Placeholder label="Header" />
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel side="second" className="bg-[#0d0d0d]">
                            <Placeholder label="Content" />
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </View>
            </View>
        </ScrollView>
    );
};

export default ResizablePanelGroup;
