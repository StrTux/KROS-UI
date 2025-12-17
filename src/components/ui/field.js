import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal, TouchableWithoutFeedback } from 'react-native';
import { Calendar } from './calendar';
import { applyTw } from '../../style/style';

// ==================== FIELD COMPONENTS ====================

// Field Container
export const Field = ({ children, className = '', orientation = 'vertical' }) => {
    const orientationStyles = {
        vertical: 'flex-col',
        horizontal: 'flex-row items-center gap-3',
    };

    return (
        <View style={applyTw(`${orientationStyles[orientation]} ${className}`)}>
            {children}
        </View>
    );
};

// Field Label
export const FieldLabel = ({ children, htmlFor, className = '', required = false }) => {
    return (
        <Text style={applyTw(`text-gray-300 text-sm font-medium mb-2 ${className}`)}>
            {children}
            {required && <Text style={applyTw('text-red-500')}> *</Text>}
        </Text>
    );
};

// Field Description
export const FieldDescription = ({ children, className = '' }) => {
    return (
        <Text style={applyTw(`text-gray-500 text-xs mt-1 ${className}`)}>
            {children}
        </Text>
    );
};

// Field Error
export const FieldError = ({ children, className = '' }) => {
    return (
        <Text style={applyTw(`text-red-500 text-xs mt-1 ${className}`)}>
            {children}
        </Text>
    );
};

// Field Group
export const FieldGroup = ({ children, className = '' }) => {
    return (
        <View style={applyTw(`gap-4 ${className}`)}>
            {children}
        </View>
    );
};

// Field Set
export const FieldSet = ({ children, className = '' }) => {
    return (
        <View style={applyTw(`gap-6 ${className}`)}>
            {children}
        </View>
    );
};

// Field Legend
export const FieldLegend = ({ children, className = '' }) => {
    return (
        <Text style={applyTw(`text-white text-lg font-bold mb-2 ${className}`)}>
            {children}
        </Text>
    );
};

// Field Separator
export const FieldSeparator = ({ className = '' }) => {
    return (
        <View style={applyTw(`h-px bg-[#2A2A2A] my-4 ${className}`)} />
    );
};

// Custom Input Component
export const FieldInput = ({
    value,
    onChangeText,
    placeholder,
    secureTextEntry = false,
    keyboardType = 'default',
    className = '',
    error = false,
    ...props
}) => {
    return (
        <TextInput
            style={applyTw(
                `bg-[#0A0A0A] text-white rounded-lg p-3 border ${error ? 'border-red-500' : 'border-[#2A2A2A]'
                } font-regular ${className}`
            )}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#666"
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            {...props}
        />
    );
};

// Custom Textarea Component
export const FieldTextarea = ({
    value,
    onChangeText,
    placeholder,
    rows = 4,
    className = '',
    error = false,
    ...props
}) => {
    return (
        <TextInput
            style={applyTw(
                `bg-[#0A0A0A] text-white rounded-lg p-3 border ${error ? 'border-red-500' : 'border-[#2A2A2A]'
                } font-regular ${className}`
            )}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#666"
            multiline
            numberOfLines={rows}
            textAlignVertical="top"
            {...props}
        />
    );
};

// Custom Checkbox Component
export const FieldCheckbox = ({ checked, onPress, className = '' }) => {
    return (
        <TouchableOpacity
            style={applyTw(
                `w-5 h-5 rounded border-2 items-center justify-center ${checked ? 'bg-white border-white' : 'bg-transparent border-gray-600'
                } ${className}`
            )}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {checked && (
                <Text style={applyTw('text-black text-xs font-bold')}>✓</Text>
            )}
        </TouchableOpacity>
    );
};

// Custom Select/Picker Component (simplified)
export const FieldSelect = ({
    value,
    onPress,
    placeholder,
    className = '',
}) => {
    return (
        <TouchableOpacity
            style={applyTw(
                `bg-[#0A0A0A] rounded-lg p-3 border border-[#2A2A2A] flex-row items-center justify-between ${className}`
            )}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={applyTw(`${value ? 'text-white' : 'text-gray-600'} font-regular`)}>
                {value || placeholder}
            </Text>
            <Text style={applyTw('text-gray-500')}>▼</Text>
        </TouchableOpacity>
    );
};

