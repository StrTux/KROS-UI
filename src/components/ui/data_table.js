import React, { useState, useMemo } from 'react';
import { View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { applyTw } from '../../style/style';
import { Text } from './text';
import { Button } from './button';
import { Checkbox } from './checkbox';
import { renderFlaticon } from '../../functions/iconUtils';

// Mock Data
const initialData = [
    { id: "m5gr84i9", amount: 316, status: "success", email: "ken99@example.com" },
    { id: "3u1reuv4", amount: 242, status: "success", email: "Abe45@example.com" },
    { id: "derv1ws0", amount: 837, status: "processing", email: "Monserrat44@example.com" },
    { id: "5kma53ae", amount: 874, status: "success", email: "Silas22@example.com" },
    { id: "bhqecj4p", amount: 721, status: "failed", email: "carmella@example.com" },
    // Add more mock data for pagination simulation
    { id: "ext1", amount: 150, status: "pending", email: "extra1@example.com" },
    { id: "ext2", amount: 450, status: "success", email: "extra2@example.com" },
];

const PAGE_SIZE = 5;

export const DataTableDemo = () => {
    const [data] = useState(initialData);
    const [sorting, setSorting] = useState({ key: null, direction: 'asc' }); // key: 'email' | 'amount'
    const [filter, setFilter] = useState('');
    const [rowSelection, setRowSelection] = useState({}); // { id: true }
    const [currentPage, setCurrentPage] = useState(0);

    // --- Logic ---

    // Filtering
    const filteredData = useMemo(() => {
        return data.filter(item =>
            item.email.toLowerCase().includes(filter.toLowerCase())
        );
    }, [data, filter]);

    // Sorting
    const sortedData = useMemo(() => {
        if (!sorting.key) return filteredData;

        return [...filteredData].sort((a, b) => {
            if (a[sorting.key] < b[sorting.key]) return sorting.direction === 'asc' ? -1 : 1;
            if (a[sorting.key] > b[sorting.key]) return sorting.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredData, sorting]);

    // Pagination
    const paginatedData = useMemo(() => {
        const start = currentPage * PAGE_SIZE;
        return sortedData.slice(start, start + PAGE_SIZE);
    }, [sortedData, currentPage]);

    const totalPages = Math.ceil(sortedData.length / PAGE_SIZE);

    // Selection
    const isAllSelected = paginatedData.length > 0 && paginatedData.every(row => rowSelection[row.id]);
    const isSomeSelected = paginatedData.some(row => rowSelection[row.id]) && !isAllSelected;

    const toggleAll = (checked) => {
        const newSelection = { ...rowSelection };
        paginatedData.forEach(row => {
            if (checked) {
                newSelection[row.id] = true;
            } else {
                delete newSelection[row.id];
            }
        });
        setRowSelection(newSelection);
    };

    const toggleRow = (id, checked) => {
        const newSelection = { ...rowSelection };
        if (checked) {
            newSelection[id] = true;
        } else {
            delete newSelection[id];
        }
        setRowSelection(newSelection);
    };

    const handleSort = (key) => {
        setSorting(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    // --- Render ---

    const renderHeader = () => (
        <View style={applyTw('flex-row items-center border-b border-[#333] py-3 px-2')}>
            {/* Checkbox */}
            <View style={applyTw('w-10 items-center')}>
                <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={toggleAll}
                />
            </View>

            {/* Status */}
            <View style={applyTw('flex-1')}>
                <Text style={applyTw('text-gray-400 text-sm font-medium')}>Status</Text>
            </View>

            {/* Email (Sortable) */}
            <TouchableOpacity
                style={applyTw('flex-2 flex-row items-center gap-1')}
                onPress={() => handleSort('email')}
            >
                <Text style={applyTw('text-gray-400 text-sm font-medium')}>Email</Text>
                {renderFlaticon('fi fi-rr-sort-alt', { size: 12, color: '#9ca3af' })}
            </TouchableOpacity>

            {/* Amount */}
            <View style={applyTw('flex-1 items-end')}>
                <Text style={applyTw('text-gray-400 text-sm font-medium')}>Amount</Text>
            </View>

            {/* Actions */}
            <View style={applyTw('w-10 items-center')}>
            </View>
        </View>
    );

    const renderRow = (item) => {
        const isSelected = !!rowSelection[item.id];
        return (
            <View key={item.id} style={applyTw(`flex-row items-center border-b border-[#333] py-4 px-2 ${isSelected ? 'bg-[#1e1e1e]' : ''}`)}>
                {/* Checkbox */}
                <View style={applyTw('w-10 items-center')}>
                    <Checkbox
                        checked={isSelected}
                        onCheckedChange={(val) => toggleRow(item.id, val)}
                    />
                </View>

                {/* Status */}
                <View style={applyTw('flex-1')}>
                    <Text style={applyTw('text-white text-sm capitalize')}>{item.status}</Text>
                </View>

                {/* Email */}
                <View style={applyTw('flex-2')}>
                    <Text style={applyTw('text-white text-sm lowercase')}>{item.email}</Text>
                </View>

                {/* Amount */}
                <View style={applyTw('flex-1 items-end')}>
                    <Text style={applyTw('text-white text-sm font-medium')}>
                        ${item.amount.toLocaleString()}
                    </Text>
                </View>

                {/* Actions */}
                <TouchableOpacity style={applyTw('w-10 items-center')}>
                    {renderFlaticon('fi fi-rr-menu-dots', { size: 16, color: '#fff' })}
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={applyTw('flex-1 bg-black p-4')}>
            <Text style={applyTw('text-white text-2xl font-bold mb-6')}>Payments</Text>

            {/* Filter */}
            <View style={applyTw('flex-row justify-between mb-4')}>
                <TextInput
                    placeholder="Filter emails..."
                    placeholderTextColor="#666"
                    value={filter}
                    onChangeText={setFilter}
                    style={applyTw('bg-[#111] border border-[#333] text-white rounded-md px-3 py-2 w-64 text-sm')}
                />
                <Button variant="outline" size="sm" style={applyTw('flex-row gap-2')}>
                    <Text style={applyTw('text-white')}>Columns</Text>
                    {renderFlaticon('fi fi-rs-angle-small-down', { size: 12, color: '#fff' })}
                </Button>
            </View>

            {/* Table */}
            <View style={applyTw('border border-[#333] rounded-md mb-4 overflow-hidden')}>
                {renderHeader()}
                {/* Replaced FlatList with map to deeply nested V-List error */}
                <View>
                    {paginatedData.length > 0 ? (
                        paginatedData.map(item => renderRow(item))
                    ) : (
                        <View style={applyTw('p-8 items-center')}>
                            <Text style={applyTw('text-gray-500')}>No results.</Text>
                        </View>
                    )}
                </View>
            </View>

            {/* Footer / Pagination */}
            <View style={applyTw('flex-row items-center justify-between')}>
                <Text style={applyTw('text-gray-400 text-sm')}>
                    {Object.keys(rowSelection).length} of {filteredData.length} row(s) selected
                </Text>

                <View style={applyTw('flex-row gap-2')}>
                    <TouchableOpacity
                        onPress={() => setCurrentPage(p => Math.max(0, p - 1))}
                        disabled={currentPage === 0}
                        style={applyTw(`px-3 py-1.5 rounded border ${currentPage === 0 ? 'border-[#222] opacity-50' : 'border-[#333] bg-[#111]'}`)}
                    >
                        <Text style={applyTw('text-white text-sm')}>Previous</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                        disabled={currentPage >= totalPages - 1}
                        style={applyTw(`px-3 py-1.5 rounded border ${currentPage >= totalPages - 1 ? 'border-[#222] opacity-50' : 'border-[#333] bg-[#111]'}`)}
                    >
                        <Text style={applyTw('text-white text-sm')}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default DataTableDemo;
