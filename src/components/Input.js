import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import {gray, purple, white} from '../constants/Color';
import Icon from 'react-native-vector-icons/FontAwesome';
import {screenWidth} from '../constants/ScreenResolution';

const Input = ({placeholder, value, setValue, type}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(prevState => !prevState);
  };

  const inputAnimation = new Animated.Value(screenWidth + 250);

  useEffect(() => {
    startInputAnimation();
  }, []);

  const startInputAnimation = () => {
    Animated.timing(inputAnimation, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  const inputAnimationStyle = {
    transform: [{translateX: inputAnimation}],
    ...styles.container,
    ...(isActive && styles.activeContainer),
  };

  return (
    <Animated.View style={[inputAnimationStyle]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        secureTextEntry={type === 'password' && secureTextEntry}
      />
      {type === 'password' && (
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={toggleSecureTextEntry}>
          <Icon
            name={secureTextEntry ? 'eye' : 'eye-slash'}
            size={15}
            color={purple}
          />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: gray,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activeContainer: {
    borderBottomColor: purple,
  },
  input: {
    flex: 1,
    padding: 8,
  },
  eyeButton: {
    padding: 8,
  },
});

export default Input;
