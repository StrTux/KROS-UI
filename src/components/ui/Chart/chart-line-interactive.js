import React, { useState } from 'react';
import { View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { applyTw } from '../../../style/style';
import { Text } from '../text';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../card';
import Svg, { Line, Path, Circle, Text as SvgText, G } from 'react-native-svg';
import { renderFlaticon } from '../../../functions/iconUtils';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 100;

const chartColors = {
    primary: '#3b82f6', // blue
    secondary: '#8b5cf6', // purple
    tertiary: '#10b981', // green
    quaternary: '#f59e0b', // amber
    danger: '#ef4444', // red
    dark: '#1e293b',
    muted: '#64748b'
};

// ==================== HELPER: SMOOTH PATH (Simple Bezier) ====================
const getLinkPath = (points) => {
    if (points.length === 0) return '';

    // Simple catmull-rom to bezier conversion or just standard bezier control points
    // For simplicity, we'll implement a basic C command generator

    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];

        // Control points
        const cp1x = p0.x + (p1.x - p0.x) / 3;
        const cp1y = p0.y;
        const cp2x = p1.x - (p1.x - p0.x) / 3;
        const cp2y = p1.y;

        d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p1.x} ${p1.y}`;
    }

    return d;
};

// ==================== TYPE 1: INTERACTIVE (Original) ====================
const LineChartInteractive = () => {
    const [activeChart, setActiveChart] = useState('desktop');

    const chartData = [
        { date: '06-10', desktop: 155, mobile: 200 },
        { date: '06-12', desktop: 492, mobile: 420 },
        { date: '06-14', desktop: 426, mobile: 380 },
        { date: '06-16', desktop: 371, mobile: 310 },
        { date: '06-18', desktop: 107, mobile: 170 },
        { date: '06-20', desktop: 408, mobile: 450 },
        { date: '06-22', desktop: 317, mobile: 270 },
        { date: '06-24', desktop: 132, mobile: 180 },
        { date: '06-26', desktop: 434, mobile: 380 },
        { date: '06-28', desktop: 149, mobile: 200 },
        { date: '06-30', desktop: 446, mobile: 400 },
    ];

    const total = {
        desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
        mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    };

    const maxValue = Math.max(...chartData.map(d => Math.max(d.desktop, d.mobile)));
    const chartHeight = 220;
    const pointSpacing = (CHART_WIDTH - 40) / (chartData.length - 1);

    const points = chartData.map((item, index) => ({
        x: 20 + index * pointSpacing,
        y: chartHeight - 30 - (item[activeChart] / maxValue) * (chartHeight - 60)
    }));

    // Linear path for interactive one (as requested originally)
    const linePath = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');

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
                <Line x1="0" y1={chartHeight - 30} x2={CHART_WIDTH} y2={chartHeight - 30} stroke="#262626" strokeWidth="1" />

                <Path d={linePath} stroke={activeChart === 'desktop' ? chartColors.primary : chartColors.secondary} strokeWidth="3" fill="none" />

                {points.map((p, i) => (
                    <Circle key={i} cx={p.x} cy={p.y} r="5" fill={activeChart === 'desktop' ? chartColors.primary : chartColors.secondary} stroke="#000" strokeWidth="2" />
                ))}
            </Svg>
        </View>
    );
};

// ==================== TYPE 2: DEFAULT (Curved) ====================
const LineChartDefault = () => {
    const data = [186, 305, 237, 73, 209, 214];
    const chartHeight = 200;
    const spacing = (CHART_WIDTH - 20) / (data.length - 1);

    const points = data.map((d, i) => ({
        x: 10 + i * spacing,
        y: chartHeight - 20 - (d / 350) * (chartHeight - 40)
    }));

    const path = getLinkPath(points);

    return (
        <View>
            <View style={applyTw('mb-4')}>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Linear interpolation
                </Text>
            </View>
            <Svg width={CHART_WIDTH} height={chartHeight}>
                <Path d={path} stroke={chartColors.primary} strokeWidth="2" fill="none" />
            </Svg>
            <View style={applyTw('mt-4 flex-row items-center gap-2')}>
                <Text style={applyTw('text-white text-sm font-medium')}>
                    Trending up by 5.2% this month
                </Text>
            </View>
        </View>
    );
};

// ==================== TYPE 3: LINEAR ====================
const LineChartLinear = () => {
    const data = [186, 305, 237, 73, 209, 214];
    const chartHeight = 200;
    const spacing = (CHART_WIDTH - 20) / (data.length - 1);

    const points = data.map((d, i) => ({
        x: 10 + i * spacing,
        y: chartHeight - 20 - (d / 350) * (chartHeight - 40)
    }));

    const path = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');

    return (
        <View>
            <View style={applyTw('mb-4')}>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Straight line connection
                </Text>
            </View>
            <Svg width={CHART_WIDTH} height={chartHeight}>
                <Path d={path} stroke={chartColors.primary} strokeWidth="2" fill="none" />
            </Svg>
        </View>
    );
};

// ==================== TYPE 4: STEP ====================
const LineChartStep = () => {
    const data = [186, 305, 237, 73, 209, 214];
    const chartHeight = 200;
    const spacing = (CHART_WIDTH - 20) / (data.length - 1);

    const points = data.map((d, i) => ({
        x: 10 + i * spacing,
        y: chartHeight - 20 - (d / 350) * (chartHeight - 40)
    }));

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
        // Step: Horizontal first, then vertical
        const pCurrent = points[i];
        const pNext = points[i + 1];

        // Mid-point step logic or just simple step after? Image looks like step-after
        path += ` L ${pNext.x} ${pCurrent.y} L ${pNext.x} ${pNext.y}`;
    }

    return (
        <View>
            <View style={applyTw('mb-4')}>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Step interpolation
                </Text>
            </View>
            <Svg width={CHART_WIDTH} height={chartHeight}>
                <Path d={path} stroke={chartColors.primary} strokeWidth="2" fill="none" />
            </Svg>
        </View>
    );
};

// ==================== TYPE 5: MULTIPLE ====================
const LineChartMultiple = () => {
    const data1 = [186, 305, 237, 73, 209, 214];
    const data2 = [80, 200, 120, 190, 130, 140];
    const chartHeight = 200;
    const spacing = (CHART_WIDTH - 20) / (data1.length - 1);

    const getPoints = (data) => data.map((d, i) => ({
        x: 10 + i * spacing,
        y: chartHeight - 20 - (d / 350) * (chartHeight - 40)
    }));

    const path1 = getLinkPath(getPoints(data1));
    const path2 = getLinkPath(getPoints(data2));

    return (
        <View>
            <View style={applyTw('mb-4')}>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Multiple data comparisons
                </Text>
            </View>
            <Svg width={CHART_WIDTH} height={chartHeight}>
                <Path d={path1} stroke={chartColors.primary} strokeWidth="2" fill="none" />
                <Path d={path2} stroke={chartColors.secondary} strokeWidth="2" fill="none" />
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

// ==================== TYPE 6: DOTS ====================
const LineChartDots = () => {
    const data = [186, 305, 237, 73, 209, 214];
    const chartHeight = 200;
    const spacing = (CHART_WIDTH - 20) / (data.length - 1);

    const points = data.map((d, i) => ({
        x: 10 + i * spacing,
        y: chartHeight - 20 - (d / 350) * (chartHeight - 40)
    }));

    const path = getLinkPath(points);

    return (
        <View>
            <View style={applyTw('mb-4')}>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Visible data points
                </Text>
            </View>
            <Svg width={CHART_WIDTH} height={chartHeight}>
                <Path d={path} stroke={chartColors.primary} strokeWidth="2" fill="none" />
                {points.map((p, i) => (
                    <Circle key={i} cx={p.x} cy={p.y} r="4" fill={chartColors.primary} />
                ))}
            </Svg>
        </View>
    );
};

// ==================== TYPE 7: CUSTOM DOTS ====================
const LineChartCustomDots = () => {
    const data = [186, 305, 237, 73, 209, 214];
    const chartHeight = 200;
    const spacing = (CHART_WIDTH - 20) / (data.length - 1);

    const points = data.map((d, i) => ({
        x: 10 + i * spacing,
        y: chartHeight - 20 - (d / 350) * (chartHeight - 40)
    }));

    const path = getLinkPath(points);

    return (
        <View>
            <View style={applyTw('mb-4')}>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Styled Hollow Dots
                </Text>
            </View>
            <Svg width={CHART_WIDTH} height={chartHeight}>
                <Path d={path} stroke={chartColors.primary} strokeWidth="2" fill="none" />
                {points.map((p, i) => (
                    <Circle key={i} cx={p.x} cy={p.y} r="5" fill="#000" stroke={chartColors.primary} strokeWidth="2" />
                ))}
                {points.map((p, i) => (
                    <Line key={`l-${i}`} x1={p.x} y1={p.y - 10} x2={p.x} y2={p.y - 16} stroke={chartColors.primary} strokeWidth="1" />
                ))}
            </Svg>
        </View>
    );
};

// ==================== TYPE 8: LABEL ====================
const LineChartLabel = () => {
    const data = [186, 305, 237, 73, 209, 214];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const chartHeight = 200;
    const spacing = (CHART_WIDTH - 40) / (data.length - 1);

    const points = data.map((d, i) => ({
        x: 20 + i * spacing,
        y: chartHeight - 30 - (d / 350) * (chartHeight - 50)
    }));

    const path = getLinkPath(points);

    return (
        <View>
            <View style={applyTw('mb-4')}>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Value labels
                </Text>
            </View>
            <Svg width={CHART_WIDTH} height={chartHeight}>
                <Path d={path} stroke={chartColors.primary} strokeWidth="2" fill="none" />
                {points.map((p, i) => (
                    <React.Fragment key={i}>
                        <Circle cx={p.x} cy={p.y} r="4" fill={chartColors.primary} />
                        <SvgText x={p.x} y={p.y - 12} fill="white" fontSize="10" textAnchor="middle">{data[i]}</SvgText>
                        <SvgText x={p.x} y={chartHeight - 10} fill="#6b7280" fontSize="10" textAnchor="middle">{labels[i]}</SvgText>
                    </React.Fragment>
                ))}
            </Svg>
        </View>
    );
};

// ==================== TYPE 9: CUSTOM LABEL ====================
const LineChartCustomLabel = () => {
    const data = [275, 200, 187, 173, 90];
    const labels = ['Chrome', 'Safari', 'Firefox', 'Edge', 'Other'];
    const chartHeight = 200;
    const spacing = (CHART_WIDTH - 40) / (data.length - 1);

    const points = data.map((d, i) => ({
        x: 20 + i * spacing,
        y: chartHeight - 30 - (d / 350) * (chartHeight - 50)
    }));

    const path = getLinkPath(points);

    return (
        <View>
            <View style={applyTw('mb-4')}>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Category labels
                </Text>
            </View>
            <Svg width={CHART_WIDTH} height={chartHeight}>
                <Path d={path} stroke={chartColors.secondary} strokeWidth="2" fill="none" />
                {points.map((p, i) => (
                    <React.Fragment key={i}>
                        <Circle cx={p.x} cy={p.y} r="4" fill={chartColors.secondary} />
                        <SvgText x={p.x} y={p.y - 12} fill="white" fontSize="10" textAnchor="middle">{labels[i]}</SvgText>
                    </React.Fragment>
                ))}
            </Svg>
        </View>
    );
};

// ==================== MAIN EXPORT ====================
export const ChartLineInteractive = () => {
    const [chartType, setChartType] = useState(1);

    const chartTypes = [
        { id: 1, label: 'Interactive', component: LineChartInteractive },
        { id: 2, label: 'Default', component: LineChartDefault },
        { id: 3, label: 'Linear', component: LineChartLinear },
        { id: 4, label: 'Step', component: LineChartStep },
        { id: 5, label: 'Multiple', component: LineChartMultiple },
        { id: 6, label: 'Dots', component: LineChartDots },
        { id: 7, label: 'Custom Dots', component: LineChartCustomDots },
        { id: 8, label: 'Label', component: LineChartLabel },
        { id: 9, label: 'Custom Label', component: LineChartCustomLabel },
    ];

    const CurrentChart = chartTypes.find(t => t.id === chartType)?.component || LineChartInteractive;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Line Chart - Showcase</CardTitle>
                <CardDescription>
                    Explore different line chart visualizations
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

export default ChartLineInteractive;
