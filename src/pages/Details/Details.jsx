import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import style from "./details.module.css";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const Details = () => {
  const { taskid } = useParams();
  const nav = useNavigate()
  const task = useSelector((state) =>
    state.task.tasks.find((task) => task.id == taskid)
  );
  if (!task) {
    return <h1>No items found</h1>;
  }

  return (
    <div className={style.main}>
      <div className={style.card}>
        <h1>{task.text}</h1>
        <div>
          
          <p>
            <b>Description</b>: {task.description}
          </p>
          <p>
            <b>Is Completed</b>: <span>{`${task.isCompleted}`} {task.isCompleted ? <FaCheck /> : <FaTimes/> }</span>
          </p>
          <p>
            <b>Priority</b>: <span className={`priority ${task.priority}`}>{task.priority}</span>
          </p>
          <p>
            <b>Due</b>: <span>{task.date}</span>
          </p>
        </div>
        <button onClick={()=> nav("/")} style={{width:"100%"}}>  Go Back</button>
      </div>
    </div>
  );
};

export default Details;
