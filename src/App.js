import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import { v4 as uuid } from "uuid";
const getLocalStorage = () => {
  let list = localStorage.getItem("List");
  if (list) {
    return JSON.parse(localStorage.getItem("List"));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "Item Added");
      const newItem = { id: uuid(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const clearList = () => {
    showAlert(true, "danger", "All Items Deleted");
    setList([]);
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "Item Removed");
    setList(list.filter((listy) => listy.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.filter((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };
  useEffect(() => {
    localStorage.setItem("List", JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      <form onSubmit={handleSubmit} className="grocery-form">
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery budd</h3>
        <div className="form-control">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="eg. Eggs"
            className="grocery"
            type="text"
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List editItem={editItem} items={list} removeItem={removeItem} />
          <button onClick={() => clearList()} className="clear-btn">
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
