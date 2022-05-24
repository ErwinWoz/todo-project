import React from "react";
import style from './signoutbutton.module.scss';

export function Signoutbutton() {
    
  return (
    <button 
        className={style.button}
        onClick={() => {
            localStorage.removeItem('accessToken');
            window.location.href = "https://todoist.com"
        }}
    >Sign Out
    </button>
  )
}
