import React, { useState } from 'react'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Yup from 'yup'
import { Formik } from 'formik'

// Validation Schema
const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Minimum length is 4')
    .max(16, 'Maximum length is 16')
    .required('Password length is required'),
})

export default function App() {
  const [password, setPassword] = useState('')
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false)

  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setUpperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const createPassword = (characters: string, passwordLength: number) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      result += characters.charAt(randomIndex)
    }
    return result
  }

  const generatePassword = (passwordLength: number) => {
    let characterList = ''

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz'
    const digitChars = '0123456789'
    const specialChars = '!@#$%^&*()_+'

    if (upperCase) characterList += upperCaseChars
    if (lowerCase) characterList += lowerCaseChars
    if (numbers) characterList += digitChars
    if (symbols) characterList += specialChars

    if (characterList.length === 0) {
      Alert.alert('Error', 'Please select at least one character type')
      return
    }

    const passwordResult = createPassword(characterList, passwordLength)
    setPassword(passwordResult)
    setIsPasswordGenerated(true)
  }

  const resetPasswordState = () => {
    setPassword('')
    setIsPasswordGenerated(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumbers(false)
    setSymbols(false)
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>

          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={(values) =>
              generatePassword(Number(values.passwordLength))
            }
          >
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              values,
              errors,
              touched,
            }) => (
              <View style={{ flex: 1 }}>
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter password length"
                    keyboardType="numeric"
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    onBlur={handleBlur('passwordLength')}
                  />

                  {touched.passwordLength && errors.passwordLength && (
                    <Text style={styles.errorText}>
                      {errors.passwordLength}
                    </Text>
                  )}

                  {/* Lowercase */}
                  <View style={styles.switchRow}>
                    <Text style={styles.switchText}>
                      Include Lowercase
                    </Text>

                    <View style={styles.checkboxWrapper}>
                      <BouncyCheckbox
                        disableBuiltInState
                        isChecked={lowerCase}
                        fillColor="#ab2929"
                        onPress={(isChecked) => setLowerCase(isChecked)}
                        containerStyle={{ marginLeft: 0, padding: 0 }}
                      />
                    </View>
                  </View>

                  {/* Uppercase */}
                  <View style={styles.switchRow}>
                    <Text style={styles.switchText}>
                      Include Uppercase
                    </Text>

                    <View style={styles.checkboxWrapper}>
                      <BouncyCheckbox
                        disableBuiltInState
                        isChecked={upperCase}
                        fillColor="#0099ff"
                        onPress={(isChecked) => setUpperCase(isChecked)}
                        containerStyle={{ marginLeft: 0, padding: 0 }}
                      />
                    </View>
                  </View>

                  {/* Numbers */}
                  <View style={styles.switchRow}>
                    <Text style={styles.switchText}>
                      Include Numbers
                    </Text>

                    <View style={styles.checkboxWrapper}>
                      <BouncyCheckbox
                        disableBuiltInState
                        isChecked={numbers}
                        fillColor="#e100ff"
                        onPress={(isChecked) => setNumbers(isChecked)}
                        containerStyle={{ marginLeft: 0, padding: 0 }}
                      />
                    </View>
                  </View>

                  {/* Symbols */}
                  <View style={styles.switchRow}>
                    <Text style={styles.switchText}>
                      Include Symbols
                    </Text>

                    <View style={styles.checkboxWrapper}>
                      <BouncyCheckbox
                        disableBuiltInState
                        isChecked={symbols}
                        fillColor="#29AB87"
                        onPress={(isChecked) => setSymbols(isChecked)}
                        containerStyle={{ marginLeft: 0, padding: 0 }}
                      />
                    </View>
                  </View>

                  {isPasswordGenerated && (
                    <View style={styles.resultContainer}>
                      <Text style={styles.resultText}>
                        {password}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Buttons */}
                <View style={styles.buttonSection}>
                  <View style={styles.buttonContainer}>
                    <Button
                      title="Generate Password"
                      onPress={handleSubmit}
                    />
                  </View>

                  <View style={styles.buttonContainer}>
                    <Button
                      title="Reset"
                      color="red"
                      onPress={resetPasswordState}
                    />
                  </View>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 20,
    backgroundColor:'white'///added later
  },
  formContainer: {
    flex: 1,
    marginTop: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: '#999',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchText: {
    flex: 1,
    fontSize: 16,
  },
  checkboxWrapper: {
    alignItems: 'flex-end',
  },
  buttonSection: {
    marginTop: 'auto',
  },
  buttonContainer: {
    marginTop: 20  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 15,
  },
  resultText: {
    fontSize: 1,
    fontWeight: 'bold',
  },
})