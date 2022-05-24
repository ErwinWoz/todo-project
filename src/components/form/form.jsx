import { useState } from 'react';
import style from "./form.module.scss";
import { Spinner } from '../spinner';

export function Form({ inputText, setInputText, useListItemContext }) {
  const { addItem } = useListItemContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (event) => {
    // console.log(event.target.value);
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await addItem({ text: inputText, id: Math.random().toString(16).slice(-4) });
    setInputText("");
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ): (
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
      )
      }
    </>
  );
}


