import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import applyTw from '../../style/style';
import { renderFlaticon } from '../../functions/_fn';
import FlaticonIcons from '../../assest/icon/iconMap';

const DEFAULT_PROFILE = {
    id: 1,
    name: 'Natasha Romanoff',
    verified: true,
    bio: "I'm a Brand Designer who focuses on clarity & emotional connection.",
    rating: 4.8,
    earned: '$45k+',
    rate: '$50/hr',
    image: 'https://i.pinimg.com/736x/f0/ca/95/f0ca954ecfb30e355c9e4734dd0c47b7.jpg',
};

// Profile Card Component
export function ProfileCardDemo() {
    const [profile] = useState(DEFAULT_PROFILE);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        console.log(isBookmarked ? 'Unbookmarked' : 'Bookmarked');
    };

    const handleGetInTouch = () => {
        console.log('Get in touch with:', profile.name);
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

            <View style={applyTw('items-center justify-center py-2')}>
                {/* Profile Card Container */}
                <View style={[
                    applyTw(`rounded-3xl mx-6 ${isDarkMode ? 'bg-[#111111]' : 'bg-white'}`),
                    {
                        padding: 24,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                        elevation: 5,
                        maxWidth: 380,
                        width: '100%',
                    }
                ]}>
                    {/* Profile Image with Bookmark */}
                    <View style={applyTw('mb-4 relative')}>
                        <Image
                            source={{ uri: profile.image }}
                            style={[
                                applyTw(`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`),
                                {
                                    width: '100%',
                                    height: 360,
                                    borderRadius: 20,
                                    resizeMode: 'cover',
                                }
                            ]}
                        />

                        {/* Bookmark Icon Button */}
                        <TouchableOpacity
                            onPress={handleBookmark}
                            style={[
                                applyTw('absolute rounded-full'),
                                {
                                    top: 16,
                                    right: 16,
                                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.6)',
                                    padding: 12,
                                }
                            ]}
                        >
                            {renderFlaticon(
                                'bookmark',
                                { size: 20, color: isBookmarked ? '#FCD34D' : '#FFFFFF' },
                                FlaticonIcons
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Name with Verification Badge */}
                    <View style={applyTw('flex-row items-center mb-2')}>
                        <Text style={[
                            applyTw(`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`),
                            { fontSize: 22 }
                        ]}>
                            {profile.name}
                        </Text>
                        {profile.verified && (
                            <View style={applyTw('ml-2')}>
                                {renderFlaticon(
                                    'shield-check',
                                    { size: 20, color: '#3B82F6' },
                                    FlaticonIcons
                                )}
                            </View>
                        )}
                    </View>

                    {/* Bio */}
                    <Text style={[
                        applyTw(`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`),
                        { fontSize: 14, lineHeight: 20 }
                    ]}>
                        {profile.bio}
                    </Text>

                    {/* Stats Row */}
                    <View style={applyTw('flex-row justify-between items-center mb-6')}>
                        {/* Rating */}
                        <View style={applyTw('items-center flex-1')}>
                            <View style={applyTw('flex-row items-center mb-1')}>
                                {renderFlaticon(
                                    'star',
                                    { size: 20, color: '#F59E0B' },
                                    FlaticonIcons
                                )}
                                <Text style={[
                                    applyTw(`font-bold ml-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`),
                                    { fontSize: 16 }
                                ]}>
                                    {profile.rating}
                                </Text>
                            </View>
                            <Text style={[
                                applyTw('text-gray-500'),
                                { fontSize: 12 }
                            ]}>
                                Rating
                            </Text>
                        </View>

                        {/* Earned */}
                        <View style={applyTw('items-center flex-1')}>
                            <View style={applyTw('flex-row items-center mb-1')}>
                                {renderFlaticon(
                                    'dollar',
                                    { size: 20, color: '#10B981' },
                                    FlaticonIcons
                                )}
                                <Text style={[
                                    applyTw(`font-bold ml-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`),
                                    { fontSize: 16 }
                                ]}>
                                    {profile.earned}
                                </Text>
                            </View>
                            <Text style={[
                                applyTw('text-gray-500'),
                                { fontSize: 12 }
                            ]}>
                                Earned
                            </Text>
                        </View>

                        {/* Rate */}
                        <View style={applyTw('items-center flex-1')}>
                            <View style={applyTw('flex-row items-center mb-1')}>
                                {renderFlaticon(
                                    'dollar',
                                    { size: 20, color: '#10B981' },
                                    FlaticonIcons
                                )}
                                <Text style={[
                                    applyTw(`font-bold ml-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`),
                                    { fontSize: 16 }
                                ]}>
                                    {profile.rate}
                                </Text>
                            </View>
                            <Text style={[
                                applyTw('text-gray-500'),
                                { fontSize: 12 }
                            ]}>
                                Rate
                            </Text>
                        </View>
                    </View>

                    {/* Get in Touch Button */}
                    <TouchableOpacity
                        onPress={handleGetInTouch}
                        activeOpacity={0.9}
                        style={[
                            applyTw(`rounded-full flex-row items-center justify-center ${isDarkMode ? 'bg-white' : 'bg-black'}`),
                            { paddingVertical: 16 }
                        ]}
                    >
                        {renderFlaticon(
                            'envelope',
                            { size: 20, color: isDarkMode ? '#000000' : '#FFFFFF' },
                            FlaticonIcons
                        )}
                        <Text style={[
                            applyTw(`font-semibold ml-2 ${isDarkMode ? 'text-black' : 'text-white'}`),
                            { fontSize: 16 }
                        ]}>
                            Get in Touch
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

export default ProfileCardDemo;
