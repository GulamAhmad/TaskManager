import { useParams } from "react-router-dom";
import Addtask from "../../components/Addtask/Addtask";

const EditForm = () => {
  const { tid } = useParams();
  return (
    <div>
      <Addtask editform={true} taskid={tid} />
    </div>
  );
};

export default EditForm;
