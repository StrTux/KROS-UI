import React from 'react';
import { Text as RNText } from 'react-native';
import { applyTw } from '../../style/style';

/**
 * Text Component
 * A wrapper around React Native Text with className support
 * Allows using Tailwind-style classes for styling text
 */

/**
 * Text Component
 * @param {object} props
 * @param {string} props.className - Tailwind-style class names
 * @param {object} props.style - Additional inline styles
 * @param {React.ReactNode} props.children - Text content
 * @param {any} props.rest - All other Text props
 */
export const Text = ({ className = '', style, children, ...rest }) => {
    const twStyle = className ? applyTw(className) : {};

    return (
        <RNText style={[twStyle, style]} {...rest}>
            {children}
        </RNText>
    );
};

// Export TextDemo for component showcase
export const TextDemo = () => {
    return (
        <RNText style={applyTw('w-full gap-6 flex-col')}>
            {/* Font Sizes */}
            <RNText style={applyTw('gap-3 mb-6')}>
                <Text className="text-white text-lg font-semibold mb-3">Font Sizes</Text>
                <Text className="text-gray-400 text-xs mb-1">Extra Small (xs)</Text>
                <Text className="text-gray-400 text-sm mb-1">Small (sm)</Text>
                <Text className="text-gray-400 text-base mb-1">Base</Text>
                <Text className="text-gray-400 text-lg mb-1">Large (lg)</Text>
                <Text className="text-gray-400 text-xl mb-1">Extra Large (xl)</Text>
                <Text className="text-gray-400 text-2xl mb-1">2XL</Text>
            </RNText>

            {/* Font Weights */}
            <RNText style={applyTw('gap-3 mb-6')}>
                <Text className="text-white text-lg font-semibold mb-3">Font Weights</Text>
                <Text className="text-gray-400 font-light mb-1">Light</Text>
                <Text className="text-gray-400 font-normal mb-1">Normal</Text>
                <Text className="text-gray-400 font-medium mb-1">Medium</Text>
                <Text className="text-gray-400 font-semibold mb-1">Semibold</Text>
                <Text className="text-gray-400 font-bold mb-1">Bold</Text>
            </RNText>

            {/* Colors */}
            <RNText style={applyTw('gap-3 mb-6')}>
                <Text className="text-white text-lg font-semibold mb-3">Colors</Text>
                <Text className="text-white mb-1">White</Text>
                <Text className="text-gray-400 mb-1">Gray</Text>
                <Text className="text-red-500 mb-1">Red</Text>
                <Text className="text-green-500 mb-1">Green</Text>
                <Text className="text-blue-500 mb-1">Blue</Text>
                <Text className="text-yellow-500 mb-1">Yellow</Text>
            </RNText>

            {/* Text Alignment */}
            <RNText style={applyTw('gap-3 mb-6')}>
                <Text className="text-white text-lg font-semibold mb-3">Text Alignment</Text>
                <Text className="text-gray-400 text-left mb-1">Left Aligned</Text>
                <Text className="text-gray-400 text-center mb-1">Center Aligned</Text>
                <Text className="text-gray-400 text-right mb-1">Right Aligned</Text>
            </RNText>

            {/* Text Transform */}
            <RNText style={applyTw('gap-3')}>
                <Text className="text-white text-lg font-semibold mb-3">Text Transform</Text>
                <Text className="text-gray-400 uppercase mb-1">Uppercase Text</Text>
                <Text className="text-gray-400 lowercase mb-1">LOWERCASE TEXT</Text>
                <Text className="text-gray-400 capitalize mb-1">capitalize text</Text>
            </RNText>
        </RNText>
    );
};

export default Text;