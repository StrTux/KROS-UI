import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Pressable,
    TextInput,
    Share as RNShare,
    Alert,
} from 'react-native';
import { applyTw } from '../../style/style';

// Base Dialog Component
export const Dialog = ({ visible, onClose, children, transparent = true }) => {
    return (
        <Modal
            visible={visible}
            transparent={transparent}
            animationType="fade"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <Pressable
                style={applyTw('flex-1 bg-black/70 justify-center items-center px-4')}
                onPress={onClose}
            >
                <Pressable onPress={(e) => e.stopPropagation()}>
                    {children}
                </Pressable>
            </Pressable>
        </Modal>
    );
};

// Dialog Content Container
export const DialogContent = ({ children, className = '' }) => {
    return (
        <View
            style={applyTw(
                `bg-[#1A1A1A] rounded-2xl p-6 w-full max-w-md border border-[#2A2A2A] shadow-2xl ${className}`
            )}
        >
            {children}
        </View>
    );
};

// Dialog Header
export const DialogHeader = ({ children, className = '' }) => {
    return (
        <View style={applyTw(`mb-4 ${className}`)}>
            {children}
        </View>
    );
};

// Dialog Title
export const DialogTitle = ({ children, className = '' }) => {
    return (
        <Text style={applyTw(`text-white text-2xl font-bold ${className}`)}>
            {children}
        </Text>
    );
};

// Dialog Description
export const DialogDescription = ({ children, className = '' }) => {
    return (
        <Text style={applyTw(`text-gray-400 text-base mt-2 ${className}`)}>
            {children}
        </Text>
    );
};

// Dialog Footer
export const DialogFooter = ({ children, className = '' }) => {
    return (
        <View style={applyTw(`flex-row gap-3 mt-6 ${className}`)}>
            {children}
        </View>
    );
};

// Dialog Button
export const DialogButton = ({
    children,
    onPress,
    variant = 'primary',
    className = '',
}) => {
    const variantStyles = {
        primary: 'bg-blue-600 border-blue-500',
        secondary: 'bg-[#2A2A2A] border-[#3A3A3A]',
        danger: 'bg-red-600 border-red-500',
        success: 'bg-green-600 border-green-500',
    };

    return (
        <TouchableOpacity
            style={applyTw(
                `flex-1 py-3 px-4 rounded-xl border ${variantStyles[variant]} ${className}`
            )}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={applyTw('text-white text-center font-semibold text-base')}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

// ==================== DEMO COMPONENTS ====================

// 1. Share Dialog Demo
export const ShareDialog = () => {
    const [visible, setVisible] = useState(false);
    const [shareLink, setShareLink] = useState('https://github.com/your-repo/react-native-components');

    const handleShare = async () => {
        try {
            await RNShare.share({
                message: shareLink,
                url: shareLink,
                title: 'Share this link',
            });
            setVisible(false);
        } catch (error) {
            Alert.alert('Error', 'Failed to share');
        }
    };

    const handleCopy = () => {
        Alert.alert('Copied!', 'Link copied to clipboard');
        setVisible(false);
    };

    return (
        <View>
            <TouchableOpacity
                style={applyTw('bg-blue-600 py-3 px-6 rounded-xl border border-blue-500')}
                onPress={() => setVisible(true)}
                activeOpacity={0.8}
            >
                <Text style={applyTw('text-white text-center font-semibold text-base')}>
                    Open Share Dialog
                </Text>
            </TouchableOpacity>

            <Dialog visible={visible} onClose={() => setVisible(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Share Link</DialogTitle>
                        <DialogDescription>
                            Anyone who has this link will be able to view this content.
                        </DialogDescription>
                    </DialogHeader>

                    <View style={applyTw('bg-[#0A0A0A] rounded-lg p-3 border border-[#2A2A2A]')}>
                        <TextInput
                            style={applyTw('text-white text-sm font-regular')}
                            value={shareLink}
                            onChangeText={setShareLink}
                            editable={false}
                            selectTextOnFocus
                        />
                    </View>

                    <DialogFooter>
                        <DialogButton variant="secondary" onPress={handleCopy}>
                            Copy Link
                        </DialogButton>
                        <DialogButton variant="primary" onPress={handleShare}>
                            Share
                        </DialogButton>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </View>
    );
};

// 2. Simple Popup Dialog Demo
export const PopupDialog = () => {
    const [visible, setVisible] = useState(false);

    const handleConfirm = () => {
        Alert.alert('Success', 'Action confirmed!');
        setVisible(false);
    };

    return (
        <View>
            <TouchableOpacity
                style={applyTw('bg-purple-600 py-3 px-6 rounded-xl border border-purple-500')}
                onPress={() => setVisible(true)}
                activeOpacity={0.8}
            >
                <Text style={applyTw('text-white text-center font-semibold text-base')}>
                    Open Popup Dialog
                </Text>
            </TouchableOpacity>

            <Dialog visible={visible} onClose={() => setVisible(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Action</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to proceed with this action? This cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <DialogButton variant="secondary" onPress={() => setVisible(false)}>
                            Cancel
                        </DialogButton>
                        <DialogButton variant="danger" onPress={handleConfirm}>
                            Confirm
                        </DialogButton>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </View>
    );
};

// 3. Form Dialog Demo
export const FormDialog = () => {
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john@example.com');

    const handleSave = () => {
        Alert.alert('Saved!', `Name: ${name}\nEmail: ${email}`);
        setVisible(false);
    };

    return (
        <View>
            <TouchableOpacity
                style={applyTw('bg-green-600 py-3 px-6 rounded-xl border border-green-500')}
                onPress={() => setVisible(true)}
                activeOpacity={0.8}
            >
                <Text style={applyTw('text-white text-center font-semibold text-base')}>
                    Open Form Dialog
                </Text>
            </TouchableOpacity>

            <Dialog visible={visible} onClose={() => setVisible(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>

                    <View style={applyTw('gap-4')}>
                        <View>
                            <Text style={applyTw('text-gray-300 text-sm font-medium mb-2')}>Name</Text>
                            <TextInput
                                style={applyTw('bg-[#0A0A0A] text-white rounded-lg p-3 border border-[#2A2A2A] font-regular')}
                                value={name}
                                onChangeText={setName}
                                placeholder="Enter your name"
                                placeholderTextColor="#666"
                            />
                        </View>

                        <View>
                            <Text style={applyTw('text-gray-300 text-sm font-medium mb-2')}>Email</Text>
                            <TextInput
                                style={applyTw('bg-[#0A0A0A] text-white rounded-lg p-3 border border-[#2A2A2A] font-regular')}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Enter your email"
                                placeholderTextColor="#666"
                                keyboardType="email-address"
                            />
                        </View>
                    </View>

                    <DialogFooter>
                        <DialogButton variant="secondary" onPress={() => setVisible(false)}>
                            Cancel
                        </DialogButton>
                        <DialogButton variant="success" onPress={handleSave}>
                            Save Changes
                        </DialogButton>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </View>
    );
};

// Main Demo Component
export const DialogDemo = () => {
    return (
        <View style={applyTw('gap-4')}>
            <ShareDialog />
            <PopupDialog />
            <FormDialog />
        </View>
    );
};

export default DialogDemo;