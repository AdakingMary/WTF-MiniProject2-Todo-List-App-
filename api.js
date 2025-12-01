const BASE_URL = "https://x8ki-letl-twmt.n7.xano.io/api:AujnkDsE/task";

// GET all tasks
export const getTasks = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error(`Failed to fetch tasks. Status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching tasks:", err.message);
    return [];
  }
};

// POST a new task
export const postTask = async (task) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error(`Failed to create task. Status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error creating task:", err.message);
  }
};

// UPDATE a task using POST with id in body
export const updateTask = async (task) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST", // changed from PUT
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task), // include id here
    });
    if (!res.ok) throw new Error(`Failed to update task. Status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error updating task:", err.message);
  }
};

// DELETE a task
export const deleteTask = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Failed to delete task. Status: ${res.status}`);
  } catch (err) {
    console.error("Error deleting task:", err.message);
  }
};
