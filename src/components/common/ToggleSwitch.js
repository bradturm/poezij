import React from "react";
import PropTypes from "prop-types";
import styles from '../../css/ToggleSwitch.module.css';

/*
Toggle Switch Component
Note: id, checked and onChange are required for ToggleSwitch component to function.
The props name, small, disabled and optionLabels are optional.
Usage: <ToggleSwitch id={id} checked={value} onChange={checked => setValue(checked)}} />
*/

const ToggleSwitch = ({ id, name, checked, onChange, optionLabels, small, disabled }) => {
  function handleKeyPress(e) {
    if (e.keyCode !== 32) return;

    e.preventDefault();
    onChange(!checked)
  }

  return (
    <div className={`${styles.toggleSwitch} ${small ? styles.smallSwitch : ''}`}>
      <input
        type="checkbox"
        name={name}
        className={`${styles.toggleSwitchCheckbox}`}
        id={id}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        disabled={disabled}
      />
      {id ? (

        <label className={`${styles.toggleSwitchLabel}`}
          htmlFor={id}
          tabIndex={disabled ? -1 : 1}
          onKeyDown={(e) => { handleKeyPress(e) }}>
          <span

            className={`${disabled ? `${styles.toggleSwitchInner} ${styles.toggleSwitchDisabled}` : styles.toggleSwitchInner}`}
            data-yes={optionLabels[0]}
            data-no={optionLabels[1]}
            tabIndex={-1}
          />
          <span
            className={`${disabled ? `${styles.toggleSwitchSwitch} ${styles.toggleSwitchDisabled}` : styles.toggleSwitchSwitch}`}
            tabIndex={-1}
          />
        </label>
      ) : null}
    </div>
  );
}

// Set optionLabels for rendering.
ToggleSwitch.defaultProps = {
  optionLabels: ["Yes", "No"],
};

ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  optionLabels: PropTypes.array,
  small: PropTypes.bool,
  disabled: PropTypes.bool
};

export default ToggleSwitch;
