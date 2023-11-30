/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../../functions/taskSlices";
import style from "./Addtask.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Addtask = ({ editform, taskid }) => {
  const text = useRef();
  const desc = useRef();
  const due = useRef();
  const priority = useRef();
  const dispatch = useDispatch();
  const nav = useNavigate()

  const handleAddTask = () => {
    if (!editform) {
      if (text.current.value !== "" && priority.current.value !== "" && due.current.value !=="") {
        dispatch(
          addTask({
            text: text.current.value,
            description: desc.current.value,
            priority: priority.current.value,
            due:due.current.value,
          })
        );

        toast.success("task added succefully", {
          position: "top-center",
          autoClose: 500,
          theme: "dark",
        });
        text.current.value = "";
        desc.current.value = "";
        priority.current.value = "";
      } else {
        toast.error("please fill the required field", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
      }
    } else {
      dispatch(
        editTask({
          id: taskid,
          text: text.current.value,
          description: desc.current.value,
          priority: priority.current.value,
          due:due.current.value,
        })
      );
      toast.success("task edited succefully", {
        position: "top-center",
        autoClose: 500,
        theme: "dark",
      });
      text.current.value = "";
      desc.current.value = "";
      priority.current.value = "";
    }
  };
  return (
    <>
      <ToastContainer />
      <div className={style.form}>
        {editform ? (
          <>
            <h1>Edit Task Here</h1>
            <small style={{color:"gray"}}>(every field is not required)</small>
          </>
        ) : (
          ""
        )}
        <input type="text" placeholder="Enter Task" ref={text} required />
        <textarea
          cols="29"
          rows="10"
          placeholder="Enter Description"
          ref={desc}
        ></textarea>
        <select ref={priority} required defaultValue={""} >
          <option disabled value="">
            Select priority
          </option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input type="date" placeholder="enter due date" ref={due} onChange={()=>console.log(due.current.value)}/>
        <div>
          <button onClick={handleAddTask} style={{marginRight:"5px"}}>
            {" "}
            {editform ? "Edit Task" : "Add Task"}
          </button>
          {editform ? <button onClick={()=> nav("/")}>GO Back</button> : ""}
        </div>
      </div>
    </>
  );
};

export default Addtask;
