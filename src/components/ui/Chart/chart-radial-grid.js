import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { applyTw } from '../../../style/style';
import { Text } from '../text';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card';
import Svg, { Circle, Path, G, Text as SvgText } from 'react-native-svg';
import { renderFlaticon } from '../../../functions/iconUtils';

const chartColors = {
    primary: '#3b82f6',
    secondary: '#1e293b',
    chart1: '#8b5cf6',
    chart2: '#3b82f6',
    chart3: '#10b981',
};

// Type 1: Basic Radial Chart (Multi-ring)
const RadialChartBasic = () => {
    const data = [
        { month: 'January', value: 186, max: 300 },
        { month: 'February', value: 305, max: 400 },
        { month: 'March', value: 237, max: 300 },
        { month: 'April', value: 173, max: 300 },
    ];

    const size = 220;
    const centerX = size / 2;
    const centerY = size / 2;
    const strokeWidth = 12;
    const gap = 6;

    return (
        <View style={applyTw('items-center py-4')}>
            <Svg width={size} height={size}>
                {data.map((item, index) => {
                    const radius = 40 + (index * (strokeWidth + gap));
                    const circumference = 2 * Math.PI * radius;
                    const progress = (item.value / item.max) * 100;
                    const strokeDashoffset = circumference - (circumference * progress) / 100;

                    return (
                        <G key={index}>
                            {/* Background ring */}
                            <Circle
                                cx={centerX}
                                cy={centerY}
                                r={radius}
                                fill="none"
                                stroke={chartColors.secondary}
                                strokeWidth={strokeWidth}
                            />
                            {/* Progress ring */}
                            <Circle
                                cx={centerX}
                                cy={centerY}
                                r={radius}
                                fill="none"
                                stroke={chartColors.primary}
                                strokeWidth={strokeWidth}
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                rotation="-90"
                                origin={`${centerX}, ${centerY}`}
                            />
                        </G>
                    );
                })}
            </Svg>
        </View>
    );
};

