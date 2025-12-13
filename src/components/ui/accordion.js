import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { applyTw } from '../../style/style';

const data = [
  {
    key: 'product',
    title: 'Product Information',
    content: [
      'Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability.',
      'Key features include advanced processing capabilities, and an intuitive user interface designed for both beginners and experts.'
    ]
  },
  {
    key: 'shipping',
    title: 'Shipping Details',
    content: [
      'We offer worldwide shipping through trusted courier partners. Standard delivery takes 3-5 business days, while express shipping ensures delivery within 1-2 business days.',
      'All orders are carefully packaged and fully insured. Track your shipment in real-time through our dedicated tracking portal.'
    ]
  },
  {
    key: 'returns',
    title: 'Return Policy',
    content: [
      "We stand behind our products with a comprehensive 30-day return policy. If you're not completely satisfied, simply return the item in its original condition.",
      'Our hassle-free return process includes free return shipping and full refunds processed within 48 hours of receiving the returned item.'
    ]
  }
];

const AccordionDemo = () => {
  const [open, setOpen] = useState('returns');

  const toggle = key => {
    setOpen(prev => (prev === key ? '' : key));
  };

  return (
    <View style={applyTw('bg-[#111111] rounded-lg border border-[#2A2A2A] w-full p-4')}>
      {data.map(({ key, title, content }, idx) => {
        const isOpen = open === key;
        const isLast = idx === data.length - 1;
        return (
          <View key={key} style={applyTw(isLast ? '' : 'border-b border-[#2A2A2A]')}>
            {/* Accordion Trigger */}
            <TouchableOpacity
              onPress={() => toggle(key)}
              activeOpacity={0.8}
              style={applyTw('flex flex-row items-start justify-between gap-4 rounded-md py-4')}
            >
              <Text style={applyTw('text-left text-base font-medium text-white')}>
                {title}
              </Text>
              {/* Chevron Down Icon (Rotates if open) */}
              <Animated.View
                style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}
              >
                {/* Simple chevron using SVG path mimic, replace with icon if using library */}
                <Text style={applyTw('text-base text-gray-400')}>
                  ▼
                </Text>
              </Animated.View>
            </TouchableOpacity>
            {/* Accordion Content */}
            {isOpen && (
              <View style={applyTw('pt-0 pb-4 flex flex-col gap-4')}>
                {content.map((para, ci) => (
                  <Text key={ci} style={applyTw('text-sm py-1 text-gray-300')}>
                    {para}
                  </Text>
                ))}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default AccordionDemo;
