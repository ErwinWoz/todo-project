import { useListItemContext } from "../../contexts/list-item-context";
import style from "./form.module.scss";

export function Form({ inputText, setInputText }) {
  const { addItem } = useListItemContext();

  const handleTextChange = (event) => {
    // console.log(event.target.value);
    setInputText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addItem({ text: inputText, id: Math.random().toString(16).slice(-4) });
    setInputText("");
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <fieldset>
        <label>
          <input
            placeholder="to-do-item"
            type="text"
            value={inputText}
            onChange={handleTextChange}
          />
        </label>
        <button type="Submit">+ Add</button>
      </fieldset>
    </form>
  );
}
