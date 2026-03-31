import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    ScrollView,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';
// import { WebView } from 'react-native-webview'; // Static import removed to prevent crash if native module missing
import applyTw from '../../style/style.js';
// import applyTw2 from '../../style/_elst.js';
import blockchainArticlesData from './blockchain_articles.json';

// Safe WebView import
let WebView = null;
try {
    const WebViewModule = require('react-native-webview');
    WebView = WebViewModule.WebView || WebViewModule.default;
} catch (err) {
    console.warn('WebView module not found or failed to load:', err);
}

/* ----------------------------------------------------------------------------
  Helpers & Constants
-------------------------------------------------------------------------------*/
// Responsive utilities - using simplifed versions since external lib might not exist
const scaleSize = (size) => size;
const scaleFont = (size) => size;
const hp = (percent) => `${percent}%`; // Simple percentage for height
const wp = (percent) => `${percent}%`;

const DEFAULT_THUMB =
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=400&auto=format&fit=crop';

/* ----------------------------------------------------------------------------
  ArticleRow - memoized presentational component
-------------------------------------------------------------------------------*/
const ArticleRow = React.memo(function ArticleRow({ item, onPress }) {
    const thumbnailSize = scaleSize(72);

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onPress && onPress(item)}
            style={[applyTw('flex-row items-center'), { paddingVertical: scaleSize(12) }]}
        >
            <Image
                source={{ uri: item.thumbnail || DEFAULT_THUMB }}
                style={[
                    applyTw('rounded-lg mr-3'),
                    { width: thumbnailSize, height: thumbnailSize, minWidth: scaleSize(60), minHeight: scaleSize(60) },
                ]}
                resizeMode="cover"
            />
            <View style={applyTw('flex-1')}>
                <Text style={[applyTw('text-white font-semibold'), { fontSize: scaleFont(16) }]}>
                    {item.title}
                </Text>

                <View
                    style={[
                        applyTw('mt-2 self-start rounded-full bg-gray-800'),
                        { paddingHorizontal: scaleSize(12), paddingVertical: scaleSize(4) },
                    ]}
                >
                    <Text style={[applyTw('text-gray-300'), { fontSize: scaleFont(12) }]}>{item.tag || 'General'}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
});

