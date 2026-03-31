import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Animated,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';
import applyTw from '../../style/style';
import { renderFlaticon } from '../../functions/_fn';
import FlaticonIcons from '../../assest/icon/iconMap';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_PADDING = 16;

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}
// Adjust width for padding inside the card (20px padding * 2 = 40px)
const CARD_INNER_WIDTH = SCREEN_WIDTH - 25 - 90; // Screen - Card Margin - Card Padding

const DEFAULT_PRODUCT = {
    id: 1,
    name: 'AirPods Pro 2',
    price: 250.00,
    description: 'Experience unprecedented sound with pro-level Active Noise Cancellation. Adaptive Audio for the right mix of noise control in any environment.',
    colors: [
        { id: 1, name: 'Space Gray', hex: '#6B6B6B' },
        { id: 2, name: 'White', hex: '#FFFFFF' },
        { id: 3, name: 'Black', hex: '#000000' },
        { id: 4, name: 'Silver', hex: '#E5E5E5' },
    ],
    images: [
        'https://www.apple.com/v/airpods-4/g/images/overview/media-card/media_lifestyle__cyk4qt05xic2_xlarge_2x.jpg',
        'https://www.apple.com/v/airpods-4/g/images/overview/media-card/media_live_translation__epwy7gl2k7ee_xlarge_2x.jpg',
        'https://www.apple.com/v/airpods-4/g/images/overview/bento-gallery/bento_case_open__63kccmu775u6_xlarge_2x.jpg',
    ]
};

