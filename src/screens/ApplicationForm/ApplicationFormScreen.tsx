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

const ApplicationFormScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
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
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                <TextInput
                  placeholder="Name"
                  style={styles.input}
                  onChangeText={handleChange('name')}
                  value={values.name}
                />
                {touched.name && <Text>{errors.name}</Text>}

                <TextInput
                  placeholder="Email"
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  value={values.email}
                />
                {touched.email && <Text>{errors.email}</Text>}

                <TextInput
                  placeholder="Contact"
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={handleChange('contact')}
                  value={values.contact}
                />
                {touched.contact && <Text>{errors.contact}</Text>}

                <TextInput
                  placeholder="Why should we hire you?"
                  multiline
                  style={[styles.input, { height: 100 }]}
                  onChangeText={handleChange('reason')}
                  value={values.reason}
                />
                {touched.reason && <Text>{errors.reason}</Text>}

                <Pressable
                  style={styles.button}
                  onPress={handleSubmit as any}
                >
                  <Text style={styles.buttonText}>Submit</Text>
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
