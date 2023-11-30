import { useDispatch, useSelector } from "react-redux";
import { removeTask, taskCheck } from "../../functions/taskSlices";
import Modal from "../Modal/Modal";
import { useRef, useState } from "react";
import style from "./Tasks.module.css";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Tasks = () => {
  const nav = useNavigate(); // for navigation
  const task = useSelector((state) => state.task.tasks); // readind the task
  const dispatch = useDispatch(); // dispatcher to makes changes in state
  const sort = useRef();
  // paginatoin logic here
  const itemsPerPage = 5;
  const totalItems = task.length;
  const [current, setCurrent] = useState(1);
  const [sorted, setSorted] = useState(false);
  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const taskDisplay = task.slice(startIndex, endIndex);

  const handlePage = (newpage) => {
    setCurrent(newpage);
  };

  //sorting according to priority logic here
  const priorityOrder = {
    high: 1,
    medium: 2,
    low: 3,
  };

  // Sort tasks based on priority
  const sortedTasks = taskDisplay?.slice().sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  // handling modal
  const modalRef = useRef();
  const handleModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  //priority acccording to sue date
  const changePriority = (date) => {
    const due = new Date(date);
    const today = new Date();
    let dueDate = Math.ceil((due - today) / (24 * 60 * 60 * 1000));
    if (dueDate <= 0) {
      return "High";
    } else if (dueDate === 1) {
      return "Medium";
    } else {
      return "Low";
    }
  };

  // rendering elements here
  return (
    <div className={style.main}>
      {/* Header section here */}
      <div className={style.header}>
        <h1>Task Manager</h1>
        <div>
          <button onClick={handleModal} className={style.btn}>
            <IoMdAddCircleOutline className={style.icon} />
            <span>Add</span>
          </button>
          <Modal openModal={modalRef} editform={false} />
        </div>
      </div>

      {/* pagination ui here  */}
      <div className={style.pagination}>
        <div className={style.pagebtn}>
          <button
            onClick={() => handlePage(current - 1)}
            disabled={startIndex < itemsPerPage}
            className={style.btn}
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => handlePage(current + 1)}
            disabled={endIndex > totalItems || totalItems == itemsPerPage}
            className={style.btn}
          >
            <FaArrowRight />
          </button>
        </div>
        <div className={style.sorting}>
          <label htmlFor="prio"> Change Priority According To Due Date</label>
          <input
            type="checkbox"
            ref={sort}
            onChange={() => {
              setSorted(sort.current.checked);
            }}
          />
        </div>
      </div>
      {/* list of task are shown here  */}

      <div className={style.box}>
        <div className={style.list}>
          <div className={style.listheader}>
            <b>Title</b>
            <b>Priority</b>
            <b>Completion</b>
            <b>Due date</b>
            <b>Updates</b>
          </div>
          {/* maping over task to render it  */}
          {sortedTasks?.map((val) => {
            return (
              <div
                key={val.id}
                className={`${val.isCompleted ? style.strike : ""} ${
                  style.row
                }`}
              >
                <div style={{ minWidth: "100px " }}>
                  <h2>
                    <Link to={`/details/${val.id}`}>{val.text}</Link>
                  </h2>
                </div>
                <div>
                  {sorted ? (
                    <p
                      className={`priority ${changePriority(
                        val.date
                      ).toLowerCase()}`}
                    >
                      {changePriority(val.date)}
                    </p>
                  ) : (
                    <p className={`priority ${val.priority}`}>{val.priority}</p>
                  )}
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="checking"
                    checked={val.isCompleted}
                    onChange={() =>
                      dispatch(
                        taskCheck({ id: val.id, isCompleted: val.isCompleted })
                      )
                    }
                  />
                  <label htmlFor="checking"> Completed </label>
                </div>
                <div>
                  <p>{val.date}</p>
                </div>
                <div>
                  <div style={{ display: "flex" }}>
                    <button
                      onClick={() => nav(`/edit/${val.id}`)}
                      className={style.btn}
                      style={{ marginRight: "10px" }}
                    >
                      <MdOutlineEdit />
                    </button>
                    <button
                      onClick={() => dispatch(removeTask(val.id))}
                      className={style.btn}
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
