import React from 'react';
import { View, Text } from 'react-native';
import { applyTw } from '../../style/style';

// SVG Icon Replacements
const CircleCheckIcon = () => (
  <View style={applyTw('mr-3')}>
    {/* Simple circle + check mimic (replace with react-native-svg for better icons) */}
    <Text style={applyTw('text-green-600 text-xl')}>✔️</Text>
  </View>
);

const PopcornIcon = () => (
  <View style={applyTw('mr-3')}>
    {/* Placeholder: popcorn, use icon lib if needed */}
    <Text style={applyTw('text-yellow-500 text-xl')}>🍿</Text>
  </View>
);

const CircleAlertIcon = () => (
  <View style={applyTw('mr-3')}>
    <Text style={applyTw('text-red-600 text-xl')}>⚠️</Text>
  </View>
);

// Alert Variants
const alerts = [
  {
    type: 'success',
    title: 'Success! Your changes have been saved',
    description: 'This is an alert with icon, title and description.',
    icon: <CircleCheckIcon />,
    bgColor: 'bg-green-900',
    textColor: 'text-green-300',
    borderColor: 'border-green-600',
  },
  {
    type: 'info',
    title: 'This Alert has a title and an icon. No description.',
    description: '',
    icon: <PopcornIcon />,
    bgColor: 'bg-yellow-900',
    textColor: 'text-yellow-300',
    borderColor: 'border-yellow-600',
  },
  {
    type: 'error',
    title: 'Unable to process your payment.',
    description: [
      'Please verify your billing information and try again.',
      ['Check your card details', 'Ensure sufficient funds', 'Verify billing address'],
    ],
    icon: <CircleAlertIcon />,
    bgColor: 'bg-red-900',
    textColor: 'text-red-300',
    borderColor: 'border-red-600',
  }
];

const AlertDemo = () => (
  <View style={applyTw('w-full max-w-xl')}>
    {alerts.map((alert, idx) => (
      <View
        key={alert.type}
        style={applyTw(
          `relative w-full rounded-lg border px-4 py-3 mb-4 ${alert.bgColor} ${alert.borderColor}`
        )}
      >
        <View style={applyTw('flex-row items-start')}>
          {alert.icon}
          <View style={applyTw('flex-1')}>
            <Text style={applyTw(`font-medium tracking-tight mb-2 ${alert.textColor}`)}>
              {alert.title}
            </Text>
            {/* Description or List */}
            {alert.description && typeof alert.description === 'string' ? (
              <Text style={applyTw('text-sm text-gray-400')}>{alert.description}</Text>
            ) : Array.isArray(alert.description) ? (
              <>
                <Text style={applyTw('text-sm text-gray-400 mb-1')}>
                  {alert.description[0]}
                </Text>
                <View style={applyTw('pl-3')}>
                  {alert.description[1].map((line, li) => (
                    <Text key={li} style={applyTw('text-sm text-gray-400')}>
                      • {line}
                    </Text>
                  ))}
                </View>
              </>
            ) : null}
          </View>
        </View>
      </View>
    ))}
  </View>
);

export default AlertDemo;
