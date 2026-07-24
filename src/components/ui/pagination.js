import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { applyTw } from '../../style/_elst';
import { Text } from './text';
import { renderFlaticon } from '../../functions/iconUtils';

/**
 * Build a compact list of page numbers with ellipsis markers, e.g.
 * [1, 'ellipsis', 4, 5, 6, 'ellipsis', 10]
 */
const buildPageList = (current, total, siblingCount = 1) => {
    const totalNumbers = siblingCount * 2 + 5; // first, last, current, 2 siblings, 2 ellipses
    if (total <= totalNumbers) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(current - siblingCount, 1);
    const rightSibling = Math.min(current + siblingCount, total);

    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < total - 1;

    const pages = [1];
    if (showLeftEllipsis) pages.push('ellipsis-left');
    for (let i = leftSibling; i <= rightSibling; i++) {
        if (i !== 1 && i !== total) pages.push(i);
    }
    if (showRightEllipsis) pages.push('ellipsis-right');
    pages.push(total);
    return pages;
};

/**
 * Pagination — page navigation controls for paged content.
 *
 * @param {number} page - Current active page (1-indexed)
 * @param {number} totalPages - Total number of pages
 * @param {function} onPageChange - Callback with new page number
 */
export const Pagination = ({ page = 1, totalPages = 1, onPageChange, className = '' }) => {
    const pages = buildPageList(page, totalPages);

    const goTo = (p) => {
        if (p < 1 || p > totalPages || p === page) return;
        onPageChange?.(p);
    };

    return (
        <View style={applyTw(`flex-row items-center justify-center gap-1 ${className}`)}>
            <TouchableOpacity
                onPress={() => goTo(page - 1)}
                disabled={page === 1}
                activeOpacity={0.7}
                style={applyTw(`w-9 h-9 rounded-md items-center justify-center ${page === 1 ? 'opacity-40' : ''}`)}
            >
                {renderFlaticon('fi fi-rr-angle-left', { size: 16, color: '#fff' })}
            </TouchableOpacity>

            {pages.map((p, idx) =>
                typeof p === 'number' ? (
                    <TouchableOpacity
                        key={p}
                        onPress={() => goTo(p)}
                        activeOpacity={0.7}
                        style={applyTw(
                            `w-9 h-9 rounded-md items-center justify-center border ${p === page ? 'bg-white border-white' : 'bg-transparent border-transparent'
                            }`
                        )}
                    >
                        <Text style={applyTw(`text-sm font-medium ${p === page ? 'text-black' : 'text-gray-300'}`)}>
                            {p}
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <View key={p + idx} style={applyTw('w-9 h-9 items-center justify-center')}>
                        <Text style={applyTw('text-gray-500 text-sm')}>...</Text>
                    </View>
                )
            )}

            <TouchableOpacity
                onPress={() => goTo(page + 1)}
                disabled={page === totalPages}
                activeOpacity={0.7}
                style={applyTw(`w-9 h-9 rounded-md items-center justify-center ${page === totalPages ? 'opacity-40' : ''}`)}
            >
                {renderFlaticon('fi fi-rr-angle-right', { size: 16, color: '#fff' })}
            </TouchableOpacity>
        </View>
    );
};

// ==================== DEMO COMPONENT ====================

export const PaginationDemo = () => {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(6);

    return (
        <ScrollView style={applyTw('flex-1')} contentContainerStyle={applyTw('p-5 gap-8 pb-20')}>
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Pagination</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    Page navigation controls with previous/next and page numbers.
                </Text>
            </View>

            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Few Pages</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <Pagination page={page1} totalPages={5} onPageChange={setPage1} />
                    <Text style={applyTw('text-gray-500 text-xs text-center mt-3')}>Page {page1} of 5</Text>
                </View>
            </View>

            <View style={applyTw('gap-4 mb-8')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Many Pages (with ellipsis)</Text>
                <View style={applyTw('bg-[#111] p-4 rounded-lg border border-[#222]')}>
                    <Pagination page={page2} totalPages={20} onPageChange={setPage2} />
                    <Text style={applyTw('text-gray-500 text-xs text-center mt-3')}>Page {page2} of 20</Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default Pagination;
