import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { applyTw } from '../../../style/style';
import { Text } from '../text';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card';
import Svg, { Line, Polygon, Circle, Text as SvgText, G } from 'react-native-svg';
import { renderFlaticon } from '../../../functions/iconUtils';

const chartColors = {
    desktop: '#3b82f6', // blue
    mobile: '#64748b', // slate
};

const data = [
    { month: 'January', desktop: 186, mobile: 160 },
    { month: 'February', desktop: 285, mobile: 170 },
    { month: 'March', desktop: 237, mobile: 180 },
    { month: 'April', desktop: 203, mobile: 160 },
    { month: 'May', desktop: 209, mobile: 190 },
    { month: 'June', desktop: 214, mobile: 204 },
];

const size = 260;
const centerX = size / 2;
const centerY = size / 2;
const maxRadius = 90;
const maxValue = 300;

// Helper to get points
const getPoints = (dataset, key) => {
    const angleStep = (2 * Math.PI) / dataset.length;
    return dataset.map((item, index) => {
        const angle = index * angleStep - Math.PI / 2;
        const radius = (item[key] / maxValue) * maxRadius;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        return { x, y, value: item[key], label: item.month };
    });
};

const getPolyPoints = (points) => points.map(p => `${p.x},${p.y}`).join(' ');

// ==================== TYPE 1: DEFAULT ====================
const RadarChartDefault = () => {
    const points = getPoints(data, 'desktop');
    const polyPoints = getPolyPoints(points);
    const angleStep = (2 * Math.PI) / data.length;

    return (
        <View style={applyTw('items-center')}>
            <Svg width={size} height={size}>
                {/* Grid */}
                {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
                    <Polygon
                        key={i}
                        points={data.map((_, idx) => {
                            const angle = idx * angleStep - Math.PI / 2;
                            const r = maxRadius * scale;
                            return `${centerX + r * Math.cos(angle)},${centerY + r * Math.sin(angle)}`;
                        }).join(' ')}
                        fill="none"
                        stroke="#262626"
                        strokeWidth="1"
                    />
                ))}
                {/* Axis Lines */}
                {data.map((_, i) => {
                    const angle = i * angleStep - Math.PI / 2;
                    return (
                        <Line
                            key={i}
                            x1={centerX} y1={centerY}
                            x2={centerX + maxRadius * Math.cos(angle)}
                            y2={centerY + maxRadius * Math.sin(angle)}
                            stroke="#262626" strokeWidth="1"
                        />
                    );
                })}
                {/* Data */}
                <Polygon points={polyPoints} fill={chartColors.desktop} fillOpacity="0.5" stroke={chartColors.desktop} strokeWidth="2" />
                {/* Points */}
                {points.map((p, i) => (
                    <Circle key={i} cx={p.x} cy={p.y} r="4" fill={chartColors.desktop} />
                ))}
            </Svg>
        </View>
    );
};

// ==================== TYPE 2: DOTS ====================
const RadarChartDots = () => {
    const points = getPoints(data, 'desktop');
    const polyPoints = getPolyPoints(points);
    const angleStep = (2 * Math.PI) / data.length;

    return (
        <View style={applyTw('items-center')}>
            <Svg width={size} height={size}>
                {/* Grid */}
                {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
                    <Polygon key={i} points={data.map((_, idx) => {
                        const angle = idx * angleStep - Math.PI / 2;
                        const r = maxRadius * scale;
                        return `${centerX + r * Math.cos(angle)},${centerY + r * Math.sin(angle)}`;
                    }).join(' ')} fill="none" stroke="#262626" strokeWidth="1" />
                ))}

                <Polygon points={polyPoints} fill={chartColors.desktop} fillOpacity="0.2" stroke={chartColors.desktop} strokeWidth="2" />

                {points.map((p, i) => (
                    <Circle key={i} cx={p.x} cy={p.y} r="5" fill="#1a1a1a" stroke={chartColors.desktop} strokeWidth="2" />
                ))}
            </Svg>
        </View>
    );
};

