import { withTransition } from "./documentTransition";
import { useState } from "react";
import "./App.css";

function Item(item) {
  const slug = item.name.replaceAll(" ", "-").toLowerCase();
  const toggle = () => {
    item.toggle(item);
  };

  return (
    <div
      onClick={toggle}
      className={`item ${item.done ? "done" : ""}`}
      style={{
        pageTransitionTag: slug,
      }}
    >
      <h1>{item.name}</h1>
    </div>
  );
}

function App() {
  const [state, setState] = useState({
    items: [
      { done: false, name: "Buy Milk", id: 1 },
      { done: false, name: "Publish NPM Package", id: 2 },
      { done: false, name: "Become Rich and Famous", id: 3 },
      { done: true, name: "Pay Rent", id: 4 },
      { done: true, name: "Create React Document Transition Hook", id: 5 },
    ],
  });

  function toggle(item) {
    const items = Array.from(state.items);
    const foundItem = items.find((maybeItem) => maybeItem.name === item.name);
    if (foundItem) {
      foundItem.done = !foundItem.done;
    }

    withTransition(() => {
      setState({
        items,
      });
    });
  }

  function setValue(item, name) {
    let items = Array.from(state.items);

    const foundItem = items.find((maybeItem) => maybeItem.name === item.name);
    if (foundItem) {
      foundItem.name = name;
    }

    setState({
      items,
    });
  }

  const done = state.items.filter(({ done }) => done).length;
  const todo = state.items.filter(({ done }) => !done).length;

  return (
    <div className="app">
      <div className="app-heading">
        <h1>
          todo list
        </h1>
        <div className="info">
        <p>todo: {todo}</p>
        <p>done: {done}</p>
        </div>
      </div>

      <div className="todo-col">
        {state.items
          .filter((item) => !item.done)
          .map((item) => (
            <Item {...item} toggle={toggle} key={item.id} setValue={setValue} />
          ))}
      </div>

      <div className="done-col">
        {state.items
          .filter((item) => item.done)
          .map((item) => (
            <Item {...item} toggle={toggle} key={item.id} setValue={setValue} />
          ))}
      </div>
    </div>
  );
}

export default App;
