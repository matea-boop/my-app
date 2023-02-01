//TASK FORM LOCALSTORAGE DUMP

useEffect(() => {
  if (type === "edit" && task) {
    setTitle(task.title);
    setSubtasks(task.subtasks);
    setDate(task.date);
  } else {
    setTitle("");
    setSubtasks([]);
  }
}, [type, task, modalOpen]);

if (title === "" || !valid) {
  return;
}
if (title && valid) {
  if (type === "add") {
    dispatch(
      addTask({
        id: uuid(),
        title,
        subtasks,
        status,
        date,
      })
    );

    toast.success("Task Added Successfully");
    setModalOpen(false);
  }
  if (type === "edit") {
    if (task.title !== title) {
      dispatch(
        editTask({
          ...task,
          title,
        })
      );
      setModalOpen(false);
      toast.success("Task Edited");
    } else if (task.subtasks !== subtasks) {
      dispatch(
        editTask({
          ...task,
          subtasks,
        })
      );
      setModalOpen(false);
      toast.success("Task Edited");
    } else if (task.date !== date) {
      dispatch(
        editTask({
          ...task,
          date,
        })
      );
      setModalOpen(false);
      toast.success("Task Edited");
    } else {
      toast.error("No changes made");
    }
  }
} else {
  toast.error("Title shouldn't be empty");
  setModalOpen(true);
}
