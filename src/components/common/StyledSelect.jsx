import React from "react";
import Select from "react-select";

function StyledSelect({

    isMulti,
    className,
    options,
    onChange,
    placeholder,
    value,
    noOptionsMessage

}) {
    return (
        <>
            {!isMulti &&
                < Select className={className} classNamePrefix={"select"}
                    isMulti={false}
                    options={options}
                    onChange={onChange}
                    placeholder={placeholder}
                    value={value}
                    unstyled={true}
                    noOptionsMessage={noOptionsMessage}
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? 'grey' : 'red',
                            outline: 'none',
                            boxShadow: state.isFocused ? 'inset 0.2rem 0.2rem 0.5rem var(--greyLight-2), inset -0.2rem -0.2rem 0.5rem var(--white)' : '0.3rem 0.3rem 0.6rem var(--greyLight-2), -0.2rem -0.2rem 0.5rem var(--white)',
                            border: 0,
                            backgroundColor: 'transparent',
                            borderRadius: '8px',
                            color: 'var(--greyDark)'
                        }),
                        dropdownIndicator: (baseStyles, state) => ({
                            ...baseStyles,
                            color: '#5b0eeb'
                        }),
                        placeholder: (baseStyles, state) => ({
                            ...baseStyles,
                            color: 'var(--greyLight-3)'
                        }),
                        singleValue: (baseStyles, state) => ({
                            ...baseStyles,
                            color: '#5b0eeb'
                        }),
                        menu: (baseStyles, state) => ({
                            ...baseStyles,
                            background: 'var(--greyLight-1)',
                            borderRadius: '8px',
                            boxShadow: '0.3rem 0.3rem 0.6rem var(--greyLight-2), -0.2rem -0.2rem 0.5rem var(--white)'
                        }),
                        option: (baseStyles, state) => ({
                            ...baseStyles,
                            color: state.isFocused ? 'var(--greyLight-1)' : 'var(--greyLight-3)',
                            backgroundColor: state.isFocused ? 'var(--primary)' : 'var(--greyLight-1)'
                        }),
                        multiValueRemove: (baseStyles, state) => ({
                            ...baseStyles,
                            color: state.isFocused ? 'var(--greyLight-1)' : 'var(--primary-dark)',
                            backgroundColor: state.isFocused ? 'var(--primary-dark)' : 'var(--greyLight-1)',
                            borderRadius: '12px',
                            marginLeft: '5px',
                            marginTop: '3px',
                            boxShadow: '0.3rem 0.3rem 0.6rem var(--greyLight-2), -0.2rem -0.2rem 0.5rem var(--white)'
                        }),
                        multiValue: (baseStyles, state) => ({
                            ...baseStyles,
                            color: state.isFocused ? 'var(--greyLight-1)' : 'var(--primary-dark)',
                            backgroundColor: state.isFocused ? 'green' : 'var(--greyLight-1)',
                            marginTop: '10px',
                            borderRadius: '3px'
                        }),
                        multiValueLabel: (baseStyles, state) => ({
                            ...baseStyles,
                            color: state.isFocused ? 'var(--greyLight-1)' : 'var(--primary-dark)',
                            backgroundColor: state.isFocused ? 'white' : 'var(--greyLight-1)',
                            boxShadow: state.isFocused ? 'inset 0.2rem 0.2rem 0.5rem var(--greyLight-2), inset -0.2rem -0.2rem 0.5rem var(--white)' : '0.3rem 0.3rem 0.6rem var(--greyLight-2), -0.2rem -0.2rem 0.5rem var(--white)',
                            borderRadius: '3px'
                        }),
                    }}
                />
            }
            {isMulti &&
                < Select className={className} classNamePrefix={"select"}
                    isMulti
                    options={options}
                    onChange={onChange}
                    placeholder={placeholder}
                    value={value}
                    unstyled={true}
                    noOptionsMessage={noOptionsMessage}
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? 'grey' : 'red',
                            outline: 'none',
                            boxShadow: state.isFocused ? 'inset 0.2rem 0.2rem 0.5rem var(--greyLight-2), inset -0.2rem -0.2rem 0.5rem var(--white)' : '0.3rem 0.3rem 0.6rem var(--greyLight-2), -0.2rem -0.2rem 0.5rem var(--white)',
                            border: 0,
                            backgroundColor: 'transparent',
                            borderRadius: '8px',
                            color: 'var(--greyDark)'
                        }),
                        dropdownIndicator: (baseStyles, state) => ({
                            ...baseStyles,
                            color: '#5b0eeb'
                        }),
                        placeholder: (baseStyles, state) => ({
                            ...baseStyles,
                            color: 'var(--greyLight-3)'
                        }),
                        singleValue: (baseStyles, state) => ({
                            ...baseStyles,
                            color: '#5b0eeb'
                        }),
                        menu: (baseStyles, state) => ({
                            ...baseStyles,
                            background: 'var(--greyLight-1)',
                            borderRadius: '8px',
                            boxShadow: '0.3rem 0.3rem 0.6rem var(--greyLight-2), -0.2rem -0.2rem 0.5rem var(--white)'
                        }),
                        option: (baseStyles, state) => ({
                            ...baseStyles,
                            color: state.isFocused ? 'var(--greyLight-1)' : 'var(--greyLight-3)',
                            backgroundColor: state.isFocused ? 'var(--primary)' : 'var(--greyLight-1)'
                        }),
                        multiValueRemove: (baseStyles, state) => ({
                            ...baseStyles,
                            color: state.isFocused ? 'var(--greyLight-1)' : 'var(--primary-dark)',
                            backgroundColor: state.isFocused ? 'var(--primary-dark)' : 'var(--greyLight-1)',
                            borderRadius: '12px',
                            marginLeft: '5px',
                            marginTop: '3px',
                            boxShadow: '0.3rem 0.3rem 0.6rem var(--greyLight-2), -0.2rem -0.2rem 0.5rem var(--white)'
                        }),
                        multiValue: (baseStyles, state) => ({
                            ...baseStyles,
                            color: state.isFocused ? 'var(--greyLight-1)' : 'var(--primary-dark)',
                            backgroundColor: state.isFocused ? 'green' : 'var(--greyLight-1)',
                            marginTop: '10px',
                            borderRadius: '3px'
                        }),
                        multiValueLabel: (baseStyles, state) => ({
                            ...baseStyles,
                            color: state.isFocused ? 'var(--greyLight-1)' : 'var(--primary-dark)',
                            backgroundColor: state.isFocused ? 'white' : 'var(--greyLight-1)',
                            boxShadow: state.isFocused ? 'inset 0.2rem 0.2rem 0.5rem var(--greyLight-2), inset -0.2rem -0.2rem 0.5rem var(--white)' : '0.3rem 0.3rem 0.6rem var(--greyLight-2), -0.2rem -0.2rem 0.5rem var(--white)',
                            borderRadius: '3px'
                        }),
                    }}
                />
            }
        </>
    )
}


export default StyledSelect;