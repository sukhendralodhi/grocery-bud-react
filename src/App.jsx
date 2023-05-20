import { useState } from "react";
import List from "./components/List";
import Alert from "./components/Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // Display alert
      showAlert(true, 'danger', 'Please input some value!');
    } else if (name && isEditing) {
      // Deal with editing 

    } else {
      showAlert(true, 'success', 'Item added!');
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
    }
  }

  const handleClearList = () => {
    setList([]);
    showAlert(true, 'danger', 'Clear all the items!');
  }

  const handleRemoveItem = (id) => {
    showAlert(true, 'danger', 'Item removed!');
    const newList = list.filter(item => item.id !== id);
    setList([newList]);
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  }

  return (
    <>
      <section className="section-center">

        <form action="" className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} />}
          <h3>Grocery Bud</h3>
          <div className="form-control">
            <input
              type="text"
              className="grocery"
              placeholder="e. g. eggs"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              {isEditing ? 'edit' : 'submit'}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className="list-container">
            <List items={list} removeItem={handleRemoveItem} />
            <button onClick={handleClearList} className="clear-btn">clear items</button>
          </div>
        )}
      </section>
    </>
  );
}

export default App;
