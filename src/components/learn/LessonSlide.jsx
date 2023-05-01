import React, { useState, useEffect, useCallback, useContext } from "react"
import { AppContext } from "../../context/AppContext";
import LessonSearch from './LessonSearch';
//import Navigation from './Navigation';
import LessonContents from './LessonContents';
import LessonSlider from './LessonSlider';
import LessonButtons from './LessonButtons';
/*
const buttonStyle = {

    width: '2.0rem',
    height: '2.0rem',
    marginBottom: '0.5rem',
    borderRadius: '50%',
    border: 0,
    boxShadow: '0.3rem 0.3rem 0.6rem lightgray, -0.2rem -0.2rem 0.5rem white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: 'darkgray',
    transition: 'all 0.5s ease',
};

const arrowStyle = {

    width: '1.2rem',
    height: '1.2rem'
};

const properties = {

    //  prevArrow: <button style={{ ...buttonStyle }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff"><path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" /></svg></button>,
    prevArrow: <button style={{ ...buttonStyle }}><img style={{ ...arrowStyle }} alt="" src="assets/images/previous-page.svg" /></button>,
    nextArrow: <button style={{ ...buttonStyle }}><img style={{ ...arrowStyle }} alt="" src="assets/images/next-page.svg" /></button>
}
*/
const LessonSlide = ({

    poet,
    lesson,
    selectedLesson,
    setLessonShown

}) => {

    const context = useContext(AppContext);

    const [searchShown, setSearchShown] = useState(false);
    const [contentsShown, setContentsShown] = useState(false);
    const [notesShown, setNotesShown] = useState(false);
    //  const [lessonShown, setLessonShown] = useState(false);

    const [paged, setPaged] = useState(false);
    const [quizResult, setQuizResult] = useState();

    //set lesson# to local storage
    useEffect(() => {
        context.handleIndex();
        //  console.log("after handleIndex in lessonSlide useEffect")
        //   localStorage.setItem("lesson", JSON.stringify(lesson));
    }, [lesson]);

    const slideSelect = (i) => {
        console.log("slideSelect - selected slide is " + (i));
        // context.setCurrentSlide()
    };

    return (
        <>
            <LessonButtons
                searchShown={searchShown}
                setSearchShown={setSearchShown}
                contentsShown={contentsShown}
                setContentsShown={setContentsShown}
                notesShown={notesShown}
                setNotesShown={setNotesShown}
                setLessonShown={setLessonShown}
            />
            <div>
                <LessonSlider
                    selectedLesson={selectedLesson}
                    paged={paged}
                    setPaged={setPaged}
                    poet={poet}
                />
            </div>
            <LessonContents
                contentsShown={contentsShown}
                setContentsShown={setContentsShown}
                slideSelect={slideSelect}
            />
            <LessonSearch
                searchShown={searchShown}
                show={() => { setSearchShown(true) }}
                hide={() => { setSearchShown(false) }}
            />
        </>
    );
};

export default LessonSlide;