/* ----------------------------------------------------------------------------
  ArticleModal - displays HTML via WebView with proper styling
-------------------------------------------------------------------------------*/
const createHTMLWithImage = (htmlContent, thumbnail, title) => {
    const imageHtml = thumbnail ? `<img src="${thumbnail}" alt="${title}" style="width:100%; height:auto; border-radius:12px; margin-bottom:16px;" />` : '';
    // Dark mode CSS for WebView
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style>
          body { font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial; padding:16px; color:#E0E0E0; background-color: #111; margin:0; line-height: 1.6; }
          img { max-width:100% !important; height:auto !important; display:block; margin:12px 0; border-radius:8px; }
          h1,h2,h3 { color:#F0F0F0; }
          p { margin: 10px 0; line-height:1.6; color: #CCCCCC; }
          table { width:100%; border-collapse:collapse; }
          table td, table th { border:1px solid #444; padding:8px; }
          a { color:#2E8CA5; text-decoration:none; }
          .hero-image { width:100%; border-radius:12px; margin-bottom:16px; }
        </style>
      </head>
      <body>
        ${imageHtml}
        ${htmlContent || '<p>No content available</p>'}
      </body>
    </html>
    `;
};

function ArticleModal({ article, onClose }) {
    if (!article) return null;

    const html = typeof article.content === 'string' && article.content.includes('<') ? article.content : null;
    const heroImage = article.headerImage || article.thumbnail || DEFAULT_THUMB;

    return (
        <Modal visible={!!article} animationType="slide" onRequestClose={onClose}>
            <SafeAreaView style={applyTw('flex-1 bg-[#111]')}>
                {/* Header with Back/Close */}
                <View style={[applyTw('flex-row items-center justify-between bg-[#111]'), { paddingHorizontal: scaleSize(16), paddingVertical: scaleSize(12), borderBottomWidth: 1, borderBottomColor: '#333' }]}>
                    <Text style={[applyTw('text-white font-medium'), { fontSize: scaleFont(16) }]}>Article</Text>
                    <TouchableOpacity onPress={onClose} style={[applyTw('bg-[#333] rounded-full'), { paddingHorizontal: scaleSize(16), paddingVertical: scaleSize(8) }]}>
                        <Text style={[applyTw('text-white font-semibold'), { fontSize: scaleFont(14) }]}>Close</Text>
                    </TouchableOpacity>
                </View>

                {/* Content with Image at Top */}
                {html && WebView ? (
                    <WebView
                        source={{ html: createHTMLWithImage(html, heroImage, article.title) }}
                        style={{ flex: 1, backgroundColor: 'transparent' }}
                        containerStyle={{ backgroundColor: '#111' }}
                        startInLoadingState
                        javaScriptEnabled
                        domStorageEnabled
                        renderLoading={() => (
                            <View style={[applyTw('flex-1 justify-center items-center'), { minHeight: hp(50) }]}>
                                <ActivityIndicator size="large" color="#2E8CA5" />
                                <Text style={[applyTw('text-gray-500 mt-4'), { fontSize: scaleFont(14) }]}>Loading content...</Text>
                            </View>
                        )}
                    />
                ) : (
                    <ScrollView contentContainerStyle={[applyTw('pb-10'), { paddingHorizontal: scaleSize(16), paddingTop: scaleSize(16) }]} showsVerticalScrollIndicator={false}>
                        {/* Thumbnail Image at Top */}
                        {heroImage && (
                            <Image
                                source={{ uri: heroImage }}
                                style={[
                                    applyTw('w-full rounded-xl mb-4'),
                                    { height: 200, minHeight: scaleSize(180) }, // Fixed height for hero
                                ]}
                                resizeMode="cover"
                            />
                        )}

                        {/* Title */}
                        <Text style={[applyTw('font-bold text-white'), { fontSize: scaleFont(22), lineHeight: scaleFont(30) }]}>
                            {article.title}
                        </Text>

                        {/* Tag */}
                        {article.tag && (
                            <View style={[applyTw('bg-[#333] self-start mt-3 rounded-full'), { paddingHorizontal: scaleSize(12), paddingVertical: scaleSize(6) }]}>
                                <Text style={[applyTw('text-gray-300'), { fontSize: scaleFont(12) }]}>{article.tag}</Text>
                            </View>
                        )}

                        {/* Divider */}
                        <View style={[applyTw('border-b border-gray-800 my-4'), { borderBottomWidth: 1 }]} />

                        {/* Content */}
                        <Text style={[applyTw('text-gray-400 leading-relaxed'), { fontSize: scaleFont(15), lineHeight: scaleFont(24) }]}>
                            {typeof article.content === 'string' ? article.content : article.description || 'No content available'}
                        </Text>
                    </ScrollView>
                )}
            </SafeAreaView>
        </Modal>
    );
}

/* ----------------------------------------------------------------------------
  Main Screen: Article
  - Loads articles from local JSON file
-------------------------------------------------------------------------------*/
export function Article() {
    const [openArticle, setOpenArticle] = useState(null);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load articles from JSON on mount
    useEffect(() => {
        let isMounted = true;
        try {
            if (isMounted && Array.isArray(blockchainArticlesData)) {
                setArticles(blockchainArticlesData);
            }
        } catch (err) {
            console.error('Error loading articles:', err);
        } finally {
            if (isMounted) setLoading(false);
        }
        return () => { isMounted = false; };
    }, []);

    const openHandler = useCallback((article) => setOpenArticle(article), []);
    const closeHandler = useCallback(() => setOpenArticle(null), []);

    const memoArticles = useMemo(() => articles, [articles]);

    if (loading) {
        return (
            <View style={[applyTw('pt-2 pb-6 bg-[#111] justify-center items-center'), { paddingHorizontal: scaleSize(16), minHeight: hp(20) }]}>
                <ActivityIndicator size="large" color="#2E8CA5" />
                <Text style={[applyTw('text-gray-500 mt-4'), { fontSize: scaleFont(14) }]}>Loading Articles...</Text>
            </View>
        );
    }

    if (!memoArticles.length) {
        return (
            <View style={[applyTw('pt-2 pb-6 bg-[#111]'), { paddingHorizontal: scaleSize(16) }]}>
                <View style={[applyTw('border-b border-dashed border-gray-700 mb-2'), { borderBottomWidth: scaleSize(1) }]} />
                <Text style={[applyTw('text-gray-500 text-center py-8'), { fontSize: scaleFont(14) }]}>No articles available at the moment.</Text>
            </View>
        );
    }

    return (
        <View style={[applyTw('pt-2 pb-6 bg-[#111]  border-white border-2 rounded-xl'), { paddingHorizontal: scaleSize(16) }]}>
            <View style={[applyTw('border-b border-dashed border-gray-700 mb-2'), { borderBottomWidth: scaleSize(1) }]} />
            {memoArticles.map((a, idx) => (
                <View key={a.id}>
                    <ArticleRow item={a} onPress={() => openHandler(a)} />
                    {idx !== memoArticles.length - 1 && <View style={[applyTw('border-b border-dashed border-gray-700'), { borderBottomWidth: scaleSize(1) }]} />}
                </View>
            ))}

            <ArticleModal article={openArticle} onClose={closeHandler} />
        </View>
    );
}

export default Article;
