import React from 'react';
import { View, Image, SafeAreaView } from 'react-native';
import { applyTw } from '../../style/style';

const AspectRatio = () => {
  return (
    <SafeAreaView style={applyTw('flex-1 bg-black')}>
      <View style={applyTw('flex-1 flex-col items-center justify-center')}>
        
        {/* Aspect Ratio Container */}
        <View style={applyTw('relative w-full overflow-hidden rounded-md ')}>
          
          {/* Image with Aspect Ratio */}
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1672758247442-82df22f5899e' }}
            style={[
              applyTw('w-full rounded-md'),
              { aspectRatio: 16 / 9 } // 1.77778 aspect ratio
            ]}
            resizeMode="cover"
          />
          
        </View>

      </View>
    </SafeAreaView>
  );
};

export default AspectRatio;
