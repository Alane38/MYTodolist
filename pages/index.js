import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";

import styles from "@/styles/Todo.module.css";
// import getServerSideProps from "@/components/writeJSON";
import data from "../data/data.json";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faRectangleList } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";

const inter = Inter({ subsets: ["latin"] });

if (typeof window !== "undefined") {
  // console.log(data);
  // console.log(data.todoItems.length);
}

const errorMessage = (type) => {
  const span = document.querySelector("#errorMessage");
  if (type === "void") {
    span.textContent = "You must write something";
  } else if (type === "lowLength") {
    span.textContent = "You must write more than 3 characters";
  }

  setTimeout(() => {
    span.textContent = "";
  }, 2000);
};

const addTodo = () => {
  const input = document.querySelector("input");
  if (input.value === "") {
    errorMessage("void");
  } else if (input.value.length <= 3) {
    errorMessage("lowLength");
  } else {
    const input = document.querySelector("input");
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    const div = document.createElement("div");
    const label = document.createElement("label");
    const button = document.createElement("button");
    const icon = document.createElement("FontAwesomeIcon");

    label.textContent = input.value;
    input.value = "";

    icon.setAttribute("icon", faTrashCan);
    icon.setAttribute("size", "1x");
    icon.setAttribute("color", "black");

    div.setAttribute("id", "div-checked");

    li.appendChild(div);
    div.appendChild(label);
    li.appendChild(button);
    button.appendChild(icon);

    ul.appendChild(li);

    button.addEventListener("click", deleted);
    li.addEventListener("click", checked);

    input.focus();
  }
};

const checked = (item) => {
  const li = item.target.closest("li");
  let label = li.querySelector("label");
  let div = li.querySelector("#div-checked");

  if (label.style.textDecoration === "line-through") {
    label.style.textDecoration = "none";
    div.style.backgroundColor = "rgba(255, 255, 255, 0.72)";
  } else {
    label.style.textDecoration = "line-through";
    div.style.backgroundColor = "rgb(0, 150, 0)";
  }
};

const deleted = (item) => {
  const li = item.target.closest("li");
  li.remove();
};

let items = [];
for (let i = 0; i < data.todoItems.length; i++) {
  items.push(
    <li key={i} onClick={checked}>
      <div id="div-checked">
        <label>{data.todoItems[i].label}</label>
      </div>
      <button onClick={deleted}>
        <FontAwesomeIcon icon={faTrashCan} size="1x" color="black" />
      </button>
    </li>
  );
}

const generateList = () => {
  const todoList = [];
  for (let i = 0; i < data.todoItems.length; i++) {
    const item = data.todoItems[i];
    if (item.completed) {
      todoList.push(
        <li key={i} onClick={checked}>
          <div
            id="div-checked"
            style={{
              backgroundColor: "rgb(0, 150, 0)",
              textDecoration: "line-through",
            }}
          >
            <label>{item.label}</label>
          </div>
          <button onClick={deleted}>
            <FontAwesomeIcon icon={faTrashCan} size="1x" color="black" />
          </button>
        </li>
      );
    } else {
      todoList.push(
        <li key={i} onClick={checked}>
          <div id="div-checked">
            <label>{item.label}</label>
          </div>
          <button onClick={deleted}>
            <FontAwesomeIcon icon={faTrashCan} size="1x" color="black" />
          </button>
        </li>
      );
    }
  }
  return todoList;
};

const getCountItems = () => {
  let dataCountItems = [];
  for (let i = 0; i < data.todoItems.length; i++) {
    dataCountItems.push(data.todoItems[i]);
  }
  const count = dataCountItems.length;

  return count;
};

const getCheckedItems = () => {
  let dataCheckedItems = [];
  for (let i = 0; i < data.todoItems.length; i++) {
    dataCheckedItems.push(data.todoItems[i]);
  }
  const count = dataCheckedItems.filter(
    (item) => item.completed === true
  ).length;

  return count;
};

const getUncheckedItems = () => {
  let dataUncheckedItems = [];
  for (let i = 0; i < data.todoItems.length; i++) {
    dataUncheckedItems.push(data.todoItems[i]);
  }
  const count = dataUncheckedItems.filter(
    (item) => item.completed === false
  ).length;

  return count;
};

export default function Home() {

  // const [todoItems, setTodoItems] = useState([]);

  // useEffect(() => {
  //   setTodoItems(data.todoItems);
  // }, []);

  return (
    <>
      <Head>
        <title>MYT</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.first_section}>
          <h1>MYTodolist</h1>
          <div className={styles.container}>
            <span id="errorMessage"></span>
            <div className={styles.info}>
              <h3>
                <FontAwesomeIcon
                  icon={faRectangleList}
                  size="1x"
                  color="cyan"
                  className={styles.fontawesomeIconsStats}
                />
                <span id="getCountItems">{getCountItems()}</span>
              </h3>
              <h3>
                <FontAwesomeIcon
                  icon={faSquareCheck}
                  size="1x"
                  color="#00ff00"
                  className={styles.fontawesomeIconsStats}
                />
                <span id="getCheckedItems">{getCheckedItems()}</span>
              </h3>
              <h3>
                <FontAwesomeIcon
                  icon={faSquareXmark}
                  size="1x"
                  color="red"
                  className={styles.fontawesomeIconsStats}
                />
                <span id="getUncheckedItems">{getUncheckedItems()}</span>
              </h3>
            </div>

            <div className={styles.adder}>
              <input type="text" />
              <button onClick={addTodo}>Add</button>
            </div>

            <div className={styles.list}>
              <ul>{generateList()}</ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
