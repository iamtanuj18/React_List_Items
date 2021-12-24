import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ items, removeItem, editItem }) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article className="grocery-item" key={id}>
            <p className="title">{title}</p>
            <div className="btn-container">
              <button type="button" className="edit-btn">
                <FaEdit onClick={() => editItem(id)} />
              </button>
              <button
                onClick={() => removeItem(id)}
                type="button"
                className="delete-btn"
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