// ==================== DEMO COMPONENTS ====================

// 1. Basic Form Demo
export const BasicFormDemo = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleSubmit = () => {
        Alert.alert('Form Submitted', JSON.stringify(formData, null, 2));
    };

    return (
        <View style={applyTw('bg-[#1A1A1A] rounded-2xl p-6 border border-[#2A2A2A]')}>
            <FieldSet>
                <FieldLegend>Create Account</FieldLegend>
                <FieldDescription>
                    Fill in your details to create a new account.
                </FieldDescription>

                <FieldSeparator />

                <FieldGroup>
                    <Field>
                        <FieldLabel required>Username</FieldLabel>
                        <FieldInput
                            value={formData.username}
                            onChangeText={(text) => setFormData({ ...formData, username: text })}
                            placeholder="Enter your username"
                        />
                        <FieldDescription>
                            Choose a unique username for your account.
                        </FieldDescription>
                    </Field>

                    <Field>
                        <FieldLabel required>Email</FieldLabel>
                        <FieldInput
                            value={formData.email}
                            onChangeText={(text) => setFormData({ ...formData, email: text })}
                            placeholder="you@example.com"
                            keyboardType="email-address"
                        />
                    </Field>

                    <Field>
                        <FieldLabel required>Password</FieldLabel>
                        <FieldInput
                            value={formData.password}
                            onChangeText={(text) => setFormData({ ...formData, password: text })}
                            placeholder="••••••••"
                            secureTextEntry
                        />
                        <FieldDescription>
                            Must be at least 8 characters long.
                        </FieldDescription>
                    </Field>
                </FieldGroup>

                <View style={applyTw('flex-row gap-3 mt-2')}>
                    <TouchableOpacity
                        style={applyTw('flex-1 bg-white py-3 px-6 rounded-lg')}
                        onPress={handleSubmit}
                        activeOpacity={0.8}
                    >
                        <Text style={applyTw('text-black text-center font-semibold text-base')}>
                            Submit
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={applyTw('flex-1 bg-transparent py-3 px-6 rounded-lg border border-[#3A3A3A]')}
                        activeOpacity={0.8}
                    >
                        <Text style={applyTw('text-white text-center font-semibold text-base')}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </FieldSet>
        </View>
    );
};

// 2. Profile Form Demo
export const ProfileFormDemo = () => {
    const [profile, setProfile] = useState({
        name: 'John Doe',
        bio: 'Software developer passionate about React Native',
        location: 'San Francisco, CA',
    });

    return (
        <View style={applyTw('bg-[#1A1A1A] rounded-2xl p-6 border border-[#2A2A2A]')}>
            <FieldSet>
                <FieldLegend>Profile Information</FieldLegend>
                <FieldDescription>
                    Update your profile details here.
                </FieldDescription>

                <FieldSeparator />

                <FieldGroup>
                    <Field>
                        <FieldLabel>Full Name</FieldLabel>
                        <FieldInput
                            value={profile.name}
                            onChangeText={(text) => setProfile({ ...profile, name: text })}
                            placeholder="Enter your name"
                        />
                    </Field>

                    <Field>
                        <FieldLabel>Bio</FieldLabel>
                        <FieldTextarea
                            value={profile.bio}
                            onChangeText={(text) => setProfile({ ...profile, bio: text })}
                            placeholder="Tell us about yourself"
                            rows={3}
                        />
                        <FieldDescription>
                            Brief description for your profile (max 160 characters).
                        </FieldDescription>
                    </Field>

                    <Field>
                        <FieldLabel>Location</FieldLabel>
                        <FieldInput
                            value={profile.location}
                            onChangeText={(text) => setProfile({ ...profile, location: text })}
                            placeholder="City, Country"
                        />
                    </Field>
                </FieldGroup>

                <View style={applyTw('flex-row gap-3 mt-2')}>
                    <TouchableOpacity
                        style={applyTw('flex-1 bg-white py-3 px-6 rounded-lg')}
                        onPress={() => Alert.alert('Saved!', 'Profile updated successfully')}
                        activeOpacity={0.8}
                    >
                        <Text style={applyTw('text-black text-center font-semibold text-base')}>
                            Save Changes
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={applyTw('flex-1 bg-transparent py-3 px-6 rounded-lg border border-[#3A3A3A]')}
                        activeOpacity={0.8}
                    >
                        <Text style={applyTw('text-white text-center font-semibold text-base')}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </FieldSet>
        </View>
    );
};

