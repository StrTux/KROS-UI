import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { applyTw } from '../style/style';

const components = [
  { id: 'accordion', name: 'Accordion' }, // done 
  { id: 'alert', name: 'Alert' },// done
  { id: 'alert-dialog', name: 'Alert Dialog' }, //  done 
  { id: 'aspect-ratio', name: 'Aspect Ratio' }, //  done 
  { id: 'avatar', name: 'Avatar' },// done
  { id: 'ai-input', name: 'AI Input' }, // NEW - Chat input with voice
  { id: 'badge', name: 'Badge' },
  { id: 'breadcrumb', name: 'Breadcrumb' },
  { id: 'button', name: 'Button' },
  { id: 'button-group', name: 'Button Group' },
  { id: 'calendar', name: 'Calendar' },
  { id: 'card', name: 'Card' },
  { id: 'carousel', name: 'Carousel' },
  { id: 'chart', name: 'Chart' },
  { id: 'checkbox', name: 'Checkbox' },
  { id: 'data-table', name: 'Data Table' },
  { id: 'date-picker', name: 'Date Picker' },
  { id: 'dialog', name: 'Dialog' },
  { id: 'drawer', name: 'Drawer' },
  { id: 'dropdown-menu', name: 'Dropdown Menu' },
  { id: 'empty', name: 'Empty' },
  { id: 'field', name: 'Field' },
  { id: 'form', name: 'Form' },
  { id: 'hover-card', name: 'Hover Card' },
  { id: 'input', name: 'Input' },
  { id: 'input-group', name: 'Input Group' },
  { id: 'input-otp', name: 'Input OTP' },
  { id: 'item', name: 'Item' },
  { id: 'kbd', name: 'Kbd' },
  { id: 'label', name: 'Label' },
  { id: 'menubar', name: 'Menubar' },
  { id: 'navigation-menu', name: 'Navigation Menu' },
  { id: 'pagination', name: 'Pagination' },
  { id: 'popover', name: 'Popover' },
  { id: 'progress', name: 'Progress' },
  { id: 'radio-group', name: 'Radio Group' },
  { id: 'resizable', name: 'Resizable' },
  { id: 'scroll-area', name: 'Scroll Area' },
  { id: 'select', name: 'Select' },
  { id: 'separator', name: 'Separator' },
  { id: 'sheet', name: 'Sheet' },
  { id: 'sidebar', name: 'Sidebar' },
  { id: 'skeleton', name: 'Skeleton' },
  { id: 'slider', name: 'Slider' },
  { id: 'sonner', name: 'Sonner' },
  { id: 'spinner', name: 'Spinner' },
  { id: 'switch', name: 'Switch' },
  { id: 'table', name: 'Table' },
  { id: 'tabs', name: 'Tabs' },
  { id: 'textarea', name: 'Textarea' },
  { id: 'toast', name: 'Toast' },
  { id: 'toggle', name: 'Toggle' },
  { id: 'toggle-group', name: 'Toggle Group' },
  { id: 'tooltip', name: 'Tooltip' },
];


const HomeScreen = ({ onNavigate }) => {

  return (
    <SafeAreaView style={applyTw('flex-1 bg-black')}>
      {/* Header */}
      <View style={applyTw('px-5 py-3')}>
        <Text style={applyTw('text-white text-2xl font-semibold')}>
          Showcase
        </Text>
      </View>

      {/* Search Bar */}
      <View style={applyTw('m-2 p-4 h-[5rem]')}>
        <View style={applyTw('bg-[#111111] p-1 rounded-lg border border-[#2A2A2A]')}>
          <TextInput
            placeholder="Components"
            placeholderTextColor="#6b7280"
            style={applyTw('text-white text-sm')}
            editable={false}
          />
        </View>
      </View>

      {/* Components List */}
      <ScrollView
        style={applyTw('flex-1 px-6  p-2 ')}
        showsVerticalScrollIndicator={false}>
        <View style={applyTw('pb-2  p-4 border border-[#262626] rounded-lg')}>
          {components.map((component) => (
            <TouchableOpacity
              key={component.id}
              style={applyTw(
                'bg-[#111111] rounded-lg px-4 py-2 flex-row items-center justify-between mb-1 border border-[#2A2A2A]'
              )}
              onPress={() => onNavigate && onNavigate('component-detail', { componentId: component.id })}
              activeOpacity={0.7}>
              <Text style={applyTw('text-white text-base')}>
                {component.name}
              </Text>
              <Text style={applyTw('text-gray-500 text-xl')}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
