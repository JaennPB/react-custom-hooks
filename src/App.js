import React, { useState, useEffect } from "react";
import useHttp from "./hooks/useHttp";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

function App() {
  const [tasks, setTasks] = useState([]);

  const transformData = (dataObject) => {
    const loadedTasks = [];

    for (const taskKey in dataObject) {
      loadedTasks.push({ id: taskKey, text: dataObject[taskKey].text });
    }

    setTasks(loadedTasks);
  };

  const { isLoading, error, sendRequest: fetchTasks } = useHttp(
    { url: "https://task-d04c9-default-rtdb.firebaseio.com/tasks.json" },
    transformData
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
