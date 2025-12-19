// ==================== TABS ====================

import React, { createContext, useContext, useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { applyTw } from '../../style/style';
import { Text } from './text';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
import { Input } from './input';
import { Button } from './button';
import { Label } from './label';

/**
 * Tabs Component for React Native
 * State-based tab navigation with content switching
 */

const TabsContext = createContext(null);

export const Tabs = ({ defaultValue, children, className = '', ...props }) => {
    const [activeTab, setActiveTab] = useState(defaultValue);

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <View style={applyTw(`flex gap-2 ${className}`)} {...props}>
                {children}
            </View>
        </TabsContext.Provider>
    );
};

export const TabsList = ({ children, className = '', ...props }) => {
    return (
        <View
            style={applyTw(`bg-[#18181B] flex-row items-center justify-start rounded-lg p-[3px] ${className}`)}
            {...props}
        >
            {children}
        </View>
    );
};

export const TabsTrigger = ({ value, children, className = '', ...props }) => {
    const { activeTab, setActiveTab } = useContext(TabsContext);
    const isActive = activeTab === value;

    return (
        <TouchableOpacity
            onPress={() => setActiveTab(value)}
            style={applyTw(`flex-1 h-8 px-3 py-1 rounded-md items-center justify-center ${isActive ? 'bg-[#27272A] border border-[#3F3F46]' : 'bg-transparent border border-transparent'
                } ${className}`)}
            {...props}
        >
            <Text style={applyTw(`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-400'}`)}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

export const TabsContent = ({ value, children, className = '', ...props }) => {
    const { activeTab } = useContext(TabsContext);

    if (activeTab !== value) return null;

    return (
        <View style={applyTw(`flex-1 ${className}`)} {...props}>
            {children}
        </View>
    );
};

// ==================== TABS DEMO ====================

export const TabsDemo = () => {
    const [accountData, setAccountData] = useState({
        name: 'Pedro Duarte',
        username: '@peduarte'
    });
    const [passwordData, setPasswordData] = useState({
        current: '',
        new: ''
    });

    return (
        <ScrollView
            style={applyTw('flex-1')}
            contentContainerStyle={applyTw('p-5 gap-8 pb-20')}
            keyboardShouldPersistTaps="handled"
        >
            {/* Header */}
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Tabs</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    A set of layered sections of content—known as tab panels—that are displayed one at a time.
                </Text>
            </View>

            {/* Main Example */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Example</Text>
                <View style={applyTw('w-full max-w-sm')}>
                    <Tabs defaultValue="account">
                        <TabsList>
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                        </TabsList>

                        <TabsContent value="account">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Account</CardTitle>
                                    <CardDescription>
                                        Make changes to your account here. Click save when you're done.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="gap-6">
                                    <View style={applyTw('gap-3')}>
                                        <Label>Name</Label>
                                        <Input
                                            value={accountData.name}
                                            onChangeText={(text) => setAccountData({ ...accountData, name: text })}
                                        />
                                    </View>
                                    <View style={applyTw('gap-3')}>
                                        <Label>Username</Label>
                                        <Input
                                            value={accountData.username}
                                            onChangeText={(text) => setAccountData({ ...accountData, username: text })}
                                        />
                                    </View>
                                </CardContent>
                                <CardFooter>
                                    <Button>Save changes</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        <TabsContent value="password">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Password</CardTitle>
                                    <CardDescription>
                                        Change your password here. After saving, you'll be logged out.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="gap-6">
                                    <View style={applyTw('gap-3')}>
                                        <Label>Current password</Label>
                                        <Input
                                            value={passwordData.current}
                                            onChangeText={(text) => setPasswordData({ ...passwordData, current: text })}
                                            secureTextEntry
                                        />
                                    </View>
                                    <View style={applyTw('gap-3')}>
                                        <Label>New password</Label>
                                        <Input
                                            value={passwordData.new}
                                            onChangeText={(text) => setPasswordData({ ...passwordData, new: text })}
                                            secureTextEntry
                                        />
                                    </View>
                                </CardContent>
                                <CardFooter>
                                    <Button>Save password</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </View>
            </View>

            {/* Simple Example */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Simple Tabs</Text>
                <View style={applyTw('w-full')}>
                    <Tabs defaultValue="overview">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="analytics">Analytics</TabsTrigger>
                            <TabsTrigger value="reports">Reports</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview">
                            <View style={applyTw('bg-[#111] p-6 rounded-lg border border-[#222] mt-2')}>
                                <Text style={applyTw('text-white text-lg font-semibold mb-2')}>Overview</Text>
                                <Text style={applyTw('text-gray-400')}>
                                    View your account overview and recent activity.
                                </Text>
                            </View>
                        </TabsContent>

                        <TabsContent value="analytics">
                            <View style={applyTw('bg-[#111] p-6 rounded-lg border border-[#222] mt-2')}>
                                <Text style={applyTw('text-white text-lg font-semibold mb-2')}>Analytics</Text>
                                <Text style={applyTw('text-gray-400')}>
                                    Track your performance metrics and insights.
                                </Text>
                            </View>
                        </TabsContent>

                        <TabsContent value="reports">
                            <View style={applyTw('bg-[#111] p-6 rounded-lg border border-[#222] mt-2')}>
                                <Text style={applyTw('text-white text-lg font-semibold mb-2')}>Reports</Text>
                                <Text style={applyTw('text-gray-400')}>
                                    Generate and download detailed reports.
                                </Text>
                            </View>
                        </TabsContent>
                    </Tabs>
                </View>
            </View>
        </ScrollView>
    );
};

export default Tabs;