// ==================== MUSIC PLAYER & CARD VARIANTS ====================

import React, { useState } from 'react';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { applyTw } from '../../style/style';
import { Text } from './text';
import { Button } from './button';
import { Card, CardHeader, CardContent, CardFooter } from './card';
import { renderFlaticon } from '../../functions/iconUtils';

/**
 * Music Player Card Components
 * Three variants: Simple Card, Profile Card, Music Player Card
 */

// ==================== SIMPLE CARD ====================
export const SimpleCard = ({ title, subtitle, description, image }) => {
    return (
        <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4">
                <View style={applyTw('gap-1')}>
                    <Text style={applyTw('text-xs uppercase font-bold text-gray-400')}>{subtitle}</Text>
                    <Text style={applyTw('text-lg font-bold text-white')}>{title}</Text>
                </View>
            </CardHeader>
            <CardContent className="py-2">
                <Image
                    source={{ uri: image }}
                    style={applyTw('w-full h-48 rounded-xl')}
                    resizeMode="cover"
                />
            </CardContent>
        </Card>
    );
};

// ==================== PROFILE CARD ====================
export const ProfileCard = ({
    avatar,
    name,
    username,
    bio,
    hashtag,
    following = 0,
    followers = 0
}) => {
    const [isFollowed, setIsFollowed] = useState(false);

    return (
        <Card className="max-w-full">
            <CardHeader className="justify-between">
                <View style={applyTw('flex-row items-center justify-between w-full')}>
                    <View style={applyTw('flex-row gap-3 items-center flex-1')}>
                        <Image
                            source={{ uri: avatar }}
                            style={applyTw('w-12 h-12 rounded-full border-2 border-white')}
                        />
                        <View style={applyTw('gap-1')}>
                            <Text style={applyTw('text-sm font-semibold text-white')}>{name}</Text>
                            <Text style={applyTw('text-sm text-gray-400')}>{username}</Text>
                        </View>
                    </View>
                    <Button
                        variant={isFollowed ? 'outline' : 'default'}
                        size="sm"
                        onPress={() => setIsFollowed(!isFollowed)}
                    >
                        {isFollowed ? 'Unfollow' : 'Follow'}
                    </Button>
                </View>
            </CardHeader>
            <CardContent className="px-4 py-0">
                <Text style={applyTw('text-sm text-gray-400 mb-2')}>{bio}</Text>
                <Text style={applyTw('text-sm text-gray-400')}>
                    {hashtag} <Text style={applyTw('text-base')}>💻</Text>
                </Text>
            </CardContent>
            <CardFooter className="gap-3 px-4">
                <View style={applyTw('flex-row gap-1')}>
                    <Text style={applyTw('font-semibold text-white text-sm')}>{following}</Text>
                    <Text style={applyTw('text-gray-400 text-sm')}>Following</Text>
                </View>
                <View style={applyTw('flex-row gap-1')}>
                    <Text style={applyTw('font-semibold text-white text-sm')}>{followers}</Text>
                    <Text style={applyTw('text-gray-400 text-sm')}>Followers</Text>
                </View>
            </CardFooter>
        </Card>
    );
};

