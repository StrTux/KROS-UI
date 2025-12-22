import React, { useEffect } from 'react';
import { View, SafeAreaView, ScrollView, TouchableOpacity, Text, BackHandler } from 'react-native';
import { applyTw } from '../style/style';
import * as UIComponents from '../components/ui/index';

// Component mapping
const COMPONENT_MAP = {
  'accordion': UIComponents.AccordionDemo,
  'alert': UIComponents.AlertDemo,
  'alert-dialog': UIComponents.Alert_Dialog,
  'aspect-ratio': UIComponents.AspectRatio,
  'avatar': UIComponents.Avatar,
  'ai-input': UIComponents.AIInputDemo,
  'badge': UIComponents.BadgeDemo,
  'text': UIComponents.TextDemo,
  'breadcrumb': UIComponents.BreadcrumbDemo,
  'button': UIComponents.ButtonDemo,
  'button-group': UIComponents.ButtonGroupDemo,
  'calendar': UIComponents.CalendarDemo,
  'card': UIComponents.CardDemo,
  'carousel': UIComponents.CarouselDemo,
  'chart': UIComponents.ChartDemo,
  'checkbox': UIComponents.CheckboxDemo,
  'data-table': UIComponents.DataTableDemo,
  'date-picker': UIComponents.DatePickerDemo,
  'dialog': UIComponents.DialogDemo,
  'drawer': UIComponents.DrawerDemo,
  'dropdown-menu': UIComponents.DropdownMenuDemo,
  'empty': UIComponents.EmptyDemo,
  'field': UIComponents.FieldDemo,
  'form': UIComponents.FormDemo,
  'hover-card': UIComponents.HoverCardDemo,
  'input': UIComponents.InputDemo,
  'input-group': UIComponents.InputGroupDemo,
  'input-otp': UIComponents.InputOTPDemo,
  'item': UIComponents.ItemDemo,
  'popover': UIComponents.PopoverDemo,
  'progress': UIComponents.ProgressDemo,
  'radio-group': UIComponents.RadioGroupDemo,
  'switch': UIComponents.SwitchDemo,
  'table': UIComponents.TableDemo,
  'tabs': UIComponents.TabsDemo,
  'textarea': UIComponents.TextareaDemo,
  'music-player': UIComponents.MusicPlayerDemo,
  'spinner': UIComponents.SpinnerDemo,
  'streaming': UIComponents.StreamingDemo,
};

const ComponentDemo = ({ componentId, onNavigate }) => {
  const DemoComponent = COMPONENT_MAP[componentId];

  // Handle Android hardware back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (onNavigate) {
        onNavigate('home');
        return true; // Prevent default behavior (exit app)
      }
      return false;
    });

    return () => backHandler.remove();
  }, [onNavigate]);

  const handleBackPress = () => {
    if (onNavigate) {
      onNavigate('home');
    }
  };

  const renderComponentDemo = () => {
    if (DemoComponent) {
      return (
        <View style={applyTw('gap-3')}>
          <Text style={applyTw('text-white text-xl font-semibold mb-4')}>
            {componentId.charAt(0).toUpperCase() + componentId.slice(1)} Demo
          </Text>
          <DemoComponent />
        </View>
      );
    }
    return (
      <View style={applyTw('gap-3')}>
        <Text style={applyTw('text-white text-xl font-semibold')}>Component Demo</Text>
        <Text style={applyTw('text-gray-400 mt-2')}>
          Demo for "{componentId}" component is under development.
        </Text>
        <View style={applyTw('bg-[#111111] rounded-lg p-6 mt-4 border border-[#2A2A2A]')}>
          <Text style={applyTw('text-white')}>This component will be available soon!</Text>
          <Text style={applyTw('text-gray-500 mt-2 text-sm')}>
            You can add this component demo in src/components/ui/{componentId}.js
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={applyTw('flex-1 bg-black')}>
      {/* Header */}
      <View style={applyTw('px-5 py-4 flex-row items-center')}>
        <TouchableOpacity
          onPress={handleBackPress}
          style={applyTw('mr-4')}
          activeOpacity={0.7}
        >
          <Text style={applyTw('text-white text-2xl')}>←</Text>
        </TouchableOpacity>
        <Text style={applyTw('text-white text-xl font-semibold capitalize')}>
          {componentId}
        </Text>
      </View>
      {/* Content */}
      <ScrollView style={applyTw('flex-1 px-5 py-4')}>
        {renderComponentDemo()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ComponentDemo;
