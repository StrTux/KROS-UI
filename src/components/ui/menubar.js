import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    ScrollView,
    Pressable,
} from 'react-native';
import applyTw from '../../style/style';
import { renderFlaticon } from '../../functions/_fn';
import FlaticonIcons from '../../assest/icon/iconMap';

// Menubar Component
export function MenubarDemo() {
    const [activeMenu, setActiveMenu] = useState(null);
    const [checkboxStates, setCheckboxStates] = useState({
        bookmarks: false,
        fullUrls: false,
    });
    const [selectedProfile, setSelectedProfile] = useState('michael');

    const closeMenu = () => setActiveMenu(null);

    const toggleCheckbox = (key) => {
        setCheckboxStates(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <View style={applyTw('flex-1 bg-black items-center justify-center')}>
            {/* Menubar Container */}
            <View style={[
                applyTw('flex-row bg-black border border-gray-700 rounded-lg'),
                { padding: 4, gap: 4 }
            ]}>
                {/* File Menu */}
                <MenuTrigger
                    title="File"
                    isActive={activeMenu === 'file'}
                    onPress={() => setActiveMenu(activeMenu === 'file' ? null : 'file')}
                />

                {/* Edit Menu */}
                <MenuTrigger
                    title="Edit"
                    isActive={activeMenu === 'edit'}
                    onPress={() => setActiveMenu(activeMenu === 'edit' ? null : 'edit')}
                />

                {/* View Menu */}
                <MenuTrigger
                    title="View"
                    isActive={activeMenu === 'view'}
                    onPress={() => setActiveMenu(activeMenu === 'view' ? null : 'view')}
                />

                {/* Profiles Menu */}
                <MenuTrigger
                    title="Profiles"
                    isActive={activeMenu === 'profiles'}
                    onPress={() => setActiveMenu(activeMenu === 'profiles' ? null : 'profiles')}
                />
            </View>

            {/* File Menu Content */}
            <MenuModal visible={activeMenu === 'file'} onClose={closeMenu}>
                <MenuItem onPress={closeMenu}>
                    <Text style={applyTw('text-white')}>New Tab</Text>
                    <MenuShortcut>⌘T</MenuShortcut>
                </MenuItem>
                <MenuItem onPress={closeMenu}>
                    <Text style={applyTw('text-white')}>New Window</Text>
                    <MenuShortcut>⌘N</MenuShortcut>
                </MenuItem>
                <MenuItem disabled onPress={() => { }}>
                    <Text style={applyTw('text-gray-500')}>New Incognito Window</Text>
                </MenuItem>
                <MenuSeparator />
                <MenuItem onPress={closeMenu}>
                    <Text style={applyTw('text-white')}>Share</Text>
                    {renderFlaticon('angle-right', { size: 16, color: '#9CA3AF' }, FlaticonIcons)}
                </MenuItem>
                <MenuSeparator />
                <MenuItem onPress={closeMenu}>
                    <Text style={applyTw('text-white')}>Print...</Text>
                    <MenuShortcut>⌘P</MenuShortcut>
                </MenuItem>
            </MenuModal>

            {/* Edit Menu Content */}
            <MenuModal visible={activeMenu === 'edit'} onClose={closeMenu}>
                <MenuItem onPress={closeMenu}>
                    <Text style={applyTw('text-white')}>Undo</Text>
                    <MenuShortcut>⌘Z</MenuShortcut>
                </MenuItem>
                <MenuItem onPress={closeMenu}>
                    <Text style={applyTw('text-white')}>Redo</Text>
                    <MenuShortcut>⇧⌘Z</MenuShortcut>
                </MenuItem>
                <MenuSeparator />
                <MenuItem onPress={closeMenu}>
                    <Text style={applyTw('text-white')}>Find</Text>
                    {renderFlaticon('angle-right', { size: 16, color: '#9CA3AF' }, FlaticonIcons)}
                </MenuItem>
                <MenuSeparator />
                <MenuItem onPress={closeMenu}>
                    <Text style={applyTw('text-white')}>Cut</Text>
                </MenuItem>
                <MenuItem onPress={closeMenu}>
                    <Text style={applyTw('text-white')}>Copy</Text>
                </MenuItem>
                <MenuItem onPress={closeMenu}>
                    <Text style={applyTw('text-white')}>Paste</Text>
                </MenuItem>
            </MenuModal>

            {/* View Menu Content */}
            <MenuModal visible={activeMenu === 'view'} onClose={closeMenu}>
                <MenuCheckboxItem
                    checked={checkboxStates.bookmarks}
                    onPress={() => toggleCheckbox('bookmarks')}
                >
                    <Text style={applyTw('text-white')}>Always Show Bookmarks Bar</Text>
                </MenuCheckboxItem>
                <MenuCheckboxItem
                    checked={checkboxStates.fullUrls}
                    onPress={() => toggleCheckbox('fullUrls')}
                >
                    <Text style={applyTw('text-white')}>Always Show Full URLs</Text>
                </MenuCheckboxItem>
                <MenuSeparator />
                <MenuItem onPress={closeMenu}>
                    <Text style={applyTw('text-white ml-6')}>Reload</Text>
                    <MenuShortcut>⌘R</MenuShortcut>
                </MenuItem>
                <MenuItem disabled onPress={() => { }}>
                    <Text style={applyTw('text-gray-500 ml-6')}>Force Reload</Text>
                    <MenuShortcut disabled>⇧⌘R</MenuShortcut>
                </MenuItem>
                <MenuSeparator />
                <MenuItem onPress={closeMenu}>
                    <Text style={applyTw('text-white ml-6')}>Toggle Fullscreen</Text>
                </MenuItem>
                <MenuSeparator />
                <MenuItem onPress={closeMenu}>
                    <Text style={applyTw('text-white ml-6')}>Hide Sidebar</Text>
                </MenuItem>
            </MenuModal>

            {/* Profiles Menu Content */}
            <MenuModal visible={activeMenu === 'profiles'} onClose={closeMenu}>
                <MenuRadioItem
                    checked={selectedProfile === 'andy'}
                    onPress={() => setSelectedProfile('andy')}
                >
                    <Text style={applyTw('text-white')}>Andy</Text>
                </MenuRadioItem>
                <MenuRadioItem
                    checked={selectedProfile === 'michael'}
                    onPress={() => setSelectedProfile('michael')}
                >
                    <Text style={applyTw('text-white')}>Michael</Text>
                </MenuRadioItem>
                <MenuRadioItem
                    checked={selectedProfile === 'creed'}
                    onPress={() => setSelectedProfile('creed')}
                >
                    <Text style={applyTw('text-white')}>Creed</Text>
                </MenuRadioItem>
                <MenuSeparator />
                <MenuItem onPress={closeMenu}>
                    <Text style={applyTw('text-white ml-6')}>Edit...</Text>
                </MenuItem>
                <MenuSeparator />
                <MenuItem onPress={closeMenu}>
                    <Text style={applyTw('text-white ml-6')}>Add Profile...</Text>
                </MenuItem>
            </MenuModal>
        </View>
    );
}

// Menu Trigger Button
function MenuTrigger({ title, isActive, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={[
                applyTw(`rounded-md px-3 py-2 ${isActive ? 'bg-gray-800' : ''}`),
            ]}
        >
            <Text style={applyTw(`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-300'}`)}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

// Menu Modal
function MenuModal({ visible, onClose, children }) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable
                style={applyTw('flex-1')}
                onPress={onClose}
            >
                <View style={applyTw('flex-1 items-center')} pointerEvents="box-none">
                    <View style={[
                        applyTw('bg-[#1a1a1a] border border-gray-700 h-[10rem] rounded-lg mt-44 min-w-[14rem]'),
                        { padding: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 }
                    ]} pointerEvents="auto">
                        <ScrollView>
                            {children}
                        </ScrollView>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
}

// Menu Item
function MenuItem({ children, onPress, disabled }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.7}
            style={[
                applyTw(`rounded px-2 py-2 flex-row items-center justify-between ${disabled ? 'opacity-50' : ''}`),
            ]}
        >
            {children}
        </TouchableOpacity>
    );
}

// Menu Checkbox Item
function MenuCheckboxItem({ children, checked, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={applyTw('rounded px-2 py-2 flex-row items-center')}
        >
            <View style={applyTw('w-5 h-5 mr-2 items-center justify-center')}>
                {checked && renderFlaticon('check', { size: 16, color: '#FFFFFF' }, FlaticonIcons)}
            </View>
            {children}
        </TouchableOpacity>
    );
}

// Menu Radio Item
function MenuRadioItem({ children, checked, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={applyTw('rounded px-2 py-2 flex-row items-center')}
        >
            <View style={applyTw('w-5 h-5 mr-2 items-center justify-center')}>
                {checked && (
                    <View style={applyTw('w-2 h-2 bg-white rounded-full')} />
                )}
            </View>
            {children}
        </TouchableOpacity>
    );
}

// Menu Separator
function MenuSeparator() {
    return <View style={applyTw('h-px bg-gray-700 my-1')} />;
}

// Menu Shortcut
function MenuShortcut({ children, disabled }) {
    return (
        <Text style={applyTw(`text-xs ml-4 ${disabled ? 'text-gray-600' : 'text-gray-400'}`)}>
            {children}
        </Text>
    );
}

export default MenubarDemo;