// ==================== TYPE 3: LINES ONLY ====================
const RadarChartLinesOnly = () => {
    const points = getPoints(data, 'desktop');
    const polyPoints = getPolyPoints(points);
    const angleStep = (2 * Math.PI) / data.length;

    return (
        <View style={applyTw('items-center')}>
            <Svg width={size} height={size}>
                {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
                    <Polygon key={i} points={data.map((_, idx) => {
                        const angle = idx * angleStep - Math.PI / 2;
                        const r = maxRadius * scale;
                        return `${centerX + r * Math.cos(angle)},${centerY + r * Math.sin(angle)}`;
                    }).join(' ')} fill="none" stroke="#262626" strokeWidth="1" />
                ))}
                {data.map((_, i) => {
                    const angle = i * angleStep - Math.PI / 2;
                    return <Line key={i} x1={centerX} y1={centerY} x2={centerX + maxRadius * Math.cos(angle)} y2={centerY + maxRadius * Math.sin(angle)} stroke="#262626" strokeWidth="1" />;
                })}

                <Polygon points={polyPoints} fill="none" stroke={chartColors.desktop} strokeWidth="2" />
            </Svg>
        </View>
    );
};

// ==================== TYPE 4: CUSTOM LABEL ====================
const RadarChartCustomLabel = () => {
    const points = getPoints(data, 'desktop');
    const polyPoints = getPolyPoints(points);
    const angleStep = (2 * Math.PI) / data.length;

    return (
        <View style={applyTw('items-center')}>
            <Svg width={size} height={size}>
                {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
                    <Polygon key={i} points={data.map((_, idx) => {
                        const angle = idx * angleStep - Math.PI / 2;
                        const r = maxRadius * scale;
                        return `${centerX + r * Math.cos(angle)},${centerY + r * Math.sin(angle)}`;
                    }).join(' ')} fill="none" stroke="#262626" strokeWidth="1" />
                ))}

                <Polygon points={polyPoints} fill={chartColors.desktop} fillOpacity="0.5" stroke={chartColors.desktop} strokeWidth="2" />

                {points.map((p, i) => (
                    <React.Fragment key={i}>
                        <Circle cx={p.x} cy={p.y} r="3" fill="white" />
                        <SvgText x={p.x} y={p.y - 10} fill="white" fontSize="10" textAnchor="middle">{p.value}</SvgText>
                        <SvgText x={p.x} y={p.y + 15} fill="#6b7280" fontSize="8" textAnchor="middle">{p.label}</SvgText>
                    </React.Fragment>
                ))}
            </Svg>
        </View>
    );
};

// ==================== TYPE 5: GRID CUSTOM ====================
const RadarChartGridCustom = () => {
    const points = getPoints(data, 'desktop');
    const polyPoints = getPolyPoints(points);
    const angleStep = (2 * Math.PI) / data.length;

    return (
        <View style={applyTw('items-center')}>
            <Svg width={size} height={size}>
                {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
                    <Polygon key={i} points={data.map((_, idx) => {
                        const angle = idx * angleStep - Math.PI / 2;
                        const r = maxRadius * scale;
                        return `${centerX + r * Math.cos(angle)},${centerY + r * Math.sin(angle)}`;
                    }).join(' ')} fill="none" stroke={i % 2 === 0 ? "#404040" : "#262626"} strokeWidth="2" />
                ))}

                <Polygon points={polyPoints} fill={chartColors.desktop} fillOpacity="0.6" stroke={chartColors.desktop} strokeWidth="2" />
            </Svg>
        </View>
    );
};

// ==================== TYPE 6: GRID NONE ====================
const RadarChartGridNone = () => {
    const points = getPoints(data, 'desktop');
    const polyPoints = getPolyPoints(points);

    return (
        <View style={applyTw('items-center')}>
            <Svg width={size} height={size}>
                <Polygon points={polyPoints} fill={chartColors.desktop} fillOpacity="0.6" stroke={chartColors.desktop} strokeWidth="2" />
                {points.map((p, i) => (
                    <Circle key={i} cx={p.x} cy={p.y} r="4" fill="white" />
                ))}
            </Svg>
        </View>
    );
};

