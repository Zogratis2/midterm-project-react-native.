import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useThemeContext } from '../../context/ThemeContext';
import { useJobs } from '../../context/JobsContext';
import styles from './ApplicationFormStyles'; 

const ApplicationFormScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { colors } = useThemeContext();
  
  const { markJobAsApplied } = useJobs();
  const { job } = route.params;

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [whyHire, setWhyHire] = useState('');
  
  // Error state for validation
  const [errors, setErrors] = useState<{ 
    name?: string; 
    email?: string; 
    contact?: string; 
    whyHire?: string 
  }>({});

  const handleApply = () => {
    let newErrors: any = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }

    const digitCount = contact.replace(/\D/g, '').length; 
    if (!contact.trim()) {
      newErrors.contact = 'Contact number is required';
    } else if (digitCount < 10) {
      newErrors.contact = 'Contact number must be at least 10 digits';
    }
    
    if (!whyHire.trim()) {
      newErrors.whyHire = 'Please tell us why we should hire you';
    } else if (whyHire.trim().length < 20) {
      newErrors.whyHire = 'Please provide more detail (minimum 20 characters)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    markJobAsApplied(job.id);
    Alert.alert('Success', `Application submitted for ${job.title.split('(')[0].trim()}`);
    navigation.goBack();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* Header: Displays title, stripping out everything after parentheses */}
      <View style={styles.titleContainer}>
        <Text style={[styles.applyingForLabel, { color: colors.text }]}>Applying for:</Text>
        <Text style={[styles.jobTitle, { color: colors.text }]}>
          {job.title.split('(')[0].trim()}
        </Text>
      </View>

      {/* Name Field */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Name</Text>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: errors.name ? 'red' : colors.border || '#ccc' }]}
          placeholder="Your name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={(text) => {
            setName(text);
            if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
          }}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      {/* Email Field */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Email</Text>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: errors.email ? 'red' : colors.border || '#ccc' }]}
          placeholder="yourname@email.com"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
          }}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      {/* Contact Number Field */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Contact Number</Text>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: errors.contact ? 'red' : colors.border || '#ccc' }]}
          placeholder="e.g. 09123456789"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          value={contact}
          onChangeText={(text) => {
            setContact(text);
            if (errors.contact) setErrors(prev => ({ ...prev, contact: undefined }));
          }}
        />
        {errors.contact && <Text style={styles.errorText}>{errors.contact}</Text>}
      </View>

      {/* Why Hire You Field */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Why should we hire you?</Text>
        <TextInput
          style={[
            styles.input, 
            styles.textArea, 
            { color: colors.text, borderColor: errors.whyHire ? 'red' : colors.border || '#ccc' }
          ]}
          placeholder="Tell us about your strengths (Min. 20 characters)..."
          placeholderTextColor="#999"
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          value={whyHire}
          onChangeText={(text) => {
            setWhyHire(text);
            if (errors.whyHire) setErrors(prev => ({ ...prev, whyHire: undefined }));
          }}
        />
        {errors.whyHire && <Text style={styles.errorText}>{errors.whyHire}</Text>}
      </View>

      <Pressable 
        style={[styles.submitButton, { backgroundColor: colors.primary || '#28a745' }]} 
        onPress={handleApply}
      >
        <Text style={styles.submitButtonText}>Submit Application</Text>
      </Pressable>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default ApplicationFormScreen;