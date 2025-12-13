import React from 'react';
import { ScrollView, View } from 'react-native';
import { applyTw } from '../../style/style';
import { Text } from './text';
import { Card, CardHeader, CardTitle, CardContent } from './card';

// Import all chart components
import { ChartAreaInteractive } from './Chart/chart-area-interactive';
import { ChartBarInteractive } from './Chart/chart-bar-interactive';
import { ChartLineInteractive } from './Chart/chart-line-interactive';
import { ChartPieLabel } from './Chart/chart-pie-label';
import { ChartRadarLinesOnly } from './Chart/chart-radar-lines-only';
import { ChartRadialGrid } from './Chart/chart-radial-grid';
import { ChartTooltipIndicatorNone } from './Chart/chart-tooltip-indicator-none';

/**
 * Chart Demo Component
 * Comprehensive analytics dashboard with shadcn-inspired charts
 */

export const ChartDemo = () => {
    return (
        <ScrollView
            style={applyTw('flex-1 bg-black')}
            contentContainerStyle={applyTw('p-5 gap-6')}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={applyTw('gap-2 mb-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>
                    Analytics Dashboard
                </Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    Beautiful data visualization for React Native
                </Text>
            </View>

            {/* Area Chart - Interactive */}
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-lg font-semibold')}>
                    📈 Area Chart
                </Text>
                <ChartAreaInteractive />
            </View>

            {/* Bar Chart - Interactive */}
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-lg font-semibold')}>
                    📊 Bar Chart
                </Text>
                <ChartBarInteractive />
            </View>

            {/* Line Chart - Interactive */}
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-lg font-semibold')}>
                    📉 Line Chart
                </Text>
                <ChartLineInteractive />
            </View>

            {/* Pie Chart - With Labels */}
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-lg font-semibold')}>
                    🥧 Pie Chart
                </Text>
                <ChartPieLabel />
            </View>

            {/* Radar Chart - Lines Only */}
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-lg font-semibold')}>
                    🎯 Radar Chart
                </Text>
                <ChartRadarLinesOnly />
            </View>

            {/* Radial Chart - Grid */}
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-lg font-semibold')}>
                    ⭕ Radial Chart
                </Text>
                <ChartRadialGrid />
            </View>

            {/* Stacked Bar Chart */}
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-lg font-semibold')}>
                    📚 Stacked Bar
                </Text>
                <ChartTooltipIndicatorNone />
            </View>

            {/* Info Card */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>✨ Chart Features</CardTitle>
                </CardHeader>
                <CardContent>
                    <View style={applyTw('gap-3')}>
                        <View style={applyTw('flex-row items-start gap-2')}>
                            <Text style={applyTw('text-blue-400')}>•</Text>
                            <Text style={applyTw('text-gray-400 text-sm flex-1')}>
                                Interactive time range selectors
                            </Text>
                        </View>
                        <View style={applyTw('flex-row items-start gap-2')}>
                            <Text style={applyTw('text-purple-400')}>•</Text>
                            <Text style={applyTw('text-gray-400 text-sm flex-1')}>
                                Shadcn-inspired color palette
                            </Text>
                        </View>
                        <View style={applyTw('flex-row items-start gap-2')}>
                            <Text style={applyTw('text-green-400')}>•</Text>
                            <Text style={applyTw('text-gray-400 text-sm flex-1')}>
                                Responsive layouts with SVG
                            </Text>
                        </View>
                        <View style={applyTw('flex-row items-start gap-2')}>
                            <Text style={applyTw('text-pink-400')}>•</Text>
                            <Text style={applyTw('text-gray-400 text-sm flex-1')}>
                                Touch-optimized controls
                            </Text>
                        </View>
                        <View style={applyTw('flex-row items-start gap-2')}>
                            <Text style={applyTw('text-amber-400')}>•</Text>
                            <Text style={applyTw('text-gray-400 text-sm flex-1')}>
                                7 different chart types
                            </Text>
                        </View>
                    </View>
                </CardContent>
            </Card>
        </ScrollView>
    );
};

export default ChartDemo;
