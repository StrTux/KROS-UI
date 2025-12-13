import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { applyTw } from '../../../style/style';
import { Text } from '../text';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card';
import Svg, { Path, G, Text as SvgText, Circle } from 'react-native-svg';
import { renderFlaticon } from '../../../functions/iconUtils';

// Colors matching the image
const chartColors = {
    chrome: '#3b82f6', // blue-500
    safari: '#60a5fa', // blue-400
    firefox: '#93c5fd', // blue-300
    edge: '#bfdbfe', // blue-200
    other: '#1e3a8a', // blue-900 (darker) representing "other" or distinct
};

const data = [
    { browser: 'Chrome', visitors: 275, fill: chartColors.chrome },
    { browser: 'Safari', visitors: 200, fill: chartColors.safari },
    { browser: 'Firefox', visitors: 187, fill: chartColors.firefox },
    { browser: 'Edge', visitors: 173, fill: chartColors.edge },
    { browser: 'Other', visitors: 90, fill: chartColors.other },
];

const totalVisitors = data.reduce((sum, item) => sum + item.visitors, 0);

// Helper to calculate arc path
const createArc = (cx, cy, r, startAngle, endAngle) => {
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    // Calculate start and end points
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    return [
        `M ${cx} ${cy}`,
        `L ${x1} ${y1}`,
        `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
        'Z'
    ].join(' ');
};

// Helper for Donut path (with inner hole)
const createDonutArc = (cx, cy, rOuter, rInner, startAngle, endAngle) => {
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = cx + rOuter * Math.cos(startRad);
    const y1 = cy + rOuter * Math.sin(startRad);
    const x2 = cx + rOuter * Math.cos(endRad);
    const y2 = cy + rOuter * Math.sin(endRad);

    const x3 = cx + rInner * Math.cos(endRad);
    const y3 = cy + rInner * Math.sin(endRad);
    const x4 = cx + rInner * Math.cos(startRad);
    const y4 = cy + rInner * Math.sin(startRad);

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    return [
        `M ${x1} ${y1}`,
        `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2} ${y2}`,
        `L ${x3} ${y3}`,
        `A ${rInner} ${rInner} 0 ${largeArc} 0 ${x4} ${y4}`,
        'Z'
    ].join(' ');
};


// ==================== TYPE 1: DEFAULT ====================
const PieChartDefault = () => {
    const size = 200;
    const radius = 90;
    const cx = size / 2;
    const cy = size / 2;

    let currentAngle = -90;

    return (
        <View style={applyTw('items-center')}>
            <Svg width={size} height={size}>
                {data.map((item, index) => {
                    const angle = (item.visitors / totalVisitors) * 360;
                    const path = createArc(cx, cy, radius, currentAngle, currentAngle + angle);
                    currentAngle += angle;
                    return (
                        <Path key={index} d={path} fill={item.fill} stroke="#000" strokeWidth="1" />
                    );
                })}
            </Svg>
        </View>
    );
};

// ==================== TYPE 2: SEPARATOR NONE ====================
const PieChartSeparatorNone = () => {
    const size = 200;
    const radius = 90;
    const cx = size / 2;
    const cy = size / 2;
    let currentAngle = -90;

    return (
        <View style={applyTw('items-center')}>
            <Svg width={size} height={size}>
                {data.map((item, index) => {
                    const angle = (item.visitors / totalVisitors) * 360;
                    const path = createArc(cx, cy, radius, currentAngle, currentAngle + angle);
                    currentAngle += angle;
                    return (
                        <Path key={index} d={path} fill={item.fill} />
                    );
                })}
            </Svg>
        </View>
    );
};

// ==================== TYPE 3: LABEL ====================
const PieChartLabel = () => {
    const size = 220;
    const radius = 80;
    const cx = size / 2;
    const cy = size / 2;
    let currentAngle = -90;

    return (
        <View style={applyTw('items-center')}>
            <Svg width={size} height={size}>
                {data.map((item, index) => {
                    const angle = (item.visitors / totalVisitors) * 360;
                    const middleAngle = currentAngle + angle / 2;
                    const middleRad = (middleAngle * Math.PI) / 180;

                    // Arc
                    const path = createArc(cx, cy, radius, currentAngle, currentAngle + angle);

                    // Label Position (outside)
                    const labelR = radius + 20;
                    const lx = cx + labelR * Math.cos(middleRad);
                    const ly = cy + labelR * Math.sin(middleRad);

                    const slice = (
                        <React.Fragment key={index}>
                            <Path d={path} fill={item.fill} stroke="#000" strokeWidth="1" />
                            <SvgText x={lx} y={ly} fill="white" fontSize="10" textAnchor="middle" alignmentBaseline="middle">
                                {item.visitors}
                            </SvgText>
                        </React.Fragment>
                    );

                    currentAngle += angle;
                    return slice;
                })}
            </Svg>
        </View>
    );
};

// ==================== TYPE 4: CUSTOM LABEL ====================
const PieChartCustomLabel = () => {
    // Similar to Label but maybe with lines or specific styling
    const size = 220;
    const radius = 80;
    const cx = size / 2;
    const cy = size / 2;
    let currentAngle = -90;

    return (
        <View style={applyTw('items-center')}>
            <Svg width={size} height={size}>
                {data.map((item, index) => {
                    const angle = (item.visitors / totalVisitors) * 360;
                    const middleAngle = currentAngle + angle / 2;
                    const middleRad = (middleAngle * Math.PI) / 180;
                    const path = createArc(cx, cy, radius, currentAngle, currentAngle + angle);

                    const labelR = radius + 15;
                    const lx = cx + labelR * Math.cos(middleRad);
                    const ly = cy + labelR * Math.sin(middleRad);

                    const slice = (
                        <React.Fragment key={index}>
                            <Path d={path} fill={item.fill} stroke="#000" strokeWidth="1" />
                            {/* Only show labels for larger slices to avoid overlap */}
                            {angle > 20 && (
                                <SvgText x={lx} y={ly} fill="white" fontSize="10" textAnchor="middle" alignmentBaseline="middle">
                                    {item.visitors}
                                </SvgText>
                            )}
                        </React.Fragment>
                    );
                    currentAngle += angle;
                    return slice;
                })}
            </Svg>
        </View>
    );
};

// ==================== TYPE 5: LABEL LIST (Inside) ====================
const PieChartLabelList = () => {
    const size = 200;
    const radius = 90;
    const cx = size / 2;
    const cy = size / 2;
    let currentAngle = -90;

    return (
        <View style={applyTw('items-center')}>
            <Svg width={size} height={size}>
                {data.map((item, index) => {
                    const angle = (item.visitors / totalVisitors) * 360;
                    const middleAngle = currentAngle + angle / 2;
                    const middleRad = (middleAngle * Math.PI) / 180;
                    const path = createArc(cx, cy, radius, currentAngle, currentAngle + angle);

                    // Position inside
                    const labelR = radius * 0.6;
                    const lx = cx + labelR * Math.cos(middleRad);
                    const ly = cy + labelR * Math.sin(middleRad);

                    const slice = (
                        <React.Fragment key={index}>
                            <Path d={path} fill={item.fill} stroke="#000" strokeWidth="1" />
                            {angle > 15 && (
                                <SvgText x={lx} y={ly} fill={index === 4 ? '#fff' : '#000'} fontSize="9" textAnchor="middle" alignmentBaseline="middle">
                                    {item.browser}
                                </SvgText>
                            )}
                        </React.Fragment>
                    );
                    currentAngle += angle;
                    return slice;
                })}
            </Svg>
        </View>
    );
};

// ==================== TYPE 6: LEGEND ====================
const PieChartLegend = () => {
    const size = 200;
    const radius = 90;
    const cx = size / 2;
    const cy = size / 2;
    let currentAngle = -90;

    return (
        <View style={applyTw('items-center')}>
            <Svg width={size} height={size}>
                {data.map((item, index) => {
                    const angle = (item.visitors / totalVisitors) * 360;
                    const path = createArc(cx, cy, radius, currentAngle, currentAngle + angle);
                    currentAngle += angle;
                    return <Path key={index} d={path} fill={item.fill} stroke="#000" strokeWidth="1" />;
                })}
            </Svg>

            <View style={applyTw('flex-row flex-wrap justify-center gap-3 mt-4')}>
                {data.map((item, i) => (
                    <View key={i} style={applyTw('flex-row items-center gap-1')}>
                        <View style={[applyTw('w-2 h-2 rounded-full'), { backgroundColor: item.fill }]} />
                        <Text style={applyTw('text-xs text-gray-400')}>{item.browser}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

// ==================== TYPE 7: DONUT ====================
const PieChartDonut = () => {
    const size = 200;
    const outerRadius = 90;
    const innerRadius = 55;
    const cx = size / 2;
    const cy = size / 2;
    let currentAngle = -90;

    return (
        <View style={applyTw('items-center')}>
            <Svg width={size} height={size}>
                {data.map((item, index) => {
                    const angle = (item.visitors / totalVisitors) * 360;
                    const path = createDonutArc(cx, cy, outerRadius, innerRadius, currentAngle, currentAngle + angle);
                    currentAngle += angle;
                    return <Path key={index} d={path} fill={item.fill} stroke="#000" strokeWidth="1" />;
                })}
            </Svg>
        </View>
    );
};

// ==================== TYPE 8: DONUT ACTIVE ====================
const PieChartDonutActive = () => {
    const size = 200;
    const cx = size / 2;
    const cy = size / 2;
    let currentAngle = -90;

    // Highlight Chrome (index 0)
    const activeIndex = 0;

    return (
        <View style={applyTw('items-center')}>
            <Svg width={size} height={size}>
                {data.map((item, index) => {
                    const isActive = index === activeIndex;
                    const outerRadius = isActive ? 95 : 90;
                    const innerRadius = 55;

                    const angle = (item.visitors / totalVisitors) * 360;
                    const path = createDonutArc(cx, cy, outerRadius, innerRadius, currentAngle, currentAngle + angle);
                    currentAngle += angle;
                    return <Path key={index} d={path} fill={item.fill} stroke="#000" strokeWidth="1" />;
                })}
            </Svg>
        </View>
    );
};

// ==================== TYPE 9: DONUT WITH TEXT ====================
const PieChartDonutText = () => {
    const size = 200;
    const outerRadius = 90;
    const innerRadius = 60;
    const cx = size / 2;
    const cy = size / 2;
    let currentAngle = -90;

    return (
        <View style={applyTw('items-center')}>
            <Svg width={size} height={size}>
                {data.map((item, index) => {
                    const angle = (item.visitors / totalVisitors) * 360;
                    const path = createDonutArc(cx, cy, outerRadius, innerRadius, currentAngle, currentAngle + angle);
                    currentAngle += angle;
                    return <Path key={index} d={path} fill={item.fill} stroke="#000" strokeWidth="1" />;
                })}

                <SvgText x={cx} y={cy} textAnchor="middle" fontSize="24" fontWeight="bold" fill="white" dy="5">
                    {totalVisitors.toLocaleString()}
                </SvgText>
                <SvgText x={cx} y={cy + 20} textAnchor="middle" fontSize="12" fill="#9ca3af">
                    Visitors
                </SvgText>
            </Svg>
        </View>
    );
};


// ==================== MAIN EXPORT ====================
export const ChartPieLabel = () => {
    const [chartType, setChartType] = useState(1);

    const chartTypes = [
        { id: 1, label: 'Default', component: PieChartDefault },
        { id: 2, label: 'Separator None', component: PieChartSeparatorNone },
        { id: 3, label: 'Label', component: PieChartLabel },
        { id: 4, label: 'Custom Label', component: PieChartCustomLabel },
        { id: 5, label: 'Label List', component: PieChartLabelList },
        { id: 6, label: 'Legend', component: PieChartLegend },
        { id: 7, label: 'Donut', component: PieChartDonut },
        { id: 8, label: 'Donut Active', component: PieChartDonutActive },
        { id: 9, label: 'Donut with Text', component: PieChartDonutText },
    ];

    const CurrentChart = chartTypes.find(t => t.id === chartType)?.component || PieChartDefault;
    const TrendIcon = () => renderFlaticon('fi fi-rr-arrow-trend-up', { size: 16, color: '#10b981' });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Pie Chart - Showcase</CardTitle>
                <CardDescription>
                    Explore different pie chart visualizations
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

export default ChartPieLabel;
