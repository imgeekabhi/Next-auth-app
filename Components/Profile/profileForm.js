import { useRef } from "react";
import classes from "./profileForm.module.css";
function ProfileForm(props) {
  const inputNewPasswordRef = useRef();
  const inputOldPasswordRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredNewPassword = inputNewPasswordRef.current.value;
    const enteredOldPassword = inputOldPasswordRef.current.value;

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={inputNewPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={inputOldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
