import React from 'react';
import { View, Image, SafeAreaView, ScrollView, Text } from 'react-native';
import { applyTw } from '../../style/style';

const Avatar = () => {
  return (
    <SafeAreaView style={applyTw('flex-1 bg-black')}>
      <ScrollView 
        style={applyTw('flex-1 px-6')} 
        showsVerticalScrollIndicator={false}>
        
        <View style={applyTw('pb-6')}>
          
          {/* Main Demo Container */}
          <View style={applyTw('flex-1 flex-col items-center justify-center py-8')}>
            <View style={applyTw('flex-row flex-wrap gap-12')}>
              
              {/* Avatar 1 - Circular */}
              <View style={applyTw('relative flex shrink-0 overflow-hidden border-2 border-black')}>
                <Image
                  source={{ uri: 'https://github.com/mrzachnugent.png' }}
                  style={[
                    applyTw('w-8 h-8 rounded-full'),
                    { aspectRatio: 1 }
                  ]}
                  resizeMode="cover"
                />
              </View>

              {/* Avatar 2 - Rounded Square */}
              <View style={applyTw('relative flex shrink-0 overflow-hidden border-2 border-black')}>
                <Image
                  source={{ uri: 'https://github.com/shadcn.png' }}
                  style={[
                    applyTw('w-8 h-8 rounded-lg'),
                    { aspectRatio: 1 }
                  ]}
                  resizeMode="cover"
                />
              </View>

              {/* Avatar Group - Overlapping */}
              <View style={applyTw('flex-row')}>
                
                <View style={[applyTw('relative flex shrink-0 overflow-hidden rounded-full border-2 border-black'), { marginRight: -8 }]}>
                  <Image
                    source={{ uri: 'https://github.com/mrzachnugent.png' }}
                    style={[
                      applyTw('w-8 h-8 rounded-full'),
                      { aspectRatio: 1 }
                    ]}
                    resizeMode="cover"
                  />
                </View>

                <View style={[applyTw('relative flex shrink-0 overflow-hidden rounded-full border-2 border-black'), { marginRight: -8 }]}>
                  <Image
                    source={{ uri: 'https://github.com/leerob.png' }}
                    style={[
                      applyTw('w-8 h-8 rounded-full'),
                      { aspectRatio: 1 }
                    ]}
                    resizeMode="cover"
                  />
                </View>

                <View style={applyTw('relative flex shrink-0 overflow-hidden rounded-full border-2 border-black')}>
                  <Image
                    source={{ uri: 'https://github.com/evilrabbit.png' }}
                    style={[
                      applyTw('w-8 h-8 rounded-full'),
                      { aspectRatio: 1 }
                    ]}
                    resizeMode="cover"
                  />
                </View>

              </View>

            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Avatar;
