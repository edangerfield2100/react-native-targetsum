import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const RandomNumber = (props) => {

  const handlePress = () => {
    console.log(props.number);
    props.onPress(props.id);
  };

  return ( 
    <TouchableOpacity onPress={handlePress}>
      <Text style={[styles.randomNumber, props.isDisabled && styles.disabled]} >{props.number}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  randomNumber: {
    width: 100,
    backgroundColor: 'yellow',
    fontSize: 25,
    margin: 10,
    textAlign: 'center'
  }, 
  disabled: {
    opacity: 0.5
  }
};

RandomNumber.propTypes = {
  number: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

export default RandomNumber;
