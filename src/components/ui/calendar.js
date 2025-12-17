import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { applyTw } from '../../style/style';
import { Text } from './text';
import { renderFlaticon } from '../../functions/iconUtils';

/**
 * Calendar Component
 * @param {Date} selected - Currently selected date
 * @param {function} onSelect - Callback when date is selected
 * @param {string} className - Additional styles
 */
export const Calendar = ({ selected, onSelect, className = '' }) => {
    const [currentDate, setCurrentDate] = useState(selected || new Date());
    const [view, setView] = useState('days'); // 'days', 'months', 'years'
    const [yearRangeStart, setYearRangeStart] = useState(new Date().getFullYear() - 6);

    // Helpers
    const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    // Navigation Handlers
    const handlePrev = () => {
        if (view === 'days') {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        } else if (view === 'years') {
            setYearRangeStart(yearRangeStart - 12);
        }
    };

    const handleNext = () => {
        if (view === 'days') {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        } else if (view === 'years') {
            setYearRangeStart(yearRangeStart + 12);
        }
    };

    const handleDateClick = (day) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        onSelect?.(newDate);
    };

    const handleMonthSelect = (monthIndex) => {
        const newDate = new Date(currentDate.getFullYear(), monthIndex, 1);
        setCurrentDate(newDate);
        setView('days');
    };

    const handleYearSelect = (year) => {
        const newDate = new Date(year, currentDate.getMonth(), 1);
        setCurrentDate(newDate);
        setView('days'); // Or 'months' if you prefer drilling down
    };

    // Renderers
    const renderHeader = () => (
        <View style={applyTw('flex-row items-center justify-between mb-4')}>
            <TouchableOpacity onPress={handlePrev} style={applyTw('p-2')}>
                {renderFlaticon('fi fi-rr-angle-small-left', { size: 20, color: '#fff' })}
            </TouchableOpacity>

            <View style={applyTw('flex-row gap-2')}>
                <TouchableOpacity
                    onPress={() => setView('months')}
                    style={applyTw(`px-3 py-1 rounded-md ${view === 'months' ? 'bg-[#333]' : ''}`)}
                >
                    <Text style={applyTw('text-white text-base font-semibold')}>
                        {currentDate.toLocaleDateString('en-US', { month: 'long' })}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setView('years');
                        setYearRangeStart(currentDate.getFullYear() - 6);
                    }}
                    style={applyTw(`px-3 py-1 rounded-md ${view === 'years' ? 'bg-[#333]' : ''}`)}
                >
                    <Text style={applyTw('text-white text-base font-semibold')}>
                        {currentDate.getFullYear()}
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleNext} style={applyTw('p-2')}>
                {renderFlaticon('fi fi-rr-angle-small-right', { size: 20, color: '#fff' })}
            </TouchableOpacity>
        </View>
    );

    const renderMonths = () => {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        return (
            <View style={applyTw('flex-row flex-wrap justify-between')}>
                {months.map((month, index) => {
                    const isSelected = currentDate.getMonth() === index;
                    return (
                        <TouchableOpacity
                            key={month}
                            style={applyTw(`w-[30%] py-3 mb-2 items-center rounded-lg ${isSelected ? 'bg-blue-600' : 'bg-[#222]'}`)}
                            onPress={() => handleMonthSelect(index)}
                        >
                            <Text style={applyTw(`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`)}>
                                {month}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    const renderYears = () => {
        const years = Array.from({ length: 12 }, (_, i) => yearRangeStart + i);
        return (
            <View style={applyTw('flex-row flex-wrap justify-between')}>
                {years.map((year) => {
                    const isSelected = currentDate.getFullYear() === year;
                    return (
                        <TouchableOpacity
                            key={year}
                            style={applyTw(`w-[30%] py-3 mb-2 items-center rounded-lg ${isSelected ? 'bg-blue-600' : 'bg-[#222]'}`)}
                            onPress={() => handleYearSelect(year)}
                        >
                            <Text style={applyTw(`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`)}>
                                {year}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    const renderDays = () => {
        const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const rows = [];
        let cells = [];

        // Header Days
        const header = (
            <View style={applyTw('flex-row justify-between mb-2')} key="header">
                {days.map(day => (
                    <Text key={day} style={applyTw('text-gray-500 text-xs w-8 text-center')}>
                        {day}
                    </Text>
                ))}
            </View>
        );

        // Empty cells
        for (let i = 0; i < firstDay; i++) {
            cells.push(<View key={`empty-${i}`} style={applyTw('w-8 h-8')} />);
        }

        // Day cells
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const isSelected = selected && date.toDateString() === selected.toDateString();
            const isToday = new Date().toDateString() === date.toDateString();

            cells.push(
                <TouchableOpacity
                    key={day}
                    onPress={() => handleDateClick(day)}
                    style={[
                        applyTw('w-8 h-8 items-center justify-center rounded-md'),
                        isSelected ? applyTw('bg-blue-600') : null
                    ]}
                >
                    <Text
                        style={[
                            applyTw('text-sm'),
                            isSelected ? applyTw('text-white font-bold') : applyTw('text-gray-300'),
                            !isSelected && isToday && applyTw('text-blue-400 font-medium')
                        ]}
                    >
                        {day}
                    </Text>
                </TouchableOpacity>
            );

            if (cells.length === 7) {
                rows.push(<View key={rows.length} style={applyTw('flex-row justify-between mb-1')}>{cells}</View>);
                cells = [];
            }
        }

        if (cells.length > 0) {
            while (cells.length < 7) {
                cells.push(<View key={`empty-end-${cells.length}`} style={applyTw('w-8 h-8')} />);
            }
            rows.push(<View key={rows.length} style={applyTw('flex-row justify-between mb-1')}>{cells}</View>);
        }

        return (
            <View>
                {header}
                {rows}
            </View>
        );
    };

    return (
        <View style={[applyTw('p-3 bg-[#111] rounded-lg border border-[#333]'), className]}>
            {renderHeader()}
            {view === 'days' && renderDays()}
            {view === 'months' && renderMonths()}
            {view === 'years' && renderYears()}
        </View>
    );
};

export default Calendar;
