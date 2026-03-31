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
  { id: 'article', name: 'Article', status: 'done' },
  { id: 'purchase-card', name: 'Purchase Card', status: 'done' },
  { id: 'profile-card', name: 'Profile Card', status: 'done' },
  { id: 'accordion', name: 'Accordion', status: 'done' },
  { id: 'alert', name: 'Alert', status: 'done' },
  { id: 'alert-dialog', name: 'Alert Dialog', status: 'done' },
  { id: 'aspect-ratio', name: 'Aspect Ratio', status: 'done' },
  { id: 'avatar', name: 'Avatar', status: 'done' },
  { id: 'ai-input', name: 'AI Input', status: 'done' },
  { id: 'badge', name: 'Badge', status: 'done' },
  { id: 'breadcrumb', name: 'Breadcrumb', status: 'done' },
  { id: 'button', name: 'Button', status: 'done' },
  { id: 'button-group', name: 'Button Group', status: 'done' },
  { id: 'calendar', name: 'Calendar', status: 'done' },
  { id: 'card', name: 'Card', status: 'done' },
  { id: 'carousel', name: 'Carousel', status: 'done' },
  { id: 'chart', name: 'Chart', status: 'done' },
  { id: 'checkbox', name: 'Checkbox', status: 'done' },
  { id: 'date-picker', name: 'Date Picker', status: 'done' },
  { id: 'dialog', name: 'Dialog', status: 'done' },
  { id: 'drawer', name: 'Drawer', status: 'done' },
  { id: 'dropdown-menu', name: 'Dropdown Menu', status: 'done' },
  { id: 'empty', name: 'Empty', status: 'done' },
  { id: 'field', name: 'Field', status: 'done' },
  { id: 'form', name: 'Form', status: 'done' },
  { id: 'hover-card', name: 'Hover Card', status: 'progress' },
  { id: 'input', name: 'Input', status: 'done' },
  { id: 'input-group', name: 'Input Group', status: 'done' },
  { id: 'input-otp', name: 'Input OTP', status: 'done' },
  { id: 'item', name: 'Item', status: 'done' },
  { id: 'kbd', name: 'Kbd', status: 'done' },
  { id: 'label', name: 'Label', status: 'done' },
  { id: 'menubar', name: 'Menubar', status: 'done' },
  { id: 'music-player', name: 'Music Player', status: 'done' },
  { id: 'navigation-menu', name: 'Navigation Menu', status: 'progress' },
  { id: 'pagination', name: 'Pagination', status: 'progress' },
  { id: 'popover', name: 'Popover', status: 'done' },
  { id: 'progress', name: 'Progress', status: 'done' },
  { id: 'radio-group', name: 'Radio Group', status: 'done' },
  { id: 'resizable', name: 'Resizable', status: 'progress' },
  { id: 'scroll-area', name: 'Scroll Area', status: 'progress' },
  { id: 'select', name: 'Select', status: 'progress' },
  { id: 'separator', name: 'Separator', status: 'progress' },
  { id: 'sheet', name: 'Sheet', status: 'progress' },
  { id: 'sidebar', name: 'Sidebar', status: 'progress' },
  { id: 'skeleton', name: 'Skeleton', status: 'progress' },
  { id: 'slider', name: 'Slider', status: 'progress' },
  { id: 'sonner', name: 'Sonner', status: 'progress' },
  { id: 'spinner', name: 'Spinner', status: 'done' },
  { id: 'streaming', name: 'Streaming', status: 'done' },
  { id: 'switch', name: 'Switch', status: 'done' },
  { id: 'table', name: 'Table', status: 'done' },
  { id: 'tabs', name: 'Tabs', status: 'done' },
  { id: 'textarea', name: 'Textarea', status: 'done' },
  { id: 'toast', name: 'Toast', status: 'progress' },
  { id: 'toggle', name: 'Toggle', status: 'progress' },
  { id: 'toggle-group', name: 'Toggle Group', status: 'progress' },
  { id: 'tooltip', name: 'Tooltip', status: 'progress' },
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
                'bg-[#111111] rounded-lg px-4 py-3 flex-row items-center justify-between mb-1 border border-[#2A2A2A]'
              )}
              onPress={() => onNavigate && onNavigate('component-detail', { componentId: component.id })}
              activeOpacity={0.7}>
              <View style={applyTw('flex-row items-center gap-3 flex-1')}>
                <Text style={applyTw('text-white text-base')}>
                  {component.name}
                </Text>
                {/* Status Badge */}
                <View style={applyTw(`px-2 py-0.5 rounded-full ${component.status === 'done' ? 'bg-green-500/20' : 'bg-gray-500/20'
                  }`)}>
                  <Text style={applyTw(`text-xs font-medium ${component.status === 'done' ? 'text-green-400' : 'text-gray-400'
                    }`)}>
                    {component.status === 'done' ? 'Done' : 'In Progress'}
                  </Text>
                </View>
              </View>
              <Text style={applyTw('text-gray-500 text-xl')}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
