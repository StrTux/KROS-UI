import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, SafeAreaView } from 'react-native';
import { applyTw } from '../../style/style';

const AlertDialogExample = () => {
  const [visible, setVisible] = useState(false);

  return (
    <SafeAreaView style={applyTw('flex-1 bg-black')}>
      {/* Main Content Area */}
      <View style={applyTw('flex-1 justify-center items-center px-4')}>
        
        {/* Show Alert Dialog Button */}
        <TouchableOpacity
          style={applyTw(
            'flex-row items-center justify-center gap-2 rounded-md border border-[#2A2A2A] bg-[#111111] shadow-sm px-4 py-2 h-10'
          )}
          onPress={() => setVisible(true)}
          activeOpacity={0.7}>
          <Text style={applyTw('text-white text-sm font-medium')}>
            Show Alert Dialog
          </Text>
        </TouchableOpacity>

      </View>

      {/* Alert Dialog Modal */}
      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}>
        {/* Backdrop */}
        <TouchableOpacity
          style={applyTw('flex-1 bg-black justify-center items-center')}
          activeOpacity={1}
          onPress={() => setVisible(false)}>
          
          {/* Alert Dialog Box */}
          <View
            style={applyTw('bg-[#111111] w-4/5 rounded-xl p-6 border border-[#2A2A2A]')}
            onStartShouldSetResponder={() => true}>
            
            {/* Title */}
            <Text style={applyTw('text-white text-lg font-semibold mb-2')}>
              Are you absolutely sure?
            </Text>

            {/* Message */}
            <Text style={applyTw('text-gray-400 text-sm mb-6')}>
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </Text>

            {/* Buttons */}
            <View style={applyTw('flex-row justify-end')}>
              {/* Cancel Button */}
              <TouchableOpacity
                style={applyTw('px-4 py-2 bg-[#2A2A2A] rounded-lg border border-[#3A3A3A] mr-2')}
                onPress={() => setVisible(false)}
                activeOpacity={0.7}>
                <Text style={applyTw('text-gray-300 text-sm')}>Cancel</Text>
              </TouchableOpacity>

              {/* Continue Button */}
              <TouchableOpacity
                style={applyTw('px-4 py-2 bg-red-600 rounded-lg')}
                onPress={() => {
                  console.log('Continue pressed!');
                  setVisible(false);
                }}
                activeOpacity={0.7}>
                <Text style={applyTw('text-white text-sm font-medium')}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default AlertDialogExample;
