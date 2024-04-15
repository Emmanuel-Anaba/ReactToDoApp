import { useState } from "react";

const App = () => {
  const Tasks = JSON.parse(localStorage.getItem("items")) || [];
  const [item, setItem] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (item !== "") {
      const newTask = {
        id: crypto.randomUUID(),
        task: item,
      };
      Tasks.push(newTask);
      localStorage.setItem("items", JSON.stringify(Tasks));
      setItem("");
    } else alert("Write Something! 😒");
  };
  const handleDelete = (e) => {
    const task = e.target.parentElement.parentElement;
    task.style.display = "none";
    const currentId = task.id;
    Tasks.forEach((element) => {
      if (currentId === element.id) {
        Tasks.splice(Tasks.indexOf(element), 1);
        localStorage.setItem("items", JSON.stringify(Tasks));
      }
    });
  };
  const toggleCompleted = (e) => {
    const taskText = e.target.parentElement.parentElement.querySelector("P");
    taskText.style.textDecoration = e.target.checked ? "line-through" : "none";
    taskText.classList.toggle("text-emerald-500");
  };
  return (
    <>
      <div className="bg-emerald-800 p-3 sticky top-0 drop-shadow-2xl z-50">
        <h1 className="text-center text-3xl md:text-4xl font-medium">
          To Do App
        </h1>
        <form className="flex gap-3 mt-3" onSubmit={handleSubmit}>
          <input
            className="w-[100%] outline-0 bg-transparent border-emerald-200 border-b-[1px] placeholder:text-emerald-200"
            type="text"
            placeholder="Add a task ..."
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button className="px-5 py-1" type="submit">
            Add
          </button>
        </form>
      </div>
      <ul>
        {Tasks.map((item) => (
          <li key={item.id} id={item.id}>
            <p>{item.task}</p>
            <div>
              <button onClick={handleDelete}>Delete</button>
              <input type="checkbox" onChange={toggleCompleted} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
