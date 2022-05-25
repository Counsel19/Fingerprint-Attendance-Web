import { useContext, useEffect } from "react";
import "./inputForm.css";
import { DataContext } from "../../context/dataContext";

const InputForm = ({
  handleSubmit,
  setCourse,
 
}) => {
  const { currentUser } = useContext(DataContext);

  useEffect(() => {
    setCourse(currentUser.courses[0]);
  }, [currentUser.courses, setCourse]);

  return (
    <div className="input__form">
      <form onSubmit={handleSubmit} >
        <label htmlFor="course">Course: </label>
        <select
          name="course"
          required
          defaultValue={currentUser.courses[0]}
          onChange={(e) => setCourse(e.target.value)}
        >
          {currentUser.courses.map((courseItem, index) => (
            <option key={index} value={courseItem}>
              {courseItem}
            </option>
          ))}
        </select>
        
        <input type="submit" value="Continue..." />
      </form>
    </div>
  );
};

export default InputForm;
