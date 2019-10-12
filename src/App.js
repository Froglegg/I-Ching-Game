import React, { Component } from "react";
import ElementCard from "./components/ElementCard";
import Wrapper from "./components/Wrapper";
import elements from "./elements.json";
import ScoreAndTitle from "./components/ScoreAndTitle";
import CardWrapper from "./components/CardWrapper";

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class App extends Component {
  state = {
    elements: elements,
    score: 0,
    highScore: 0
  };

  adjustState = (id, boolean) => {
    let findElement = this.state.elements.find(function(element) {
      return element.id === id;
    });

    // find the index of that element in the array in state
    let index = this.state.elements.indexOf(findElement);
    console.log(index);

    // make a shallow copy of the current state, prevents directly mutating state. Using spread ... here to reach the nested objects
    let elements = [...this.state.elements];

    //  make a shallow copy of the item in the array that you want to mutate and then change the property in that array, using spread ... here to modify nested state object
    let element = {
      ...elements[index],
      clicked: boolean
    };

    // if the item has been clicked before, boolean of false then map over everything and set everything back to false, then setting the score to 0... a loss + reset, basically.
    if (boolean === false) {
      var newScore = 0;
      elements.map(el => (el.clicked = false));
    } else {
      //   // else add the element we adjusted, set the clicked to true for, back into the array. We are directly mutating state here but we made a copy of it beforehand so it's ok, though I'm not quite sure why.
      elements[index] = element;
      newScore = this.state.score + 1;
    }

    // Set the state to our new copy and shuffle it, adjust score
    this.setState({
      elements: shuffle(elements),
      score: newScore
    });
  };

  // routes our clicks
  handleClick = id => {
    this.state.elements.forEach(element =>
      element.id === id && element.clicked === true
        ? this.handleBadClick(id)
        : element.id === id && element.clicked === false
        ? this.handleGoodClick(id)
        : ""
    );
  };

  // bad clicks
  handleBadClick = id => {
    this.adjustState(id, false);
    // set the high score on the loss
    if (this.state.score > this.state.highScore) {
      var highScore = this.state.score;
    } else {
      highScore = this.state.highScore;
    }
    this.setState({ highScore: highScore });
  };

  // good clicks
  handleGoodClick = id => {
    this.adjustState(id, true);
  };

  render() {
    return (
      <Wrapper>
        <ScoreAndTitle
          key={this.state.score}
          score={this.state.score}
          highScore={this.state.highScore}
        />
        <CardWrapper>
          {this.state.elements.map(element => (
            <ElementCard
              name={element.name}
              image={element.image}
              id={element.id}
              key={element.id}
              clicked={element.clicked}
              handleClick={this.handleClick}
            />
          ))}
        </CardWrapper>
      </Wrapper>
    );
  }
}
export default App;