// Image Swiper Component
const ImageSwiper = ({ images, isDarkMode }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        {
            useNativeDriver: false,
            listener: (event) => {
                const totalWidth = CARD_INNER_WIDTH + 10; // Width + Margin
                const index = Math.round(event.nativeEvent.contentOffset.x / totalWidth);
                setActiveIndex(index);
            },
        }
    );

    return (
        <View style={applyTw('mb-4')}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                style={applyTw('mb-3')}
            >
                {images.map((image, index) => (
                    <View key={index} style={{ width: CARD_INNER_WIDTH, marginRight: 6 }}>
                        <Image
                            source={{ uri: image }}
                            style={[
                                applyTw(`gap-2 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`),
                                {
                                    width: CARD_INNER_WIDTH,
                                    height: CARD_INNER_WIDTH * 0.75,
                                    resizeMode: 'cover'
                                }
                            ]}
                        />
                    </View>
                ))}
            </ScrollView>

            {/* Pagination Dots */}
            <View style={applyTw('flex-row gap-2 justify-center items-center')}>
                {images.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            applyTw('rounded-full mx-1'),
                            {
                                width: activeIndex === index ? 8 : 6,
                                height: activeIndex === index ? 8 : 6,
                                backgroundColor: activeIndex === index
                                    ? (isDarkMode ? '#FFFFFF' : '#000000') // Active Dot
                                    : (isDarkMode ? '#4B5563' : '#D1D5DB'), // Inactive Dot
                            }
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

// Color Selector Component
const ColorSelector = ({ colors, selectedColor, onSelectColor, isDarkMode }) => {
    return (
        <View style={applyTw('mb-4')}>
            <Text style={[applyTw(`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`), { fontSize: 13 }]}>
                Color - {selectedColor?.name || 'White'}
            </Text>
            <View style={applyTw('flex-row items-center')}>
                {colors.map((color) => (
                    <TouchableOpacity
                        key={color.id}
                        onPress={() => onSelectColor(color)}
                        style={[
                            applyTw('rounded-full mr-3'),
                            {
                                width: 40,
                                height: 40,
                                borderWidth: selectedColor?.id === color.id ? 2 : 1,
                                borderColor: selectedColor?.id === color.id
                                    ? (isDarkMode ? '#FFFFFF' : '#000000') // Selected Border
                                    : (isDarkMode ? '#374151' : '#E5E5E7'), // Unselected Border
                                backgroundColor: color.hex,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }
                        ]}
                    >
                        {color.hex === '#FFFFFF' && (
                            <View style={[
                                applyTw('absolute'),
                                {
                                    width: 36,
                                    height: 36,
                                    borderRadius: 18,
                                    borderWidth: 1,
                                    borderColor: isDarkMode ? '#374151' : '#E5E5E7'
                                }
                            ]} />
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

// Main Purchase Card Component
export function PurchaseCardDemo() {
    const [product] = useState(DEFAULT_PRODUCT);
    const [selectedColor, setSelectedColor] = useState(product.colors[1]); // White by default
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const handleMoreDetails = () => {
        console.log('More details pressed');
    };

    const handleAddToCart = () => {
        // Animate the layout change
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        setIsAdded(!isAdded);
        console.log(!isAdded ? 'Added to cart' : 'Removed from cart', { product: product.name, color: selectedColor.name });
    };

    return (
        <ScrollView style={applyTw(`flex-1 ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`)}>

            {/* Theme Toggle Control */}
            <View style={applyTw('flex-row justify-end px-4 pt-4 mb-2')}>
                <TouchableOpacity
                    onPress={() => setIsDarkMode(!isDarkMode)}
                    style={applyTw(`px-4 py-2 rounded-full border ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-white'}`)}
                >
                    <Text style={applyTw(`${isDarkMode ? 'text-white' : 'text-black'} text-xs font-bold uppercase`)}>
                        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={[
                applyTw(`rounded-3xl shadow-lg mx-4 my-2 ${isDarkMode ? 'bg-[#111111]' : 'bg-white'}`),
                { padding: 20 }
            ]}>

                {/* Image Swiper */}
                <ImageSwiper images={product.images} isDarkMode={isDarkMode} />

                {/* Product Info */}
                <View style={applyTw('mb-4')}>
                    <View style={applyTw('flex-row justify-between items-start mb-2')}>
                        <Text style={[
                            applyTw(`font-semibold flex-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`),
                            { fontSize: 24 }
                        ]}>
                            {product.name}
                        </Text>
                        <Text style={[
                            applyTw(`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`),
                            { fontSize: 24 }
                        ]}>
                            ${product.price.toFixed(2)}
                        </Text>
                    </View>

                    <Text style={[
                        applyTw(`leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`),
                        { fontSize: 14, lineHeight: 20 }
                    ]}>
                        {product.description}
                    </Text>
                </View>

                {/* Color Selector */}
                <ColorSelector
                    colors={product.colors}
                    selectedColor={selectedColor}
                    onSelectColor={setSelectedColor}
                    isDarkMode={isDarkMode}
                />

                {/* Action Buttons */}
                <View style={applyTw('flex-row items-center')}>
                    {/* More Details Button */}
                    <TouchableOpacity
                        onPress={handleMoreDetails}
                        style={[
                            applyTw(`flex-1 border rounded-full mr-3 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`),
                            { paddingVertical: 14 }
                        ]}
                    >
                        <Text style={[
                            applyTw(`text-center font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`),
                            { fontSize: 15 }
                        ]}>
                            More details
                        </Text>
                    </TouchableOpacity>

                    {/* Add to Cart Button */}
                    <TouchableOpacity
                        onPress={handleAddToCart}
                        activeOpacity={0.8}
                        style={[
                            applyTw(`flex-1 rounded-full flex-row items-center justify-center`),
                            {
                                paddingVertical: 14,
                                backgroundColor: isAdded
                                    ? '#38bdf8' // Sky Blue when added
                                    : (isDarkMode ? '#FFFFFF' : '#000000') // Theme color when not added
                            }
                        ]}
                    >
                        <View style={{ marginRight: 8 }}>
                            {renderFlaticon(
                                isAdded ? 'fi fi-tr-bag-shopping-minus' : 'fi fi-tr-shopping-bag-add', // Toggle Icon
                                {
                                    size: 18,
                                    color: isAdded
                                        ? '#FFFFFF' // White icon on sky blue
                                        : (isDarkMode ? '#000000' : '#FFFFFF') // Contrast icon on theme btn
                                },
                                FlaticonIcons
                            )}
                        </View>
                        <Text style={[
                            applyTw('text-center font-semibold'),
                            {
                                fontSize: 15,
                                color: isAdded
                                    ? '#FFFFFF' // White text on sky blue
                                    : (isDarkMode ? '#000000' : '#FFFFFF') // Contrast text on theme btn
                            }
                        ]}>
                            {isAdded ? 'View Cart' : 'Add to cart'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

export default PurchaseCardDemo;