// ==================== MUSIC PLAYER CARD ====================
export const MusicPlayerCard = ({
    albumCover,
    title = 'Frontend Radio',
    subtitle = 'Daily Mix',
    trackCount = '12 Tracks',
    currentTime = '1:23',
    totalTime = '4:32',
    progress = 33
}) => {
    const [liked, setLiked] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const HeartIcon = () => renderFlaticon(liked ? 'fi-sr-heart' : 'fi-rr-heart', {
        size: 20,
        color: liked ? '#ef4444' : '#9ca3af'
    });
    const RepeatIcon = () => renderFlaticon('fi-rr-refresh', { size: 18, color: '#9ca3af' });
    const PreviousIcon = () => renderFlaticon('fi-rr-rewind', { size: 20, color: '#fff' });
    const PlayPauseIcon = () => renderFlaticon(isPlaying ? 'fi-rr-pause' : 'fi-sr-play', {
        size: 32,
        color: '#fff'
    });
    const NextIcon = () => renderFlaticon('fi-rr-forward', { size: 20, color: '#fff' });
    const ShuffleIcon = () => renderFlaticon('fi-rr-shuffle', { size: 18, color: '#9ca3af' });

    return (
        <Card className="w-full bg-[#1a1a1a]/60">
            <CardContent className="p-4">
                <View style={applyTw('flex-row gap-4')}>
                    {/* Album Cover */}
                    <Image
                        source={{ uri: albumCover }}
                        style={applyTw('w-32 h-32 rounded-xl')}
                        resizeMode="cover"
                    />

                    {/* Player Controls */}
                    <View style={applyTw('flex-1 gap-2')}>
                        {/* Header */}
                        <View style={applyTw('flex-row justify-between items-start')}>
                            <View style={applyTw('gap-1 flex-1')}>
                                <Text style={applyTw('text-sm font-semibold text-white')}>{subtitle}</Text>
                                <Text style={applyTw('text-xs text-gray-400')}>{trackCount}</Text>
                                <Text style={applyTw('text-lg font-medium text-white mt-1')}>{title}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setLiked(!liked)}>
                                <HeartIcon />
                            </TouchableOpacity>
                        </View>

                        {/* Progress Bar */}
                        <View style={applyTw('gap-1 mt-2')}>
                            <View style={applyTw('h-1 bg-gray-700 rounded-full overflow-hidden')}>
                                <View
                                    style={[
                                        applyTw('h-full bg-white rounded-full'),
                                        { width: `${progress}%` }
                                    ]}
                                />
                            </View>
                            <View style={applyTw('flex-row justify-between')}>
                                <Text style={applyTw('text-xs text-white')}>{currentTime}</Text>
                                <Text style={applyTw('text-xs text-gray-400')}>{totalTime}</Text>
                            </View>
                        </View>

                        {/* Control Buttons */}
                        <View style={applyTw('flex-row items-center justify-center gap-2 mt-1')}>
                            <TouchableOpacity style={applyTw('p-2')}>
                                <RepeatIcon />
                            </TouchableOpacity>
                            <TouchableOpacity style={applyTw('p-2')}>
                                <PreviousIcon />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={applyTw('p-2')}
                                onPress={() => setIsPlaying(!isPlaying)}
                            >
                                <PlayPauseIcon />
                            </TouchableOpacity>
                            <TouchableOpacity style={applyTw('p-2')}>
                                <NextIcon />
                            </TouchableOpacity>
                            <TouchableOpacity style={applyTw('p-2')}>
                                <ShuffleIcon />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </CardContent>
        </Card>
    );
};

// ==================== DEMO COMPONENT ====================
export const MusicPlayerDemo = () => {
    return (
        <ScrollView
            style={applyTw('flex-1')}
            contentContainerStyle={applyTw('p-5 gap-8 pb-20')}
        >
            {/* Header */}
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Card Variants</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    Beautiful card components for different use cases.
                </Text>
            </View>

            {/* Simple Card */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Simple Card</Text>
                <SimpleCard
                    title="Frontend Radio"
                    subtitle="Daily Mix"
                    description="12 Tracks"
                    image="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400"
                />
            </View>

            {/* Profile Card */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Profile Card</Text>
                <ProfileCard
                    avatar="https://i.pravatar.cc/150?img=1"
                    name="Zoey Lang"
                    username="@zoeylang"
                    bio="Frontend developer and UI/UX enthusiast. Join me on this coding adventure!"
                    hashtag="#FrontendWithZoey"
                    following={4}
                    followers="97.1K"
                />
            </View>

            {/* Music Player Card */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Music Player Card</Text>
                <MusicPlayerCard
                    albumCover="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400"
                    title="Frontend Radio"
                    subtitle="Daily Mix"
                    trackCount="12 Tracks"
                    currentTime="1:23"
                    totalTime="4:32"
                    progress={33}
                />
            </View>

            {/* Compact Example */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>More Examples</Text>
                <View style={applyTw('gap-3')}>
                    <SimpleCard
                        title="Chill Vibes"
                        subtitle="Playlist"
                        description="24 Tracks"
                        image="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"
                    />
                    <ProfileCard
                        avatar="https://i.pravatar.cc/150?img=5"
                        name="Alex Chen"
                        username="@alexchen"
                        bio="Full-stack developer | React enthusiast | Coffee lover ☕"
                        hashtag="#CodeWithAlex"
                        following={127}
                        followers="45.2K"
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default MusicPlayerCard;
