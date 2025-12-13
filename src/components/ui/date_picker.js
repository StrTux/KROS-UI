import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { applyTw } from '../../style/style';
import { Text } from './text';
import { Button } from './button'; // Assuming button exists or I'll use TouchableOpacity
import { Calendar } from './calendar';
import { renderFlaticon } from '../../functions/iconUtils';

/**
 * DatePicker Popover Component
 */
export const DatePicker = ({ date, onDateChange, placeholder = "Select date" }) => {
    const [open, setOpen] = useState(false);

    const handleSelect = (newDate) => {
        onDateChange(newDate);
        setOpen(false);
    };

    return (
        <View>
            <TouchableOpacity
                onPress={() => setOpen(true)}
                activeOpacity={0.7}
                style={applyTw('flex-row items-center justify-between border border-[#333] bg-[#111] px-3 py-2 rounded-md w-64')}
            >
                <Text style={applyTw(`text-sm ${date ? 'text-white' : 'text-gray-400'}`)}>
                    {date ? date.toLocaleDateString() : placeholder}
                </Text>
                {renderFlaticon('fi fi-rs-calendar', { size: 16, color: '#9ca3af' })}
            </TouchableOpacity>

            <Modal
                transparent
                visible={open}
                animationType="fade"
                onRequestClose={() => setOpen(false)}
            >
                <TouchableWithoutFeedback onPress={() => setOpen(false)}>
                    <View style={applyTw('flex-1 bg-black/50 justify-center items-center')}>
                        <TouchableWithoutFeedback>
                            <View style={applyTw('bg-[#111] rounded-lg border border-[#333] overflow-hidden shadow-xl')}>
                                <Calendar
                                    selected={date}
                                    onSelect={handleSelect}
                                    className="border-0 bg-[#111]"
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

export function Calendar22() {
    const [date, setDate] = useState();

    return (
        <View style={applyTw('flex-1 bg-black')}>
            <View style={applyTw('flex-1 justify-center items-center px-6')}>
                <View style={applyTw('w-full max-w-sm')}>
                    <Text style={applyTw('text-white font-medium mb-2 ml-1')}>
                        Date of birth
                    </Text>
                    <DatePicker
                        date={date}
                        onDateChange={setDate}
                    />
                </View>
            </View>
        </View>
    );
}

export default Calendar22;
