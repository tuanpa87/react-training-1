import React, { Component } from "react";
import classes from "./App.css";
import Person from "./Person/Person";
//import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import UserInput from "./UserInput/UserInput";
import UserOutput from "./UserOutput/UserOutput";

class App extends Component {
  state = {
    persons: [
      {
        id: "1434",
        name: "MAx",
        age: 28
      },
      {
        id: "2gtr",
        name: "Mike",
        age: 21
      },
      {
        id: "3ku7h",
        name: "Steve",
        age: 55
      }
    ],
    otherState: "some other value",
    username: "username",
    showPersons: false
  };

  deletePersonHandler = personIndex => {
    //best practice is copy new array
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };
  nameChangeHandler = (event, id) => {
    //find the index
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    //update the person[personindex] name
    const person = {
      ...this.state.persons[personIndex]
    };
    person.name = event.target.value;

    //copy and update state
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    });
  };

  render() {
    let persons = null;
    let btnClass = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              //<ErrorBoundary   >
              <Person
                key={person.id}
                name={person.name}
                age={person.age}
                click={() => this.deletePersonHandler(index)}
                change={event => this.nameChangeHandler(event, person.id)}
              />
              //</ErrorBoundary>
            );
          })}
        </div>
      );

      btnClass = classes.coral;
    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.lightgreen);
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1>Hello world</h1>
        <p className={assignedClasses.join(" ")}>This is a react app</p>
        <button
          //style={style}
          //onClick={() => this.switchNameHandler('Max1') }
          onClick={this.togglePersonsHandler}
          className={btnClass}
        >
          {/* switch Name */}
          Toggle
        </button>
        {persons}
  

      </div>
    );
  }
}

export default App;