// 3. Payment Form Demo - Professional UI
export const PaymentFormDemo = () => {
    const [payment, setPayment] = useState({
        cardName: 'Evil Rabbit',
        cardNumber: '1234 5678 9012 3456',
        month: 'MM',
        year: 'YYYY',
        cvv: '123',
    });
    const [sameAsShipping, setSameAsShipping] = useState(true);
    const [comments, setComments] = useState('');
    const [date, setDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Import DatePicker dynamically or assume it's available in context if needed
    // But since we are in the same file structure, we can import valid components.
    // However, to avoid circular deps if they exist, we usually keep imports at top.
    // For this demo, let's assume we can use the DatePicker from ../date_picker if we imported it at top.
    // Let's add the import to the top of file in a separate step if not present.
    // For now, implementing the logic triggered by field clicks.

    const handleDateChange = (newDate) => {
        if (newDate) {
            setDate(newDate);
            setPayment(prev => ({
                ...prev,
                month: (newDate.getMonth() + 1).toString().padStart(2, '0'),
                year: newDate.getFullYear().toString()
            }));
        }
        setShowDatePicker(false);
    };

    return (
        <View style={applyTw('bg-[#0A0A0A] rounded-2xl p-6 border border-[#1A1A1A]')}>
            {/* Invisible DatePicker trigger for logic */}
            {showDatePicker && (
                <View style={applyTw('absolute opacity-0 h-0 w-0')}>
                    {/* We need to render the actual DatePicker from existing components or 
                       just use the logic since the DatePicker in date_picker.js has its own trigger.
                       Actually, the user wants us to use the DatePicker component logic.
                       The existing DatePicker component wraps its own trigger. 
                       We will use a custom implementation here that reuses the Calendar logic 
                       or we can use the DatePicker component directly if we modify the UI.
                       
                       Better approach for this specific UI requirement:
                       We'll use a Modal with the Calendar component directly, 
                       similar to how DatePicker works but custom triggered by our fields.
                   */}
                    <Modal
                        transparent
                        visible={showDatePicker}
                        animationType="fade"
                        onRequestClose={() => setShowDatePicker(false)}
                    >
                        <TouchableWithoutFeedback onPress={() => setShowDatePicker(false)}>
                            <View style={applyTw('flex-1 bg-black/70 justify-center items-center')}>
                                <TouchableWithoutFeedback>
                                    <View style={applyTw('bg-[#111] rounded-xl border border-[#333] overflow-hidden shadow-2xl w-80')}>
                                        <Calendar
                                            selected={date}
                                            onSelect={handleDateChange}
                                            className="bg-[#111]"
                                        />
                                        <TouchableOpacity
                                            onPress={() => setShowDatePicker(false)}
                                            style={applyTw('p-3 bg-[#222] items-center border-t border-[#333]')}
                                        >
                                            <Text style={applyTw('text-white font-medium')}>Close</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>
            )}

            <FieldSet>
                <FieldLegend>Payment Method</FieldLegend>
                <FieldDescription>
                    All transactions are secure and encrypted
                </FieldDescription>

                <FieldSeparator />

                <FieldGroup>
                    <Field>
                        <FieldLabel>Name on Card</FieldLabel>
                        <FieldInput
                            value={payment.cardName}
                            onChangeText={(text) => setPayment({ ...payment, cardName: text })}
                            placeholder="Evil Rabbit"
                        />
                    </Field>

                    <Field>
                        <FieldLabel>Card Number</FieldLabel>
                        <FieldInput
                            value={payment.cardNumber}
                            onChangeText={(text) => setPayment({ ...payment, cardNumber: text })}
                            placeholder="1234 5678 9012 3456"
                            keyboardType="numeric"
                            maxLength={19}
                        />
                        <FieldDescription>
                            Enter your 16-digit card number
                        </FieldDescription>
                    </Field>

                    <View style={applyTw('flex-row gap-3')}>
                        <View style={applyTw('flex-1')}>
                            <Field>
                                <FieldLabel>Month</FieldLabel>
                                <TouchableOpacity
                                    onPress={() => setShowDatePicker(true)}
                                    activeOpacity={0.7}
                                    style={applyTw('bg-[#0A0A0A] rounded-lg h-[50px] px-3 border border-[#2A2A2A] flex-row items-center justify-between')}
                                >
                                    <Text style={applyTw(`${payment.month !== 'MM' ? 'text-white' : 'text-gray-600'} font-regular`)}>
                                        {payment.month}
                                    </Text>
                                    <Text style={applyTw('text-gray-500 text-xs')}>▼</Text>
                                </TouchableOpacity>
                            </Field>
                        </View>

                        <View style={applyTw('flex-1')}>
                            <Field>
                                <FieldLabel>Year</FieldLabel>
                                <TouchableOpacity
                                    onPress={() => setShowDatePicker(true)}
                                    activeOpacity={0.7}
                                    style={applyTw('bg-[#0A0A0A] rounded-lg h-[50px] px-3 border border-[#2A2A2A] flex-row items-center justify-between')}
                                >
                                    <Text style={applyTw(`${payment.year !== 'YYYY' ? 'text-white' : 'text-gray-600'} font-regular`)}>
                                        {payment.year}
                                    </Text>
                                    <Text style={applyTw('text-gray-500 text-xs')}>▼</Text>
                                </TouchableOpacity>
                            </Field>
                        </View>

                        <View style={applyTw('flex-1')}>
                            <Field>
                                <FieldLabel>CVV</FieldLabel>
                                <FieldInput
                                    value={payment.cvv}
                                    onChangeText={(text) => setPayment({ ...payment, cvv: text })}
                                    placeholder="123"
                                    keyboardType="numeric"
                                    maxLength={3}
                                    className="h-[50px]"
                                // Ensuring height matches the touchable opacity standard
                                />
                            </Field>
                        </View>
                    </View>
                </FieldGroup>

                <FieldSeparator />

                <FieldSet>
                    <FieldLegend>Billing Address</FieldLegend>
                    <FieldDescription>
                        The billing address associated with your payment method
                    </FieldDescription>

                    <Field orientation="horizontal" className="mt-4">
                        <FieldCheckbox
                            checked={sameAsShipping}
                            onPress={() => setSameAsShipping(!sameAsShipping)}
                        />
                        <Text style={applyTw('text-white text-sm font-regular ml-2')}>
                            Same as shipping address
                        </Text>
                    </Field>
                </FieldSet>

                <FieldSeparator />

                <Field>
                    <FieldLabel>Comments</FieldLabel>
                    <FieldTextarea
                        value={comments}
                        onChangeText={setComments}
                        placeholder="Add any additional comments"
                        rows={3}
                    />
                </Field>

                <View style={applyTw('flex-row gap-3 mt-4')}>
                    <TouchableOpacity
                        style={applyTw('flex-1 bg-white py-3 px-6 rounded-lg')}
                        onPress={() => Alert.alert('Processing', 'Payment is being processed...')}
                        activeOpacity={0.8}
                    >
                        <Text style={applyTw('text-black text-center font-semibold text-base')}>
                            Submit
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={applyTw('flex-1 bg-transparent py-3 px-6 rounded-lg border border-[#3A3A3A]')}
                        activeOpacity={0.8}
                    >
                        <Text style={applyTw('text-white text-center font-semibold text-base')}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </FieldSet>
        </View>
    );
};

// Main Demo Component
export const FieldDemo = () => {
    return (
        <View style={applyTw('gap-6')}>
            <BasicFormDemo />
            <ProfileFormDemo />
            <PaymentFormDemo />
        </View>
    );
};

// Export additional components
// FieldCheckbox and FieldSelect are already exported as named exports above

export default FieldDemo;
