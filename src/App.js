import "./App.css";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import Additem from "./Additem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";

function App() {
  const API_URL = "http://localhost:3500/items";

  const [items, setitems] = useState([]);

  const [newItem, setNewItem] = useState("");

  const [search, getsearch] = useState("");

  const [fetchError, setfetchError] = useState(null);

  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchitems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error(" Data not recieved ");
        const items = await response.json();
        console.log(items);
        setitems(items);
        setfetchError(null);
      } catch (err) {
        setfetchError(err.message);
      } finally {
        setisLoading(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchitems())();
    }, 2000);
  }, []);

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, item };
    const listitem = [...items, addNewItem];
    setitems(listitem);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(addNewItem),
    };
    const result = await apiRequest(API_URL, postOptions);
    if (result) setfetchError(result);
  };

  const handlecheck = async (id) => {
    const listitems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setitems(listitems)

    const myitem = items.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ checked: myitem[0].checked })
    }
    const reqURL = `${API_URL}/${id}`;
    const result = await apiRequest(reqURL, updateOptions);
    if (result) setfetchError(result);
  }

  const handledelete = async (id) => {
    const sitems = items.filter((item) => item.id !== id);
    setitems(sitems);
    const deleteOptions = { method: "DELETE" };
    const reqURL = `${API_URL}/${id}`;
    const result = await apiRequest(reqURL, deleteOptions);
    if (result) setfetchError(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    console.log(newItem);
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div className="App">
      <Header title="My To do List" />
      <Additem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} getsearch={getsearch} />
      <main>
        {isLoading && <p>Loading items...</p>}
        {fetchError && <p>{`Error: ${fetchError}`}</p>}
        {!isLoading && !fetchError && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handlecheck={handlecheck}
            handledelete={handledelete}
          />
        )}
      </main>

      <Footer length={items.length} />
    </div>
  );
}

export default App;
