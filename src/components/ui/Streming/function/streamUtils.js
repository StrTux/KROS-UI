/**
 * Stream Utilities
 * Detects stream type and capabilities
 */

export const StreamType = {
    MP4: 'mp4',
    HLS: 'hls',
    DASH: 'dash',
    MKV: 'mkv',
    LIVE: 'live',
    UNKNOWN: 'unknown'
};

export const AudioCodec = {
    EAC3: 'eac3',      // E-AC3 / Dolby Digital Plus
    AC3: 'ac3',        // AC3 / Dolby Digital
    AAC: 'aac',        // AAC
    MP3: 'mp3',        // MP3
    STANDARD: 'standard'
};

/**
 * Detect stream type from URL
 */
export const detectStreamType = (url) => {
    if (!url) return StreamType.UNKNOWN;

    const lowerUrl = url.toLowerCase();

    if (lowerUrl.includes('.m3u8')) return StreamType.HLS;
    if (lowerUrl.includes('.mpd')) return StreamType.DASH;
    if (lowerUrl.includes('.mkv')) return StreamType.MKV;
    if (lowerUrl.includes('.mp4')) return StreamType.MP4;
    if (lowerUrl.includes('live') || lowerUrl.includes('stream')) return StreamType.LIVE;

    return StreamType.UNKNOWN;
};

/**
 * Detect audio codec from URL or filename
 * E-AC3/Dolby requires VLC player on Android
 */
export const detectAudioCodec = (url) => {
    if (!url) return AudioCodec.STANDARD;

    const lowerUrl = url.toLowerCase();

    // Check for E-AC3 / Dolby Atmos indicators
    if (lowerUrl.includes('eac3') ||
        lowerUrl.includes('e-ac3') ||
        lowerUrl.includes('ddp') ||     // Dolby Digital Plus
        lowerUrl.includes('dd+') ||
        lowerUrl.includes('dolby') ||
        lowerUrl.includes('atmos')) {
        return AudioCodec.EAC3;
    }

    if (lowerUrl.includes('ac3') || lowerUrl.includes('dd ')) {
        return AudioCodec.AC3;
    }

    if (lowerUrl.includes('aac')) {
        return AudioCodec.AAC;
    }

    return AudioCodec.STANDARD;
};

/**
 * Check if audio codec requires VLC player
 */
export const requiresVLCPlayer = (audioCodec) => {
    return audioCodec === AudioCodec.EAC3 || audioCodec === AudioCodec.AC3;
};

/**
 * Check if stream is seekable
 */
export const isStreamSeekable = (streamType) => {
    return ![StreamType.LIVE].includes(streamType);
};

/**
 * Format time from seconds to HH:MM:SS or MM:SS
 */
export const formatTime = (seconds = 0) => {
    if (!seconds || isNaN(seconds) || seconds < 0) return '00:00';

    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
        // Format as HH:MM:SS
        return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
        // Format as MM:SS
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
};
