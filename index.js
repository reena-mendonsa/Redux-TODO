let store = Redux.createStore(reducer);
let input = document.querySelector("input");
let container = document.querySelector("ul");

function handleTodo(event) {
  if (event.keyCode === 13 && event.target.value) {
    store.dispatch({
      type: "add",
      todo: event.target.value,
      isCompleted: false,
    });
    event.target.value = "";
  }
}

function createUI(todos) {
  container.innerHTML = "";
  todos.forEach((t, i) => {
    let li = document.createElement("li");
    li.classList.add("flex");
    let div = document.createElement("div");
    div.classList.add("flex");
    let radio = document.createElement("input");
    radio.type = "checkbox";
    radio.checked = t.isCompleted;
    radio.addEventListener("click", () => {
      store.dispatch({
        type: "iscompleted",
        isCompleted: !t.isCompleted,
        id: i,
      });
    });
    let h2 = document.createElement("h2");
    h2.innerText = t.todo;
    h2.style.color = t.isCompleted ? "green" : "red";
    h2.classList.add("capitalize");
    let close = document.createElement("span");
    close.innerText = "❌";
    close.classList.add("cursor-pointer");
    close.addEventListener("click", () => {
      store.dispatch({ type: "delete", id: i });
    });
    div.append(radio, h2);
    li.append(div, close);
    container.append(li);
  });
}

store.subscribe(() => {
  let todos = store.getState();
  createUI(todos);
});

input.addEventListener("keyup", handleTodo);

function reducer(state = [], action) {
  switch (action.type) {
    case "add":
      return state.concat({
        todo: action.todo,
        isCompleted: action.isCompleted,
      });
      break;
    case "delete":
      return state.filter((s, i) => i !== action.id);
      break;
    case "iscompleted":
      return state.filter((s, i) => {
        if (action.id === i) {
          s.isCompleted = action.isCompleted;
        }
        return s;
      });
      break;
    default:
      return state;
  }
}
