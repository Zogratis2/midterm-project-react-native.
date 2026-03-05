import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Formik } from 'formik';
import { applicationValidationSchema } from '../../utils/validationSchema';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './ApplicationFormStyles';
import { useThemeContext } from '../../context/ThemeContext'; // ✅ import theme
import { useJobs } from '../../context/JobsContext'; // ⭐ 1. Import Jobs Context

const ApplicationFormScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { colors, isDark } = useThemeContext(); // ✅ get theme colors & isDark
  const { markJobAsApplied } = useJobs(); // ⭐ 2. Get the function from Context

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior="padding"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Formik
            initialValues={{ name: '', email: '', contact: '', reason: '' }}
            validationSchema={applicationValidationSchema}
            onSubmit={(values, { resetForm }) => {
              Alert.alert('Success', 'Application Submitted!', [
                {
                  text: 'Okay',
                  onPress: () => {
                    // ⭐ 3. Mark the specific job as applied before navigating away!
                    if (route.params?.job?.id) {
                      markJobAsApplied(route.params.job.id);
                    }

                    resetForm();
                    if (route.params?.fromSaved) {
                      navigation.reset({
                        index: 0,
                        routes: [{ name: 'JobFinder' }],
                      });
                    } else {
                      navigation.goBack();
                    }
                  },
                },
              ]);
            }}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View>
                <TextInput
                  placeholder="Name"
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.card,
                      color: colors.text,
                      borderColor: isDark ? '#fff' : '#000', // ✅ white in dark, black in light
                      borderWidth: 1,
                    },
                  ]}
                  onChangeText={handleChange('name')}
                  value={values.name}
                  placeholderTextColor={colors.text}
                />
                {touched.name && <Text style={{ color: colors.text }}>{errors.name}</Text>}

                <TextInput
                  placeholder="Email"
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.card,
                      color: colors.text,
                      borderColor: isDark ? '#fff' : '#000',
                      borderWidth: 1,
                    },
                  ]}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  placeholderTextColor={colors.text}
                />
                {touched.email && <Text style={{ color: colors.text }}>{errors.email}</Text>}

                <TextInput
                  placeholder="Contact"
                  keyboardType="numeric"
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.card,
                      color: colors.text,
                      borderColor: isDark ? '#fff' : '#000',
                      borderWidth: 1,
                    },
                  ]}
                  onChangeText={handleChange('contact')}
                  value={values.contact}
                  placeholderTextColor={colors.text}
                />
                {touched.contact && <Text style={{ color: colors.text }}>{errors.contact}</Text>}

                <TextInput
                  placeholder="Why should we hire you?"
                  multiline
                  style={[
                    styles.input,
                    { height: 100, backgroundColor: colors.card, color: colors.text, borderColor: isDark ? '#fff' : '#000', borderWidth: 1 },
                  ]}
                  onChangeText={handleChange('reason')}
                  value={values.reason}
                  placeholderTextColor={colors.text}
                />
                {touched.reason && <Text style={{ color: colors.text }}>{errors.reason}</Text>}

                <Pressable
                  style={[styles.button, { backgroundColor: '#28a745' }]} // ✅ green button stays same
                  onPress={handleSubmit as any}
                >
                  <Text style={[styles.buttonText, { color: '#fff' }]}>Submit</Text>
                </Pressable>
              </View>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ApplicationFormScreen;