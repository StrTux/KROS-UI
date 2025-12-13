import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { applyTw } from '../../../style/style';
import { Text } from '../text';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card';
import Svg, { Rect, Line, G, Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';
import { renderFlaticon } from '../../../functions/iconUtils';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 100;

const chartColors = {
    running: '#3b82f6', // blue
    swimming: '#60a5fa', // light blue
};

const data = [
    { day: 'Mon', date: '2024-07-15', running: 120, swimming: 140 },
    { day: 'Tue', date: '2024-07-16', running: 150, swimming: 200 },
    { day: 'Wed', date: '2024-07-17', running: 180, swimming: 120 },
    { day: 'Thu', date: '2024-07-18', running: 220, swimming: 160 },
    { day: 'Fri', date: '2024-07-19', running: 280, swimming: 240 },
    { day: 'Sat', date: '2024-07-20', running: 250, swimming: 200 },
];

const chartHeight = 220;
const maxValue = 600; // max stacked height

// ==================== TOOLTIP COMPONENT ====================
const Tooltip = ({ x, y, data, type }) => {
    // Styles customization based on type
    const showIndicator = type === 'line-indicator' || type === 'advanced';
    const hideIndicator = type === 'no-indicator' || type === 'default'; // Default has no indicator in image usually or minimal

    // Content customization
    let title = data.date;
    if (type === 'custom-label') title = 'Activities';
    if (type === 'label-formatter') title = new Date(data.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    if (type === 'no-label') title = null;

    // Value formatter
    const formatValue = (val) => type === 'formatter' || type === 'advanced' ? `${val} kcal` : val;

    // Icons
    const showIcons = type === 'icons' || type === 'advanced';

    return (
        <View
            style={[
                applyTw('absolute bg-[#1e1e1e] border border-[#333] p-3 rounded-lg shadow-lg z-50'),
                {
                    left: x - 60, // Center horizontally relative to bar
                    top: -10, // Position above usually, but we'll adapt
                    width: 140
                }
            ]}
        >
            {title && (
                <Text style={applyTw('text-gray-400 text-xs mb-2 font-medium border-b border-[#333] pb-1')}>
                    {title}
                </Text>
            )}

            <View style={applyTw('gap-1.5')}>
                {/* Running */}
                <View style={applyTw('flex-row items-center justify-between')}>
                    <View style={applyTw('flex-row items-center gap-2')}>
                        <View style={applyTw(`w-2 h-2 rounded-sm ${showIcons ? 'bg-transparent' : 'bg-blue-500'}`)}>
                            {showIcons && renderFlaticon('fi fi-rr-running', { size: 10, color: '#3b82f6' })}
                        </View>
                        <Text style={applyTw('text-white text-xs')}>Running</Text>
                    </View>
                    <Text style={applyTw('text-white text-xs font-bold')}>{formatValue(data.running)}</Text>
                </View>

                {/* Swimming */}
                <View style={applyTw('flex-row items-center justify-between')}>
                    <View style={applyTw('flex-row items-center gap-2')}>
                        <View style={applyTw(`w-2 h-2 rounded-sm ${showIcons ? 'bg-transparent' : 'bg-blue-300'}`)}>
                            {showIcons && renderFlaticon('fi fi-rr-swimmer', { size: 10, color: '#60a5fa' })}
                        </View>
                        <Text style={applyTw('text-white text-xs')}>Swimming</Text>
                    </View>
                    <Text style={applyTw('text-white text-xs font-bold')}>{formatValue(data.swimming)}</Text>
                </View>

                {/* Advanced Total */}
                {type === 'advanced' && (
                    <View style={applyTw('mt-1 pt-1 border-t border-[#333] flex-row items-center justify-between')}>
                        <Text style={applyTw('text-gray-400 text-xs')}>Total</Text>
                        <Text style={applyTw('text-white text-xs font-bold')}>{formatValue(data.running + data.swimming)}</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

// ==================== MAIN COMPONENT ====================
export const ChartTooltipIndicatorNone = () => { // Keeps generic name but acts as StackedBar showcase
    const [chartType, setChartType] = useState('default');
    const [activeIndex, setActiveIndex] = useState(null); // For tooltip

    const chartTypes = [
        { id: 'default', label: 'Default' },
        { id: 'line-indicator', label: 'Line Indicator' },
        { id: 'no-indicator', label: 'No Indicator' },
        { id: 'custom-label', label: 'Custom Label' },
        { id: 'label-formatter', label: 'Label Formatter' },
        { id: 'no-label', label: 'No Label' },
        { id: 'formatter', label: 'Formatter' },
        { id: 'icons', label: 'Icons' },
        { id: 'advanced', label: 'Advanced' },
    ];

    const barWidth = 32;
    const spacing = (CHART_WIDTH - (data.length * barWidth)) / (data.length + 1);

    const handleTouch = (event) => {
        const { locationX } = event.nativeEvent;
        // Find closest bar index
        const index = Math.floor((locationX - spacing / 2) / (barWidth + spacing)); // Rough approximation

        // More precise hit testing
        const clickedIndex = data.findIndex((_, i) => {
            const startX = spacing + i * (barWidth + spacing);
            const endX = startX + barWidth;
            return locationX >= startX && locationX <= endX;
        });

        if (clickedIndex !== -1) {
            setActiveIndex(clickedIndex === activeIndex ? null : clickedIndex);
        } else {
            setActiveIndex(null);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Stacked Bar - Tooltip Styles</CardTitle>
                <CardDescription>
                    Tap bars to see tooltip variations
                </CardDescription>

                {/* Type Selector */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={applyTw('mt-4')}
                    contentContainerStyle={applyTw('gap-2')}
                >
                    {chartTypes.map(type => (
                        <TouchableOpacity
                            key={type.id}
                            onPress={() => setChartType(type.id)}
                            style={applyTw(`px-4 py-2 rounded-lg ${chartType === type.id ? 'bg-white' : 'bg-[#111111] border border-[#2A2A2A]'}`)}
                        >
                            <Text style={applyTw(`text-xs font-medium ${chartType === type.id ? 'text-black' : 'text-gray-400'}`)}>
                                {type.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </CardHeader>

            <CardContent>
                <View style={applyTw('items-center h-[250px] justify-center')} onTouchEnd={handleTouch}>
                    <Svg width={CHART_WIDTH} height={chartHeight}>
                        {/* Grid lines */}
                        {[0, 0.25, 0.5, 0.75, 1].map((scale, i) => {
                            const y = chartHeight - 30 - (scale * (chartHeight - 30));
                            if (i === 0) return null; // Skip bottom line handled by axis
                            return (
                                <Line
                                    key={i}
                                    x1="0" y1={y}
                                    x2={CHART_WIDTH} y2={y}
                                    stroke="#333" strokeDasharray="4 4" strokeWidth="1"
                                />
                            );
                        })}

                        {data.map((item, index) => {
                            const x = spacing + index * (barWidth + spacing);

                            const runningH = (item.running / maxValue) * (chartHeight - 30);
                            const swimmingH = (item.swimming / maxValue) * (chartHeight - 30);

                            const runningY = chartHeight - 30 - runningH;
                            const swimmingY = runningY - swimmingH;

                            const isActive = activeIndex === index;

                            return (
                                <G key={index}>
                                    {/* Indicator Line (if active and type requires it) */}
                                    {isActive && (chartType === 'line-indicator') && (
                                        <Line
                                            x1={x + barWidth / 2} y1="0"
                                            x2={x + barWidth / 2} y2={chartHeight - 30}
                                            stroke="#444" strokeWidth="1" strokeDasharray="4 4"
                                        />
                                    )}

                                    {/* Stack 1: Swimming (Top) */}
                                    <Rect
                                        x={x}
                                        y={swimmingY}
                                        width={barWidth}
                                        height={swimmingH}
                                        fill={chartColors.swimming}
                                        opacity={isActive ? 1 : 0.7}
                                        rx={4} ry={4} // Rounded top corners
                                    />
                                    {/* Mask bottom corners of top stack to be flat? Nah, simple stack looks OK */}

                                    {/* Stack 2: Running (Bottom) */}
                                    <Rect
                                        x={x}
                                        y={runningY}
                                        width={barWidth}
                                        height={runningH}
                                        fill={chartColors.running}
                                        opacity={isActive ? 1 : 0.7}
                                    />

                                    {/* X Axis Label */}
                                    <SvgText
                                        x={x + barWidth / 2}
                                        y={chartHeight - 10}
                                        fontSize="10"
                                        fill="#9ca3af"
                                        textAnchor="middle"
                                    >
                                        {item.day}
                                    </SvgText>
                                </G>
                            );
                        })}
                    </Svg>

                    {/* Floating Tooltip HTML/View Overlay */}
                    {activeIndex !== null && (
                        <View style={applyTw('absolute top-10 left-0 w-full items-start')} pointerEvents="none">
                            {/* We calculate position manually relative to container */}
                            <Tooltip
                                x={(spacing + activeIndex * (barWidth + spacing)) + barWidth / 2} // center of bar
                                y={50} // fixed top pos or dynamic
                                data={data[activeIndex]}
                                type={chartType}
                            />
                        </View>
                    )}
                </View>
            </CardContent>

            <CardFooter>
                <View style={applyTw('gap-2')}>
                    <Text style={applyTw('text-white text-sm font-medium')}>
                        Total calories burned
                    </Text>
                    <Text style={applyTw('text-gray-400 text-sm')}>
                        Showing total for the last 6 days
                    </Text>
                </View>
            </CardFooter>
        </Card>
    );
};

export default ChartTooltipIndicatorNone;
