import React from 'react';
import { Text } from './text';
import { applyTw } from '../../style/style';

/**
 * Label Component for React Native
 * Form label for inputs
 */

export const Label = ({ children, className = '', ...props }) => {
    return (
        <Text
            style={applyTw(`text-white text-sm font-medium mb-2 ${className}`)}
            {...props}
        >
            {children}
        </Text>
    );
};

export default Label;
