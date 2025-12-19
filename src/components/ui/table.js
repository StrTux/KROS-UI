// ==================== TABLE ====================

import React from 'react';
import { View, ScrollView } from 'react-native';
import { applyTw } from '../../style/style';
import { Text } from './text';

/**
 * Table Component for React Native
 * Scrollable table with header, body, and footer support
 */

export const Table = ({ children, className = '', ...props }) => {
    return (
        <View style={applyTw(`w-full relative overflow-hidden ${className}`)} {...props}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={applyTw('w-full')}>
                    {children}
                </View>
            </ScrollView>
        </View>
    );
};

export const TableHeader = ({ children, className = '', ...props }) => {
    return (
        <View style={applyTw(`border-b border-[#333] ${className}`)} {...props}>
            {children}
        </View>
    );
};

export const TableBody = ({ children, className = '', ...props }) => {
    return (
        <View style={applyTw(className)} {...props}>
            {children}
        </View>
    );
};

export const TableFooter = ({ children, className = '', ...props }) => {
    return (
        <View style={applyTw(`border-t border-[#333] bg-[#111]/50 ${className}`)} {...props}>
            {children}
        </View>
    );
};

export const TableRow = ({ children, className = '', ...props }) => {
    return (
        <View style={applyTw(`flex-row border-b border-[#222] ${className}`)} {...props}>
            {children}
        </View>
    );
};

export const TableHead = ({ children, className = '', width, align = 'left', ...props }) => {
    const alignClass = align === 'right' ? 'items-end' : align === 'center' ? 'items-center' : 'items-start';

    return (
        <View
            style={[
                applyTw(`h-10 px-2 justify-center ${alignClass} ${className}`),
                width ? { width } : { flex: 1 }
            ]}
            {...props}
        >
            <Text style={applyTw('text-white font-medium text-sm')}>{children}</Text>
        </View>
    );
};

export const TableCell = ({ children, className = '', width, align = 'left', ...props }) => {
    const alignClass = align === 'right' ? 'items-end' : align === 'center' ? 'items-center' : 'items-start';

    return (
        <View
            style={[
                applyTw(`p-2 justify-center ${alignClass} ${className}`),
                width ? { width } : { flex: 1 }
            ]}
            {...props}
        >
            {typeof children === 'string' ? (
                <Text style={applyTw('text-gray-300 text-sm')}>{children}</Text>
            ) : (
                children
            )}
        </View>
    );
};

export const TableCaption = ({ children, className = '', ...props }) => {
    return (
        <View style={applyTw(`mt-4 ${className}`)} {...props}>
            <Text style={applyTw('text-gray-400 mb-4 text-sm text-center')}>{children}</Text>
        </View>
    );
};

// ==================== TABLE DEMO ====================

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
];

export const TableDemo = () => {
    return (
        <ScrollView
            style={applyTw('flex-1')}
            contentContainerStyle={applyTw('p-5 gap-8 pb-20')}
        >
            {/* Header */}
            <View style={applyTw('gap-2')}>
                <Text style={applyTw('text-white text-3xl font-bold')}>Table</Text>
                <Text style={applyTw('text-gray-400 text-base')}>
                    A responsive table component for displaying data.
                </Text>
            </View>

            {/* Basic Table */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Invoice Table</Text>
                <View style={applyTw('bg-[#111] rounded-lg border border-[#222] overflow-hidden')}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead width={100}>Invoice</TableHead>
                                <TableHead width={100}>Status</TableHead>
                                <TableHead width={120}>Method</TableHead>
                                <TableHead width={100} align="right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.invoice}>
                                    <TableCell width={100}>
                                        <Text style={applyTw('text-white font-medium text-sm')}>
                                            {invoice.invoice}
                                        </Text>
                                    </TableCell>
                                    <TableCell width={100}>
                                        <View style={applyTw(`px-2 py-1 rounded-full ${invoice.paymentStatus === 'Paid' ? 'bg-green-500/20' :
                                            invoice.paymentStatus === 'Pending' ? 'bg-yellow-500/20' :
                                                'bg-red-500/20'
                                            }`)}>
                                            <Text style={applyTw(`text-xs font-medium ${invoice.paymentStatus === 'Paid' ? 'text-green-400' :
                                                invoice.paymentStatus === 'Pending' ? 'text-yellow-400' :
                                                    'text-red-400'
                                                }`)}>
                                                {invoice.paymentStatus}
                                            </Text>
                                        </View>
                                    </TableCell>
                                    <TableCell width={120}>{invoice.paymentMethod}</TableCell>
                                    <TableCell width={100} align="right">
                                        <Text style={applyTw('text-white font-medium text-sm')}>
                                            {invoice.totalAmount}
                                        </Text>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow className="border-0">
                                <TableCell width={320}>
                                    <Text style={applyTw('text-white font-semibold')}>Total</Text>
                                </TableCell>
                                <TableCell width={100} align="right">
                                    <Text style={applyTw('text-white font-semibold')}>$2,500.00</Text>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                </View>
            </View>

            {/* Simple Table */}
            <View style={applyTw('gap-4')}>
                <Text style={applyTw('text-white text-xl font-semibold')}>Simple Table</Text>
                <View style={applyTw('bg-[#111] rounded-lg border border-[#222] overflow-hidden')}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>John Doe</TableCell>
                                <TableCell>john@example.com</TableCell>
                                <TableCell>Admin</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Jane Smith</TableCell>
                                <TableCell>jane@example.com</TableCell>
                                <TableCell>User</TableCell>
                            </TableRow>
                            <TableRow className="border-0">
                                <TableCell>Bob Johnson</TableCell>
                                <TableCell>bob@example.com</TableCell>
                                <TableCell>User</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </View>
            </View>
        </ScrollView>
    );
};

export default Table;
