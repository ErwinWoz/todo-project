import style from './spinner.module.scss';

export function Spinner() {
    return (
      <div>
        <p className={style.content}>Loading...</p>
        <div className={style.loadingSpinner}></div>
      </div>
    );
  };