import React, { useState } from 'react';
import { View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { applyTw } from '../../../style/style';
import { Text } from '../text';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card';
import Svg, { Line, Path, Defs, LinearGradient, Stop, Text as SvgText, Circle } from 'react-native-svg';
import { renderFlaticon } from '../../../functions/iconUtils';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 100;

const chartColors = {
    chart1: '#8b5cf6', // purple
    chart2: '#3b82f6', // blue
    chart3: '#10b981', // green
    chart4: '#f59e0b', // amber
    chart5: '#ec4899', // pink
};

// ==================== TYPE 1: INTERACTIVE (Original) ====================
const AreaChartInteractive = () => {
    const [timeRange, setTimeRange] = useState('90d');

    // ... data reuse ...
    const allData = {
        '7d': [
            { date: '06-24', desktop: 132, mobile: 180 },
            { date: '06-25', desktop: 141, mobile: 190 },
            { date: '06-26', desktop: 434, mobile: 380 },
            { date: '06-27', desktop: 448, mobile: 490 },
            { date: '06-28', desktop: 149, mobile: 200 },
            { date: '06-29', desktop: 103, mobile: 160 },
            { date: '06-30', desktop: 446, mobile: 400 },
        ],
        '30d': [
            { date: '06-01', desktop: 178, mobile: 200 },
            { date: '06-05', desktop: 88, mobile: 140 },
            { date: '06-10', desktop: 155, mobile: 200 },
            { date: '06-15', desktop: 307, mobile: 350 },
            { date: '06-20', desktop: 408, mobile: 450 },
            { date: '06-25', desktop: 141, mobile: 190 },
            { date: '06-30', desktop: 446, mobile: 400 },
        ],
        '90d': [
            { date: '04-01', desktop: 222, mobile: 150 },
            { date: '04-15', desktop: 120, mobile: 170 },
            { date: '05-01', desktop: 165, mobile: 220 },
            { date: '05-15', desktop: 473, mobile: 380 },
            { date: '06-01', desktop: 178, mobile: 200 },
            { date: '06-15', desktop: 307, mobile: 350 },
            { date: '06-30', desktop: 446, mobile: 400 },
        ],
    };

    const chartData = allData[timeRange];
    const maxValue = Math.max(...chartData.flatMap(d => [d.desktop, d.mobile]));
    const chartHeight = 250;
    const pointSpacing = (CHART_WIDTH - 60) / (chartData.length - 1);

    const desktopPath = chartData.map((item, index) => {
        const x = 30 + index * pointSpacing;
        const y = chartHeight - 30 - (item.desktop / maxValue) * (chartHeight - 60);
        return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(' ') + ` L ${30 + (chartData.length - 1) * pointSpacing} ${chartHeight - 30} L 30 ${chartHeight - 30} Z`;

    const mobilePath = chartData.map((item, index) => {
        const x = 30 + index * pointSpacing;
        const y = chartHeight - 30 - (item.mobile / maxValue) * (chartHeight - 60);
        return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(' ') + ` L ${30 + (chartData.length - 1) * pointSpacing} ${chartHeight - 30} L 30 ${chartHeight - 30} Z`;

    return (
        <View>
            <View style={applyTw('flex-row items-center justify-between mb-4')}>
                <View style={applyTw('flex-1 pr-4')}>
                    <Text style={applyTw('text-gray-400 text-sm')}>
                        Showing total visitors for the selected period
                    </Text>
                </View>
                <View style={applyTw('flex-row gap-2')}>
                    {Object.keys(allData).map(range => (
                        <TouchableOpacity
                            key={range}
                            onPress={() => setTimeRange(range)}
                            style={applyTw(`px-3 py-1.5 rounded-md ${timeRange === range ? 'bg-white' : 'bg-[#111111] border border-[#2A2A2A]'}`)}
                        >
                            <Text style={applyTw(`text-xs ${timeRange === range ? 'text-black font-medium' : 'text-gray-400'}`)}>
                                {range}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <Svg width={CHART_WIDTH} height={chartHeight}>
                <Defs>
                    <LinearGradient id="gradientDesktop" x1="0" y1="0" x2="0" y2="1">
                        <Stop offset="0" stopColor={chartColors.chart1} stopOpacity="0.5" />
                        <Stop offset="1" stopColor={chartColors.chart1} stopOpacity="0.0" />
                    </LinearGradient>
                    <LinearGradient id="gradientMobile" x1="0" y1="0" x2="0" y2="1">
                        <Stop offset="0" stopColor={chartColors.chart2} stopOpacity="0.5" />
                        <Stop offset="1" stopColor={chartColors.chart2} stopOpacity="0.0" />
                    </LinearGradient>
                </Defs>

                {/* Grid */}
                {[0, 1, 2, 3, 4].map(i => (
                    <Line
                        key={i}
                        x1="30"
                        y1={30 + (i * (chartHeight - 60) / 4)}
                        x2={CHART_WIDTH - 30}
                        y2={30 + (i * (chartHeight - 60) / 4)}
                        stroke="#262626"
                        strokeWidth="1"
                    />
                ))}

                {/* Mobile */}
                <Path d={mobilePath} fill="url(#gradientMobile)" />
                <Path
                    d={chartData.map((item, index) => {
                        const x = 30 + index * pointSpacing;
                        const y = chartHeight - 30 - (item.mobile / maxValue) * (chartHeight - 60);
                        return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
                    }).join(' ')}
                    stroke={chartColors.chart2}
                    strokeWidth="2"
                    fill="none"
                />

                {/* Desktop */}
                <Path d={desktopPath} fill="url(#gradientDesktop)" />
                <Path
                    d={chartData.map((item, index) => {
                        const x = 30 + index * pointSpacing;
                        const y = chartHeight - 30 - (item.desktop / maxValue) * (chartHeight - 60);
                        return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
                    }).join(' ')}
                    stroke={chartColors.chart1}
                    strokeWidth="2"
                    fill="none"
                />
            </Svg>

            <View style={applyTw('flex-row justify-center gap-6 mt-4')}>
                <View style={applyTw('flex-row items-center gap-2')}>
                    <View style={[applyTw('w-3 h-3 rounded'), { backgroundColor: chartColors.chart1 }]} />
                    <Text style={applyTw('text-gray-400 text-sm')}>Desktop</Text>
                </View>
                <View style={applyTw('flex-row items-center gap-2')}>
                    <View style={[applyTw('w-3 h-3 rounded'), { backgroundColor: chartColors.chart2 }]} />
                    <Text style={applyTw('text-gray-400 text-sm')}>Mobile</Text>
                </View>
            </View>
        </View>
    );
};

// ==================== TYPE 2: SIMPLE/DEFAULT ====================
const AreaChartDefault = () => {
    const data = [
        { month: 'Jan', value: 186 },
        { month: 'Feb', value: 305 },
        { month: 'Mar', value: 237 },
        { month: 'Apr', value: 73 },
        { month: 'May', value: 209 },
        { month: 'Jun', value: 214 },
    ];

    const chartHeight = 200;
    const maxValue = Math.max(...data.map(d => d.value));
    const pointSpacing = (CHART_WIDTH - 60) / (data.length - 1);

    const path = data.map((item, index) => {
        const x = 30 + index * pointSpacing;
        const y = chartHeight - 30 - (item.value / maxValue) * (chartHeight - 60);
        return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(' ') + ` L ${30 + (data.length - 1) * pointSpacing} ${chartHeight - 30} L 30 ${chartHeight - 30} Z`;

    const TrendIcon = () => renderFlaticon('fi fi-rr-arrow-trend-up', { size: 16, color: '#10b981' });

    return (
        <View>
            <View style={applyTw('mb-4')}>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Showing total visitors for the last 6 months
                </Text>
            </View>
            <Svg width={CHART_WIDTH} height={chartHeight}>
                <Defs>
                    <LinearGradient id="gradientDefault" x1="0" y1="0" x2="0" y2="1">
                        <Stop offset="0" stopColor={chartColors.chart1} stopOpacity="0.4" />
                        <Stop offset="1" stopColor={chartColors.chart1} stopOpacity="0.0" />
                    </LinearGradient>
                </Defs>

                {/* Horizontal Grid Lines - Minimal */}
                <Line x1="30" y1={chartHeight - 30} x2={CHART_WIDTH - 30} y2={chartHeight - 30} stroke="#262626" strokeWidth="1" />

                <Path d={path} fill="url(#gradientDefault)" stroke={chartColors.chart1} strokeWidth="2" />

                {/* X Axis Labels */}
                {data.map((item, index) => (
                    <SvgText
                        key={index}
                        x={30 + index * pointSpacing}
                        y={chartHeight - 10}
                        fontSize="10"
                        fill="#6b7280"
                        textAnchor="middle"
                    >
                        {item.month}
                    </SvgText>
                ))}
            </Svg>

            <View style={applyTw('mt-4 gap-2')}>
                <View style={applyTw('flex-row items-center gap-2')}>
                    <Text style={applyTw('text-white text-sm font-medium')}>
                        Trending up by 5.2% this month
                    </Text>
                    <TrendIcon />
                </View>
                <Text style={applyTw('text-gray-400 text-xs')}>
                    January - June 2024
                </Text>
            </View>
        </View>
    );
};

// ==================== TYPE 3: STEP AREA ====================
const AreaChartStep = () => {
    const data = [
        { month: 'Jan', value: 186 },
        { month: 'Feb', value: 305 },
        { month: 'Mar', value: 237 },
        { month: 'Apr', value: 73 },
        { month: 'May', value: 209 },
        { month: 'Jun', value: 214 },
    ];

    const chartHeight = 200;
    const maxValue = Math.max(...data.map(d => d.value));
    const pointSpacing = (CHART_WIDTH - 60) / (data.length - 1);

    // Step Logic: L x_next y_curr L x_next y_next
    let pathD = `M 30 ${chartHeight - 30 - (data[0].value / maxValue) * (chartHeight - 60)}`;
    for (let i = 0; i < data.length - 1; i++) {
        const x_curr = 30 + i * pointSpacing;
        const x_next = 30 + (i + 1) * pointSpacing;
        const y_curr = chartHeight - 30 - (data[i].value / maxValue) * (chartHeight - 60);
        const y_next = chartHeight - 30 - (data[i + 1].value / maxValue) * (chartHeight - 60);

        pathD += ` L ${x_next} ${y_curr} L ${x_next} ${y_next}`;
    }

    // Close path for fill
    const fillPathD = pathD + ` L ${30 + (data.length - 1) * pointSpacing} ${chartHeight - 30} L 30 ${chartHeight - 30} Z`;

    const ActivityIcon = () => renderFlaticon('fi fi-rr-pulse', { size: 16, color: '#f59e0b' });

    return (
        <View>
            <View style={applyTw('mb-4')}>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Performance metrics visualization
                </Text>
            </View>
            <Svg width={CHART_WIDTH} height={chartHeight}>
                <Defs>
                    <LinearGradient id="gradientStep" x1="0" y1="0" x2="0" y2="1">
                        <Stop offset="0" stopColor={chartColors.chart1} stopOpacity="0.4" />
                        <Stop offset="1" stopColor={chartColors.chart1} stopOpacity="0.0" />
                    </LinearGradient>
                </Defs>

                <Line x1="30" y1="30" x2={CHART_WIDTH - 30} y2="30" stroke="#262626" strokeWidth="1" strokeDasharray="4 4" />
                <Line x1="30" y1={chartHeight - 30} x2={CHART_WIDTH - 30} y2={chartHeight - 30} stroke="#262626" strokeWidth="1" />

                <Path d={fillPathD} fill="url(#gradientStep)" />
                <Path d={pathD} stroke={chartColors.chart1} strokeWidth="2" fill="none" />

                {/* X Axis Labels */}
                {data.map((item, index) => (
                    <SvgText
                        key={index}
                        x={30 + index * pointSpacing}
                        y={chartHeight - 10}
                        fontSize="10"
                        fill="#6b7280"
                        textAnchor="middle"
                    >
                        {item.month}
                    </SvgText>
                ))}
            </Svg>
            <View style={applyTw('mt-4 gap-2')}>
                <View style={applyTw('flex-row items-center gap-2')}>
                    <Text style={applyTw('text-white text-sm font-medium')}>
                        Consistent performance
                    </Text>
                    <ActivityIcon />
                </View>
                <Text style={applyTw('text-gray-400 text-xs')}>
                    Jan - Jun 2024
                </Text>
            </View>
        </View>
    );
};

// ==================== TYPE 4: STACKED AREA ====================
const AreaChartStacked = () => {
    const data = [
        { month: 'Jan', desktop: 186, mobile: 80 },
        { month: 'Feb', desktop: 305, mobile: 200 },
        { month: 'Mar', desktop: 237, mobile: 120 },
        { month: 'Apr', desktop: 73, mobile: 190 },
        { month: 'May', desktop: 209, mobile: 130 },
        { month: 'Jun', desktop: 214, mobile: 140 },
    ];

    const chartHeight = 200;
    // Calculate max total for scaling
    const maxValue = Math.max(...data.map(d => d.desktop + d.mobile));
    const pointSpacing = (CHART_WIDTH - 60) / (data.length - 1);

    // Desktop path (bottom layer)
    const desktopPath = data.map((item, index) => {
        const x = 30 + index * pointSpacing;
        const y = chartHeight - 30 - (item.desktop / maxValue) * (chartHeight - 60);
        return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(' ') + ` L ${30 + (data.length - 1) * pointSpacing} ${chartHeight - 30} L 30 ${chartHeight - 30} Z`;

    // Mobile path (stacked on top of desktop)
    // We need to construct a path that goes along the top of (desktop+mobile) and then BACK along the top of desktop to close the shape properly

    // Top line of Mobile (+Desktop)
    let mobilePathD = "";
    data.forEach((item, index) => {
        const x = 30 + index * pointSpacing;
        const totalHeight = item.desktop + item.mobile;
        const y = chartHeight - 30 - (totalHeight / maxValue) * (chartHeight - 60);
        mobilePathD += index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    });

    // Trace back along the top of Desktop
    for (let i = data.length - 1; i >= 0; i--) {
        const item = data[i];
        const x = 30 + i * pointSpacing;
        const y = chartHeight - 30 - (item.desktop / maxValue) * (chartHeight - 60);
        mobilePathD += ` L ${x} ${y}`;
    }

    mobilePathD += " Z";

    return (
        <View>
            <View style={applyTw('mb-4')}>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Stacked device usage
                </Text>
            </View>
            <Svg width={CHART_WIDTH} height={chartHeight}>
                <Defs>
                    <LinearGradient id="gradStack1" x1="0" y1="0" x2="0" y2="1">
                        <Stop offset="0" stopColor={chartColors.chart1} stopOpacity="0.8" />
                        <Stop offset="1" stopColor={chartColors.chart1} stopOpacity="0.2" />
                    </LinearGradient>
                    <LinearGradient id="gradStack2" x1="0" y1="0" x2="0" y2="1">
                        <Stop offset="0" stopColor={chartColors.chart2} stopOpacity="0.8" />
                        <Stop offset="1" stopColor={chartColors.chart2} stopOpacity="0.2" />
                    </LinearGradient>
                </Defs>

                {/* Grid */}
                <Line x1="30" y1={chartHeight - 30} x2={CHART_WIDTH - 30} y2={chartHeight - 30} stroke="#262626" strokeWidth="1" />

                {/* Desktop Area (Bottom) */}
                <Path d={desktopPath} fill="url(#gradStack1)" stroke={chartColors.chart1} strokeWidth="1" />

                {/* Mobile Area (Top Stack) */}
                <Path d={mobilePathD} fill="url(#gradStack2)" stroke={chartColors.chart2} strokeWidth="1" />

                {/* X Axis Labels */}
                {data.map((item, index) => (
                    <SvgText key={index} x={30 + index * pointSpacing} y={chartHeight - 10} fontSize="10" fill="#6b7280" textAnchor="middle">
                        {item.month}
                    </SvgText>
                ))}
            </Svg>

            {/* Legend */}
            <View style={applyTw('flex-row justify-center gap-6 mt-4')}>
                <View style={applyTw('flex-row items-center gap-2')}>
                    <View style={[applyTw('w-3 h-3 rounded'), { backgroundColor: chartColors.chart1 }]} />
                    <Text style={applyTw('text-gray-400 text-sm')}>Desktop</Text>
                </View>
                <View style={applyTw('flex-row items-center gap-2')}>
                    <View style={[applyTw('w-3 h-3 rounded'), { backgroundColor: chartColors.chart2 }]} />
                    <Text style={applyTw('text-gray-400 text-sm')}>Mobile (Stacked)</Text>
                </View>
            </View>
        </View>
    );
};

// ==================== TYPE 5: AXES & GRADIENT ====================
const AreaChartAxes = () => {
    const data = [
        { month: 'Jan', value: 186 },
        { month: 'Feb', value: 305 },
        { month: 'Mar', value: 237 },
        { month: 'Apr', value: 73 },
        { month: 'May', value: 209 },
        { month: 'Jun', value: 214 },
    ];

    const chartHeight = 220;
    const maxValue = 400; // Fixed max for axes demo
    const pointSpacing = (CHART_WIDTH - 80) / (data.length - 1); // More space for Y axis

    const path = data.map((item, index) => {
        const x = 50 + index * pointSpacing; // Shifted for Y axis
        const y = chartHeight - 30 - (item.value / maxValue) * (chartHeight - 60);
        return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(' ') + ` L ${50 + (data.length - 1) * pointSpacing} ${chartHeight - 30} L 50 ${chartHeight - 30} Z`;

    const TrendDownIcon = () => renderFlaticon('fi fi-rr-arrow-trend-down', { size: 16, color: '#ef4444' });

    return (
        <View>
            <View style={applyTw('mb-4')}>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    Chart with detailed axes
                </Text>
            </View>
            <Svg width={CHART_WIDTH} height={chartHeight}>
                <Defs>
                    <LinearGradient id="gradientAxes" x1="0" y1="0" x2="1" y2="0">
                        <Stop offset="0" stopColor={chartColors.chart4} stopOpacity="0.6" />
                        <Stop offset="1" stopColor={chartColors.chart5} stopOpacity="0.6" />
                    </LinearGradient>
                </Defs>

                {/* Y Axis Grid Lines */}
                {[0, 100, 200, 300, 400].map((val, i) => {
                    const y = chartHeight - 30 - (val / maxValue) * (chartHeight - 60);
                    return (
                        <React.Fragment key={i}>
                            <Line x1="45" y1={y} x2={CHART_WIDTH} y2={y} stroke="#262626" strokeWidth="1" />
                            <SvgText x="40" y={y + 4} fontSize="10" fill="#6b7280" textAnchor="end">{val}</SvgText>
                        </React.Fragment>
                    );
                })}

                {/* X Axis Line */}
                <Line x1="50" y1={chartHeight - 30} x2={CHART_WIDTH} y2={chartHeight - 30} stroke="#6b7280" strokeWidth="1" />

                <Path d={path} fill="url(#gradientAxes)" stroke={chartColors.chart4} strokeWidth="2" />

                {/* X Axis Labels */}
                {data.map((item, index) => (
                    <SvgText
                        key={index}
                        x={50 + index * pointSpacing}
                        y={chartHeight - 10}
                        fontSize="10"
                        fill="#6b7280"
                        textAnchor="middle"
                    >
                        {item.month}
                    </SvgText>
                ))}
            </Svg>
            <View style={applyTw('mt-4 gap-2')}>
                <View style={applyTw('flex-row items-center gap-2')}>
                    <Text style={applyTw('text-white text-sm font-medium')}>
                        Slight dip in performance
                    </Text>
                    <TrendDownIcon />
                </View>
                <Text style={applyTw('text-gray-400 text-xs')}>
                    January - June 2024
                </Text>
            </View>
        </View>
    );
};


// ==================== MAIN EXPORT ====================
export const ChartAreaInteractive = () => {
    const [chartType, setChartType] = useState(1);

    const chartTypes = [
        { id: 1, label: 'Interactive', component: AreaChartInteractive },
        { id: 2, label: 'Default', component: AreaChartDefault },
        { id: 3, label: 'Step', component: AreaChartStep },
        { id: 4, label: 'Stacked', component: AreaChartStacked },
        { id: 5, label: 'Axes', component: AreaChartAxes },
    ];

    const CurrentChart = chartTypes.find(t => t.id === chartType)?.component || AreaChartInteractive;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Area Chart - Showcase</CardTitle>
                <CardDescription>
                    Explore different area chart visualizations
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

export default ChartAreaInteractive;