// ==================== TYPE 7: GRID CIRCLE ====================
const RadarChartGridCircle = () => {
    const points = getPoints(data, 'desktop');
    const polyPoints = getPolyPoints(points);
    const angleStep = (2 * Math.PI) / data.length;

    return (
        <View style={applyTw('items-center')}>
            <Svg width={size} height={size}>
                {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
                    <Circle key={i} cx={centerX} cy={centerY} r={maxRadius * scale} fill="none" stroke="#262626" strokeWidth="1" />
                ))}
                {data.map((_, i) => {
                    const angle = i * angleStep - Math.PI / 2;
                    return <Line key={i} x1={centerX} y1={centerY} x2={centerX + maxRadius * Math.cos(angle)} y2={centerY + maxRadius * Math.sin(angle)} stroke="#262626" strokeWidth="1" />;
                })}

                <Polygon points={polyPoints} fill={chartColors.desktop} fillOpacity="0.5" stroke={chartColors.desktop} strokeWidth="2" />
                {points.map((p, i) => (
                    <Circle key={i} cx={p.x} cy={p.y} r="4" fill={chartColors.desktop} stroke="black" strokeWidth="1" />
                ))}
            </Svg>
        </View>
    );
};

// ==================== TYPE 8: GRID CIRCLE - NO LINES ====================
const RadarChartGridCircleNoLines = () => {
    const points = getPoints(data, 'desktop');
    const polyPoints = getPolyPoints(points);

    return (
        <View style={applyTw('items-center')}>
            <Svg width={size} height={size}>
                {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
                    <Circle key={i} cx={centerX} cy={centerY} r={maxRadius * scale} fill="none" stroke="#262626" strokeWidth="1" />
                ))}

                <Polygon points={polyPoints} fill={chartColors.desktop} fillOpacity="0.5" stroke={chartColors.desktop} strokeWidth="2" />
                {points.map((p, i) => (
                    <Circle key={i} cx={p.x} cy={p.y} r="4" fill={chartColors.desktop} stroke="black" strokeWidth="1" />
                ))}
            </Svg>
        </View>
    );
};

// ==================== TYPE 9: GRID CIRCLE FILLED ====================
const RadarChartGridCircleFilled = () => {
    const points = getPoints(data, 'desktop');
    const polyPoints = getPolyPoints(points);

    return (
        <View style={applyTw('items-center')}>
            <Svg width={size} height={size}>
                {/* Draw circles from largest to smallest */}
                {[1, 0.8, 0.6, 0.4, 0.2].map((scale, i) => (
                    <Circle
                        key={i}
                        cx={centerX}
                        cy={centerY}
                        r={maxRadius * scale}
                        fill={i % 2 === 0 ? "#262626" : "#1a1a1a"}
                        stroke="none"
                    />
                ))}

                <Polygon points={polyPoints} fill={chartColors.desktop} fillOpacity="0.7" stroke={chartColors.desktop} strokeWidth="2" />
            </Svg>
        </View>
    );
};


// ==================== MAIN EXPORT ====================
export const ChartRadarLinesOnly = () => {
    const [chartType, setChartType] = useState(1);

    const chartTypes = [
        { id: 1, label: 'Default', component: RadarChartDefault },
        { id: 2, label: 'Dots', component: RadarChartDots },
        { id: 3, label: 'Lines Only', component: RadarChartLinesOnly },
        { id: 4, label: 'Custom Label', component: RadarChartCustomLabel },
        { id: 5, label: 'Grid Custom', component: RadarChartGridCustom },
        { id: 6, label: 'Grid None', component: RadarChartGridNone },
        { id: 7, label: 'Grid Circle', component: RadarChartGridCircle },
        { id: 8, label: 'Circle No Lines', component: RadarChartGridCircleNoLines },
        { id: 9, label: 'Circle Filled', component: RadarChartGridCircleFilled },
    ];

    const CurrentChart = chartTypes.find(t => t.id === chartType)?.component || RadarChartDefault;
    const TrendIcon = () => renderFlaticon('fi fi-rr-arrow-trend-up', { size: 16, color: '#10b981' });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Radar Chart - Showcase</CardTitle>
                <CardDescription>
                    Explore different radar chart visualizations
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

export default ChartRadarLinesOnly;
