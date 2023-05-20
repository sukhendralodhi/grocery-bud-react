import { useEffect, useState } from "react";
import List from "./components/List";
import Alert from "./components/Alert";


const  getLocalStorage = () => {
  const list = localStorage.getItem('list');
  if(list) {
    return JSON.parse(localStorage.getItem('list'));
  }
  return [];
}

// main function component 
function App() {

  // state 
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  });

  // handle submit function 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // Display alert
      showAlert(true, 'bg-red-400', 'Please input some value!');
    } else if (name && isEditing) {
      // Deal with editing 
      setList(
        list.map((item) => {
          if(item.id === editId) {
            return {...item, title: name}
          }
          return item;
        })
      );
      // set back all state default 
      setName('');
      setEditId(null);
      setIsEditing(false);
      showAlert(true, 'bg-green-400', 'Value Changed!');

    } else {
      showAlert(true, 'bg-green-400', 'Item added!');
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
    }
  }

  // handle clear list function 
  const handleClearList = () => {
    setList([]);
    showAlert(true, 'bg-red-400', 'Clear all the items!');
  }

  // handle remove item function 
  const handleRemoveItem = (id) => {
    showAlert(true, 'bg-red-400', 'Item removed!');
    setList(list.filter((item) => item.id !== id));
  }

  // handle edit item function 
  const handleEditItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  }

  // show alert function 
  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <>
      <section className="flex items-center justify-center flex-col shadow-lg py-4">

        <form action="" className=" text-center mt-8" onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list = {list} />}
          <h3 className="text-center text-3xl font-bold my-4">My Store</h3>
          <div className="space-x-2 space-y-4 ">
            <input 
              type="text"
              className="border-2 rounded px-4 border-orange-400"
              placeholder="e. g. eggs"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="uppercase bg-orange-400 border-2 border-orange-400 rounded px-2 text-white  text-center">
              {isEditing ? 'edit' : 'submit'}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className="list-container text-center">
            <List items={list} removeItem={handleRemoveItem} handleEditItem = {handleEditItem} />
            <button onClick={handleClearList} className="text-sm uppercase bg-red-500 text-white px-4 rounded hover:bg-red-400 transition-all duration-100 delay-100 ease-linear">clear items</button>
          </div>
        )}
      </section>
    </>
  );
}

export default App;
