import React, { useState } from 'react';
import { View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { applyTw } from '../../../style/style';
import { Text } from '../text';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../card';
import Svg, { Line, Rect, Text as SvgText } from 'react-native-svg';
import { renderFlaticon } from '../../../functions/iconUtils';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 100;

const chartColors = {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    tertiary: '#10b981',
    quaternary: '#f59e0b',
    danger: '#ef4444',
    dark: '#1e293b',
    muted: '#64748b'
};

// ==================== TYPE 1: INTERACTIVE (Original) ====================
const BarChartInteractive = () => {
    const [activeChart, setActiveChart] = useState('desktop');

    const chartData = [
        { date: '2024-06-01', desktop: 178, mobile: 200 },
        { date: '2024-06-08', desktop: 385, mobile: 320 },
        { date: '2024-06-15', desktop: 307, mobile: 350 },
        { date: '2024-06-22', desktop: 317, mobile: 270 },
        { date: '2024-06-29', desktop: 103, mobile: 160 },
    ];

    const total = {
        desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
        mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    };

    const maxValue = Math.max(...chartData.map(d => Math.max(d.desktop, d.mobile)));
    const chartHeight = 220;
    const barWidth = (CHART_WIDTH - 40) / chartData.length;
    const barPadding = 16;

    return (
        <View>
            <View style={applyTw('flex-row gap-2 mb-6')}>
                {['desktop', 'mobile'].map(key => (
                    <TouchableOpacity
                        key={key}
                        onPress={() => setActiveChart(key)}
                        style={applyTw(`flex-1 p-3 rounded-lg border ${activeChart === key ? 'border-white bg-[#1a1a1a]' : 'border-[#2A2A2A] bg-transparent'}`)}
                    >
                        <Text style={applyTw('text-gray-400 text-xs mb-1')}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Text>
                        <Text style={applyTw('text-white text-xl font-bold')}>
                            {total[key].toLocaleString()}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Svg width={CHART_WIDTH} height={chartHeight}>
                {/* Grid lines */}
                {[0, 1, 2, 3].map(i => (
                    <Line
                        key={i}
                        x1="0"
                        y1={i * (chartHeight - 30) / 3}
                        x2={CHART_WIDTH}
                        y2={i * (chartHeight - 30) / 3}
                        stroke="#262626"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                    />
                ))}

                {/* Bars */}
                {chartData.map((item, index) => {
                    const barHeight = (item[activeChart] / maxValue) * (chartHeight - 40);
                    const x = index * barWidth + barPadding;
                    const y = chartHeight - 30 - barHeight;

                    return (
                        <Rect
                            key={index}
                            x={x}
                            y={y}
                            width={barWidth - (barPadding * 2)}
                            height={barHeight}
                            fill={activeChart === 'desktop' ? chartColors.primary : chartColors.secondary}
                            rx="4"
                        />
                    );
                })}
                {/* X Axis Labels */}
                {chartData.map((item, index) => (
                    <SvgText
                        key={index}
                        x={index * barWidth + barWidth / 2}
                        y={chartHeight - 10}
                        fontSize="10"
                        fill="#6b7280"
                        textAnchor="middle"
                    >
                        {item.date.slice(5)}
                    </SvgText>
                ))}
            </Svg>
        </View>
    );
};

// ==================== TYPE 2: HORIZONTAL ====================
const BarChartHorizontal = () => {
    const data = [
        { month: 'Jan', value: 186 },
        { month: 'Feb', value: 305 },
        { month: 'Mar', value: 237 },
        { month: 'Apr', value: 73 },
        { month: 'May', value: 209 },
        { month: 'Jun', value: 214 },
    ];

    const chartHeight = 250;
    const maxValue = Math.max(...data.map(d => d.value));
    const rowHeight = chartHeight / data.length;
    const barHeight = 24;

    const TrendIcon = () => renderFlaticon('fi fi-rr-arrow-trend-up', { size: 16, color: '#10b981' });

    return (
        <View>
            <View style={applyTw('mb-4')}>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Monthly Distribution
                </Text>
            </View>
            <Svg width={CHART_WIDTH} height={chartHeight}>
                {data.map((item, index) => {
                    const barWidth = (item.value / maxValue) * (CHART_WIDTH - 40);
                    const y = index * rowHeight + (rowHeight - barHeight) / 2;

                    return (
                        <React.Fragment key={index}>
                            {/* Label */}
                            <SvgText
                                x="0"
                                y={y + 16}
                                fontSize="12"
                                fill="#94a3b8"
                            >
                                {item.month}
                            </SvgText>
                            {/* Bar background */}
                            <Rect
                                x="35"
                                y={y}
                                width={CHART_WIDTH - 35}
                                height={barHeight}
                                fill="#1e293b"
                                rx="4"
                            />
                            {/* Value Bar */}
                            <Rect
                                x="35"
                                y={y}
                                width={barWidth}
                                height={barHeight}
                                fill={chartColors.primary}
                                rx="4"
                            />
                            {/* Value Text */}
                            <SvgText
                                x={35 + barWidth + 8}
                                y={y + 16}
                                fontSize="10"
                                fill="#fff"
                            >
                                {item.value}
                            </SvgText>
                        </React.Fragment>
                    );
                })}
            </Svg>
            <View style={applyTw('mt-2 flex-row items-center gap-2')}>
                <Text style={applyTw('text-white text-sm font-medium')}>
                    Trending up by 5.2% this month
                </Text>
                <TrendIcon />
            </View>
        </View>
    );
};

// ==================== TYPE 3: MULTIPLE (GROUPED) ====================
const BarChartMultiple = () => {
    const data = [
        { month: 'Jan', desktop: 186, mobile: 80 },
        { month: 'Feb', desktop: 305, mobile: 200 },
        { month: 'Mar', desktop: 237, mobile: 120 },
        { month: 'Apr', desktop: 73, mobile: 190 },
        { month: 'May', desktop: 209, mobile: 130 },
        { month: 'Jun', desktop: 214, mobile: 140 },
    ];

    const chartHeight = 220;
    const maxValue = Math.max(...data.map(d => Math.max(d.desktop, d.mobile)));
    const groupWidth = CHART_WIDTH / data.length;
    const barWidth = (groupWidth - 20) / 2;

    return (
        <View>
            <View style={applyTw('mb-4')}>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Device comparison
                </Text>
            </View>
            <Svg width={CHART_WIDTH} height={chartHeight}>
                {/* Grid */}
                <Line x1="0" y1={chartHeight - 30} x2={CHART_WIDTH} y2={chartHeight - 30} stroke="#262626" strokeWidth="1" />

                {data.map((item, index) => {
                    const xBase = index * groupWidth + 10;
                    const hDesktop = (item.desktop / maxValue) * (chartHeight - 40);
                    const hMobile = (item.mobile / maxValue) * (chartHeight - 40);

                    return (
                        <React.Fragment key={index}>
                            {/* Desktop Bar */}
                            <Rect
                                x={xBase}
                                y={chartHeight - 30 - hDesktop}
                                width={barWidth}
                                height={hDesktop}
                                fill={chartColors.primary}
                                rx="4"
                            />
                            {/* Mobile Bar */}
                            <Rect
                                x={xBase + barWidth + 4} // 4px gap
                                y={chartHeight - 30 - hMobile}
                                width={barWidth}
                                height={hMobile}
                                fill={chartColors.secondary}
                                rx="4"
                            />
                            {/* Label */}
                            <SvgText
                                x={xBase + barWidth}
                                y={chartHeight - 10}
                                fontSize="10"
                                fill="#6b7280"
                                textAnchor="middle"
                            >
                                {item.month}
                            </SvgText>
                        </React.Fragment>
                    );
                })}
            </Svg>
            {/* Legend */}
            <View style={applyTw('flex-row justify-center gap-6 mt-4')}>
                <View style={applyTw('flex-row items-center gap-2')}>
                    <View style={[applyTw('w-3 h-3 rounded'), { backgroundColor: chartColors.primary }]} />
                    <Text style={applyTw('text-gray-400 text-sm')}>Desktop</Text>
                </View>
                <View style={applyTw('flex-row items-center gap-2')}>
                    <View style={[applyTw('w-3 h-3 rounded'), { backgroundColor: chartColors.secondary }]} />
                    <Text style={applyTw('text-gray-400 text-sm')}>Mobile</Text>
                </View>
            </View>
        </View>
    );
};

// ==================== TYPE 4: STACKED + LEGEND ====================
const BarChartStacked = () => {
    const data = [
        { month: 'Jan', desktop: 186, mobile: 80 },
        { month: 'Feb', desktop: 305, mobile: 200 },
        { month: 'Mar', desktop: 237, mobile: 120 },
        { month: 'Apr', desktop: 73, mobile: 190 },
        { month: 'May', desktop: 209, mobile: 130 },
        { month: 'Jun', desktop: 214, mobile: 140 },
    ];

    const chartHeight = 220;
    const maxValue = Math.max(...data.map(d => d.desktop + d.mobile));
    const columnWidth = CHART_WIDTH / data.length;
    const barWidth = columnWidth - 24;

    return (
        <View>
            <View style={applyTw('mb-4')}>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Combined traffic sources
                </Text>
            </View>
            <Svg width={CHART_WIDTH} height={chartHeight}>
                <Line x1="0" y1={chartHeight - 30} x2={CHART_WIDTH} y2={chartHeight - 30} stroke="#262626" strokeWidth="1" />

                {data.map((item, index) => {
                    const x = index * columnWidth + 12;
                    const totalHeight = item.desktop + item.mobile;
                    const hTotal = (totalHeight / maxValue) * (chartHeight - 40);
                    const hDesktop = (item.desktop / totalHeight) * hTotal;
                    const hMobile = (item.mobile / totalHeight) * hTotal;

                    return (
                        <React.Fragment key={index}>
                            {/* Mobile (Top) */}
                            <Rect
                                x={x}
                                y={chartHeight - 30 - hDesktop - hMobile}
                                width={barWidth}
                                height={hMobile}
                                fill={chartColors.secondary} // Top color
                                rx="4"
                            />
                            {/* Desktop (Bottom) - Overdraw slightly to cover rounded corners gap if needed, or just stack */}
                            {/* Actually for proper stacking with radius only on textremes, we might need path but Rect is fine for simple demo */}
                            <Rect
                                x={x}
                                y={chartHeight - 30 - hDesktop}
                                width={barWidth}
                                height={hDesktop}
                                fill={chartColors.primary} // Bottom color
                                rx="4"
                            />

                            <SvgText
                                x={x + barWidth / 2}
                                y={chartHeight - 10}
                                fontSize="10"
                                fill="#6b7280"
                                textAnchor="middle"
                            >
                                {item.month}
                            </SvgText>
                        </React.Fragment>
                    );
                })}
            </Svg>
            <View style={applyTw('flex-row justify-center gap-6 mt-4')}>
                <View style={applyTw('flex-row items-center gap-2')}>
                    <View style={[applyTw('w-3 h-3 rounded'), { backgroundColor: chartColors.primary }]} />
                    <Text style={applyTw('text-gray-400 text-sm')}>Desktop</Text>
                </View>
                <View style={applyTw('flex-row items-center gap-2')}>
                    <View style={[applyTw('w-3 h-3 rounded'), { backgroundColor: chartColors.secondary }]} />
                    <Text style={applyTw('text-gray-400 text-sm')}>Mobile</Text>
                </View>
            </View>
        </View>
    );
};

// ==================== TYPE 5: WITH LABELS (ON TOP) ====================
const BarChartLabel = () => {
    const data = [
        { month: 'Jan', value: 186 },
        { month: 'Feb', value: 305 },
        { month: 'Mar', value: 237 },
        { month: 'Apr', value: 73 },
        { month: 'May', value: 209 },
        { month: 'Jun', value: 214 },
    ];

    const chartHeight = 220;
    const maxValue = Math.max(...data.map(d => d.value)) * 1.15; // Extra space for labels
    const colWidth = CHART_WIDTH / data.length;
    const barWidth = colWidth - 20;

    return (
        <View>
            <View style={applyTw('mb-4')}>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Direct value display
                </Text>
            </View>
            <Svg width={CHART_WIDTH} height={chartHeight}>
                {data.map((item, index) => {
                    const h = (item.value / maxValue) * (chartHeight - 40);
                    const x = index * colWidth + 10;
                    const y = chartHeight - 30 - h;

                    return (
                        <React.Fragment key={index}>
                            <Rect
                                x={x}
                                y={y}
                                width={barWidth}
                                height={h}
                                fill={chartColors.primary}
                                rx="6"
                            />
                            {/* Value Label */}
                            <SvgText
                                x={x + barWidth / 2}
                                y={y - 8}
                                fontSize="12"
                                fill="#fff"
                                textAnchor="middle"
                            >
                                {item.value}
                            </SvgText>
                            {/* Month Label */}
                            <SvgText
                                x={x + barWidth / 2}
                                y={chartHeight - 10}
                                fontSize="10"
                                fill="#6b7280"
                                textAnchor="middle"
                            >
                                {item.month}
                            </SvgText>
                        </React.Fragment>
                    );
                })}
            </Svg>
        </View>
    );
};

// ==================== TYPE 6: NEGATIVE ====================
const BarChartNegative = () => {
    const data = [
        { month: 'Jan', value: 186 },
        { month: 'Feb', value: 305 },
        { month: 'Mar', value: -237 }, // Negative
        { month: 'Apr', value: 73 },
        { month: 'May', value: -209 }, // Negative
        { month: 'Jun', value: 214 },
    ];

    const chartHeight = 250;
    const maxVal = Math.max(...data.map(d => Math.abs(d.value)));
    const zeroLineY = chartHeight / 2;
    const colWidth = CHART_WIDTH / data.length;
    const barWidth = colWidth - 20;

    return (
        <View>
            <View style={applyTw('mb-4')}>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Positive and negative growth
                </Text>
            </View>
            <Svg width={CHART_WIDTH} height={chartHeight}>
                {/* Zero Line */}
                <Line x1="0" y1={zeroLineY} x2={CHART_WIDTH} y2={zeroLineY} stroke="#262626" strokeWidth="1" />

                {data.map((item, index) => {
                    const h = (Math.abs(item.value) / maxVal) * ((chartHeight / 2) - 20);
                    const x = index * colWidth + 10;
                    const y = item.value >= 0 ? zeroLineY - h : zeroLineY;

                    return (
                        <React.Fragment key={index}>
                            <Rect
                                x={x}
                                y={y}
                                width={barWidth}
                                height={h}
                                fill={item.value >= 0 ? chartColors.primary : chartColors.danger}
                                rx="4"
                            />
                            <SvgText
                                x={x + barWidth / 2}
                                y={item.value >= 0 ? y - 8 : y + h + 15}
                                fontSize="10"
                                fill={item.value >= 0 ? chartColors.primary : chartColors.danger}
                                textAnchor="middle"
                            >
                                {Math.abs(item.value)}
                            </SvgText>
                            <SvgText
                                x={x + barWidth / 2}
                                y={item.value >= 0 ? zeroLineY + 15 : zeroLineY - 8}
                                fontSize="10"
                                fill="#6b7280"
                                textAnchor="middle"
                            >
                                {item.month}
                            </SvgText>
                        </React.Fragment>
                    );
                })}
            </Svg>
        </View>
    );
};

// ==================== MAIN EXPORT ====================
export const ChartBarInteractive = () => {
    const [chartType, setChartType] = useState(1);

    const chartTypes = [
        { id: 1, label: 'Interactive', component: BarChartInteractive },
        { id: 2, label: 'Horizontal', component: BarChartHorizontal },
        { id: 3, label: 'Multiple', component: BarChartMultiple },
        { id: 4, label: 'Stacked', component: BarChartStacked },
        { id: 5, label: 'With Labels', component: BarChartLabel },
        { id: 6, label: 'Negative', component: BarChartNegative },
    ];

    const CurrentChart = chartTypes.find(t => t.id === chartType)?.component || BarChartInteractive;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Bar Chart - Showcase</CardTitle>
                <CardDescription>
                    Explore different bar chart visualizations
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
                <CurrentChart />
            </CardContent>
        </Card>
    );
};

export default ChartBarInteractive;