// Type 2: Radial Chart with Labels
const RadialChartLabel = () => {
    const data = [
        { label: 'Chrome', value: 275, max: 400, color: chartColors.chart1 },
        { label: 'Safari', value: 200, max: 400, color: chartColors.chart2 },
        { label: 'Firefox', value: 187, max: 400, color: chartColors.chart3 },
        { label: 'Other', value: 90, max: 400, color: '#f59e0b' },
    ];

    const size = 220;
    const centerX = size / 2;
    const centerY = size / 2;
    const strokeWidth = 12;
    const gap = 6;

    return (
        <View style={applyTw('items-center py-4')}>
            <Svg width={size} height={size}>
                {data.map((item, index) => {
                    const radius = 40 + (index * (strokeWidth + gap));
                    const circumference = 2 * Math.PI * radius;
                    const progress = (item.value / item.max) * 100;
                    const strokeDashoffset = circumference - (circumference * progress) / 100;

                    return (
                        <G key={index}>
                            <Circle
                                cx={centerX}
                                cy={centerY}
                                r={radius}
                                fill="none"
                                stroke={chartColors.secondary}
                                strokeWidth={strokeWidth}
                            />
                            <Circle
                                cx={centerX}
                                cy={centerY}
                                r={radius}
                                fill="none"
                                stroke={item.color}
                                strokeWidth={strokeWidth}
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                rotation="-90"
                                origin={`${centerX}, ${centerY}`}
                            />
                        </G>
                    );
                })}
            </Svg>

            {/* Labels */}
            <View style={applyTw('mt-4 gap-2')}>
                {data.map((item, index) => (
                    <View key={index} style={applyTw('flex-row items-center gap-2')}>
                        <View style={[applyTw('w-3 h-3 rounded-full'), { backgroundColor: item.color }]} />
                        <Text style={applyTw('text-white text-sm')}>{item.label}</Text>
                        <Text style={applyTw('text-gray-400 text-sm ml-auto')}>{item.value}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

// Type 3: Radial Chart with Grid (existing one - improved)
const RadialChartGrid = () => {
    const data = [
        { value: 275, max: 400 },
        { value: 200, max: 400 },
        { value: 187, max: 400 },
        { value: 173, max: 400 },
    ];

    const size = 220;
    const centerX = size / 2;
    const centerY = size / 2;
    const strokeWidth = 12;
    const gap = 6;

    return (
        <View style={applyTw('items-center py-4')}>
            <Svg width={size} height={size}>
                {/* Grid circles */}
                {[0.25, 0.5, 0.75, 1.0].map((scale, i) => (
                    <Circle
                        key={`grid-${i}`}
                        cx={centerX}
                        cy={centerY}
                        r={30 + (80 * scale)}
                        fill="none"
                        stroke="#1e293b"
                        strokeWidth="1"
                    />
                ))}

                {data.map((item, index) => {
                    const radius = 40 + (index * (strokeWidth + gap));
                    const circumference = 2 * Math.PI * radius;
                    const progress = (item.value / item.max) * 100;
                    const strokeDashoffset = circumference - (circumference * progress) / 100;

                    return (
                        <G key={index}>
                            <Circle
                                cx={centerX}
                                cy={centerY}
                                r={radius}
                                fill="none"
                                stroke={chartColors.secondary}
                                strokeWidth={strokeWidth}
                            />
                            <Circle
                                cx={centerX}
                                cy={centerY}
                                r={radius}
                                fill="none"
                                stroke={chartColors.primary}
                                strokeWidth={strokeWidth}
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                rotation="-90"
                                origin={`${centerX}, ${centerY}`}
                            />
                        </G>
                    );
                })}
            </Svg>
        </View>
    );
};

// Type 4: Radial Chart with Text (Single ring with centered value)
const RadialChartText = () => {
    const value = 200;
    const max = 300;
    const size = 200;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = 75;
    const strokeWidth = 16;

    const circumference = 2 * Math.PI * radius;
    const progress = (value / max) * 100;
    const strokeDashoffset = circumference - (circumference * progress) / 100;

    return (
        <View style={applyTw('items-center py-4')}>
            <Svg width={size} height={size}>
                {/* Background ring */}
                <Circle
                    cx={centerX}
                    cy={centerY}
                    r={radius}
                    fill="none"
                    stroke={chartColors.secondary}
                    strokeWidth={strokeWidth}
                />
                {/* Progress ring */}
                <Circle
                    cx={centerX}
                    cy={centerY}
                    r={radius}
                    fill="none"
                    stroke={chartColors.primary}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    rotation="-90"
                    origin={`${centerX}, ${centerY}`}
                />
                {/* Center text */}
                <SvgText
                    x={centerX}
                    y={centerY - 5}
                    textAnchor="middle"
                    fontSize="42"
                    fontWeight="bold"
                    fill="#ffffff"
                >
                    {value}
                </SvgText>
                <SvgText
                    x={centerX}
                    y={centerY + 20}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#94a3b8"
                >
                    Visitors
                </SvgText>
            </Svg>
        </View>
    );
};

// Type 5: Radial Chart - Shape (Single ring with large centered value)
const RadialChartShape = () => {
    const value = 1260;
    const max = 2000;
    const size = 220;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = 85;
    const strokeWidth = 20;

    const circumference = 2 * Math.PI * radius;
    const progress = (value / max) * 100;
    const strokeDashoffset = circumference - (circumference * progress) / 100;

    return (
        <View style={applyTw('items-center py-4')}>
            <Svg width={size} height={size}>
                <Circle
                    cx={centerX}
                    cy={centerY}
                    r={radius}
                    fill="none"
                    stroke={chartColors.secondary}
                    strokeWidth={strokeWidth}
                />
                <Circle
                    cx={centerX}
                    cy={centerY}
                    r={radius}
                    fill="none"
                    stroke={chartColors.primary}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    rotation="-90"
                    origin={`${centerX}, ${centerY}`}
                />
                <SvgText
                    x={centerX}
                    y={centerY}
                    textAnchor="middle"
                    fontSize="48"
                    fontWeight="bold"
                    fill="#ffffff"
                    dy="15"
                >
                    {value.toLocaleString()}
                </SvgText>
                <SvgText
                    x={centerX}
                    y={centerY + 25}
                    textAnchor="middle"
                    fontSize="14"
                    fill="#94a3b8"
                    dy="15"
                >
                    Visitors
                </SvgText>
            </Svg>
        </View>
    );
};

// Type 6: Radial Chart - Stacked (Semi-circle gauge)
const RadialChartStacked = () => {
    const value = 1830;
    const max = 2500;
    const size = 240;
    const centerX = size / 2;
    const centerY = size / 2 + 20;
    const radius = 90;
    const strokeWidth = 24;

    const circumference = Math.PI * radius;
    const progress = (value / max) * 100;
    const strokeDashoffset = circumference - (circumference * progress) / 100;

    return (
        <View style={applyTw('items-center py-4')}>
            <Svg width={size} height={size / 1.5}>
                {/* Background arc */}
                <Path
                    d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
                    fill="none"
                    stroke={chartColors.secondary}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />
                {/* Progress arc */}
                <Path
                    d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
                    fill="none"
                    stroke={chartColors.primary}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
                <SvgText
                    x={centerX}
                    y={centerY - 10}
                    textAnchor="middle"
                    fontSize="44"
                    fontWeight="bold"
                    fill="#ffffff"
                >
                    {value.toLocaleString()}
                </SvgText>
                <SvgText
                    x={centerX}
                    y={centerY + 15}
                    textAnchor="middle"
                    fontSize="13"
                    fill="#94a3b8"
                >
                    Visitors
                </SvgText>
            </Svg>
        </View>
    );
};

// Main Component with Type Selector
export const ChartRadialGrid = () => {
    const [chartType, setChartType] = useState(1);

    const chartTypes = [
        { id: 1, label: 'Basic', component: RadialChartBasic },
        { id: 2, label: 'Label', component: RadialChartLabel },
        { id: 3, label: 'Grid', component: RadialChartGrid },
        { id: 4, label: 'Text', component: RadialChartText },
        { id: 5, label: 'Shape', component: RadialChartShape },
        { id: 6, label: 'Stacked', component: RadialChartStacked },
    ];

    const CurrentChart = chartTypes.find(t => t.id === chartType)?.component || RadialChartBasic;
    const TrendIcon = () => renderFlaticon('fi fi-rr-arrow-trend-up', { size: 16, color: '#10b981' });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Radial Chart - All Types</CardTitle>
                <CardDescription>January - June 2024</CardDescription>

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
                                Type {type.id}: {type.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </CardHeader>
            <CardContent>
                <CurrentChart />
            </CardContent>
            <CardFooter>
                <View style={applyTw('gap-2')}>
                    <View style={applyTw('flex-row items-center gap-2')}>
                        <Text style={applyTw('text-white text-sm font-medium')}>
                            Trending up by 5.2% this month
                        </Text>
                        <TrendIcon />
                    </View>
                    <Text style={applyTw('text-gray-400 text-sm')}>
                        Showing total visitors for the last 6 months
                    </Text>
                </View>
            </CardFooter>
        </Card>
    );
};

export default ChartRadialGrid;
