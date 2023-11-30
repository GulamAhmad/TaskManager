/* eslint-disable react/prop-types */
import Addtask from "../Addtask/Addtask";
import style from "./Modal.module.css"

const Modal = ({openModal,editform}) => {

  return (
    <div>
      <dialog ref={openModal} className={style.dialog}>
        <p>Create new Task</p>
        <Addtask editform={editform}/>
        <button className={style.close} onClick={() => openModal.current.close()}>
          &times;
        </button>
      </dialog>
    </div>
  );
};

export default Modal;
