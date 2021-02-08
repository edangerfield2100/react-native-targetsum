import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

const Game = (props) => {

  const STATUS_LOST = 'LOST';
  const STATUS_WON = 'WON';
  const STATUS_PLAYING = 'PLAYING';
  const STATUS_MSG_CONGRAT = 'Congratulations, you won!';
  const STATUS_MSG_LOST = 'You lost, try again!';

  const [selectedIds, setSelectedIds] = useState([]);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [target, setTarget] = useState(undefined);
  const [resetToggle, setResetToggle] = useState(false);
  const [gameStatus, setGameStatus] = useState('PLAYING');

  // TODO: Add Timer logic via React Hooks and setInterval
  //const [gameTimer, setGameTimer] = useState(10);

  //let gameTimerId;

  // useEffect(() => {
  //   gameTimerId = setInterval(setGameTimer(gameTimer - 1), 1000);
  // }, []);

  // useEffect(() => {
  //   if (gameTimer === 0) {
  //     clearInterval(gameTimerId);
  //   }
  // }, [gameTimer]);


  useEffect(() => {
    // set random numbers
    const tempRandomNumbers = Array
      .from({length: props.randomNumberCount})
      .map(() => 1 + Math.floor(10 * Math.random()));
    setRandomNumbers([...tempRandomNumbers]);

    // set target number
    const tempTarget = tempRandomNumbers
      .slice(0, props.randomNumberCount - 2)
      .reduce((acc, curr) => acc + curr, 0);
    setTarget(tempTarget);

    setGameStatus(STATUS_PLAYING);

    //shuffle numbers
    const shuffledNumbers = shuffle(tempRandomNumbers);
    setRandomNumbers(shuffledNumbers);

  }, [resetToggle]);

  useEffect(() => {
    // update the gameStatus upon change of selectedIds
    let selectedSum = selectedIds.reduce((acc, curr) => acc + randomNumbers[curr], 0);

    if (selectedSum < target) {
      setGameStatus(STATUS_PLAYING);
    } else if (selectedSum == target) {
      setGameStatus(STATUS_WON);
    } else {
      setGameStatus(STATUS_LOST);
    }
  }, [selectedIds.length]);

  // returns boolean indicating in index of passed in number, is in selectedIds array
  const isNumberSelected = (index) => {
    return selectedIds.indexOf(index) >= 0;
  };
  
  const selectNumber = (index) => {
    const indexOfSelectedNumber = selectedIds.indexOf(index);
    if (indexOfSelectedNumber < 0) {
      setSelectedIds([...selectedIds, index]);
    } else {
      let tempselectedIds = [...selectedIds];
      tempselectedIds.splice(indexOfSelectedNumber, 1);
      setSelectedIds([...tempselectedIds]);
    }
  };

  const refreshGame = () => {
    setSelectedIds([]);
    setResetToggle(!resetToggle);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.target, styles[`game${gameStatus}`]]}>{target}</Text>
      <View style={styles.row}>
        {
          randomNumbers.map((num, index) => {
            return (
              <RandomNumber 
                key={index}
                id={index}
                number={num} 
                isDisabled={isNumberSelected(index) || gameStatus !== STATUS_PLAYING}
                onPress={selectNumber}
              />
            );
          })
        }
      </View>
      <View style={styles.gameStatusContainer}>
        <Text style={styles.gameStatusMessage}>{
          gameStatus === STATUS_WON ? STATUS_MSG_CONGRAT :
            gameStatus === STATUS_LOST ? STATUS_MSG_LOST : ''        
        }</Text>
      </View>
      <View style={styles.resetContainer}>
        <Button style={{margin:10}} title="Reset" onPress={refreshGame} />
      </View>
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
  },
  gameStatusContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    margin: 10
  },
  gameStatusMessage: {
    fontSize: 24,
  },
  gameWON: {
    backgroundColor: 'green'
  },
  gameLOST: {
    backgroundColor: 'red'
  }, 
  gamePLAYING: {
    backgroundColor: '#aaa',
  },
  resetContainer: {
    flex: 1,
    margin: 20
  }
});

Game.propTypes = {
  randomNumberCount: PropTypes.number.isRequired
};

export default Game;