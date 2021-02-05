import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';

const Game = (props) => {
  
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [target, setTarget] = useState(undefined);
  const [resetToggle, setResetToggle] = useState(false);

  useEffect(() => {
    const tempRandomNumbers = Array
      .from({length: props.randomNumberCount})
      .map(() => 1 + Math.floor(10 * Math.random()));

    setRandomNumbers([...tempRandomNumbers]);

    const tempTarget = tempRandomNumbers
      .slice(0, props.randomNumberCount - 2)
      .reduce((acc, curr) => acc + curr, 0);

    setTarget(tempTarget);
  }, [resetToggle]);

  // const randomNumbers = Array
  //   .from({length: props.randomNumberCount})
  //   .map(() => 1 + Math.floor(10 * Math.random()));
 
    // console.log(randomNumbers);
    // console.log('');

  // const target = randomNumbers
  //   .slice(0, props.randomNumberCount - 2)
  //   .reduce((acc, curr) => acc + curr, 0);

    // shuffle numbers;

  // returns boolean indicating in index of passed in number, is in selectedNumbers array
  const isNumberSelected = (index) => {
    return selectedNumbers.indexOf(index) >= 0;
  };
  
  const selectNumber = (index) => {
    setSelectedNumbers((selectedNumbers) => [...selectedNumbers, index]);
  };

  const refreshGame = () => {
    setSelectedNumbers([]);
    setResetToggle(!resetToggle);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.target}>{target}</Text>
      <View style={styles.row}>
        {
          randomNumbers.map((num, index) => {
            return (
              <RandomNumber 
                key={index}
                id={index}
                number={num} 
                isDisabled={isNumberSelected(index)}
                onPress={selectNumber}
              />
            );
          })
        }
      </View>
      <Button style={{margin:10}} title="Try again" onPress={refreshGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#ddd',
    paddingTop: 40
  },
  target: {
    fontSize: 40,
    backgroundColor: '#aaa',
    marginHorizontal: 50,
    textAlign: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: 10
  },
  tryAgain: {
    margin: 10,
    backgroundColor: 'green'
  }
});

Game.propTypes = {
  randomNumberCount: PropTypes.number.isRequired
};

export default Game;