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

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay();
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDateClick = (day) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        onSelect?.(newDate);
    };

    const renderHeader = () => (
        <View style={applyTw('flex-row items-center justify-between mb-4')}>
            <TouchableOpacity onPress={handlePrevMonth} style={applyTw('p-2')}>
                {renderFlaticon('fi fi-rr-angle-small-left', { size: 20, color: '#fff' })}
            </TouchableOpacity>
            <Text style={applyTw('text-white text-base font-semibold')}>
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </Text>
            <TouchableOpacity onPress={handleNextMonth} style={applyTw('p-2')}>
                {renderFlaticon('fi fi-rr-angle-small-right', { size: 20, color: '#fff' })}
            </TouchableOpacity>
        </View>
    );

    const renderDays = () => {
        const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        return (
            <View style={applyTw('flex-row justify-between mb-2')}>
                {days.map(day => (
                    <Text key={day} style={applyTw('text-gray-500 text-xs w-8 text-center')}>
                        {day}
                    </Text>
                ))}
            </View>
        );
    };

    const renderCells = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const rows = [];
        let cells = [];

        // Empty cells for days before start of month
        for (let i = 0; i < firstDay; i++) {
            cells.push(<View key={`empty-${i}`} style={applyTw('w-8 h-8')} />);
        }

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
            // Fill remaining cells to keep alignment if needed, or just push row
            while (cells.length < 7) {
                cells.push(<View key={`empty-end-${cells.length}`} style={applyTw('w-8 h-8')} />);
            }
            rows.push(<View key={rows.length} style={applyTw('flex-row justify-between mb-1')}>{cells}</View>);
        }

        return <View>{rows}</View>;
    };

    return (
        <View style={[applyTw('p-3 bg-[#111] rounded-lg border border-[#333]'), className]}>
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </View>
    );
};

export default Calendar;
