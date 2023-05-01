import React, { useState, useEffect, useLayoutEffect, useRef, useCallback, useContext } from "react"
import { AppContext } from "../../context/AppContext";
import { Slide } from 'react-slideshow-image';
import Balancer from 'react-wrap-balancer';

import { config } from '../../config';

import 'react-slideshow-image/dist/styles.css';
import Poem from '../common/poem/Poem';
import Quiz from './questions/Quiz';
import VideoPlayer from '../video-player/VideoPlayer';
import YouTubePlayer from '../video-player/YouTubePlayer';

import styles from '../../css/LessonSlider.module.css'

const buttonStyle = {

    width: '1.4rem',
    height: '2.0rem',
    marginBottom: '0.5rem',
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
    borderRadius: '50%',
    border: 0,
    boxShadow: '0.3rem 0.3rem 0.6rem lightgray, -0.2rem -0.2rem 0.5rem white',
    /*boxShadow: '0.3rem 0.3rem 0.6rem lightgray, -0.2rem -0.2rem 0.5rem white', */
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
    height: '1.2rem',
    padding: '0'
};

const properties = {
    prevArrow: <button style={{ ...buttonStyle }}><img style={{ ...arrowStyle }} alt="" src="assets/images/previous-page.svg" /></button>,
    nextArrow: <button style={{ ...buttonStyle }}><img style={{ ...arrowStyle }} alt="" src="assets/images/next-page.svg" /></button>
}

const LessonSlider = ({

    selectedLesson,
    paged,
    setPaged,
    currentSlide,
    poet

}) => {

    const context = useContext(AppContext);

    const [content, setContent] = useState(null);
    const [navigatedSlide, setNavigatedSlide] = useState(0);

    const slideRef = useRef(null);

    const baseUrl = `${config.apiUrl}`;

    useLayoutEffect(() => {

        if (selectedLesson) {
            const { contents } = selectedLesson;
            setContent(contents);
        }
    }, [selectedLesson]);

    useEffect(() => {

        if (!slideRef.current)
            return
        if (context.currentSlide !== navigatedSlide) {
            slideRef.current.goTo(context.currentSlide);
        }

    }, [context.currentSlide]);

    const handleSlideChange = (from, to) => {
        // console.log("handleSlideChange - selected slide is now " + (to + 1));
        //  context.setCurrentSlide(to + 1);
        context.setCurrentSlide(to + 1);
        setNavigatedSlide(to + 1);
    };

    const onQuestionSubmit = (obj) => {
        //   console.log("onQuestionSubmit obj is " + JSON.stringify(obj));
        //  refFeedback.current.scrollIntoView({ behavior: 'smooth' });
    }


    ///////////////////////////////////////////////////////////////
    // Render lesson pages                                       // 
    //                                                           //
    ///////////////////////////////////////////////////////////////

    const renderlessonPages = useCallback(() => {
        //  const renderlessonPages = () => {
        if (selectedLesson) {
            //if (selectedLesson.length === )
            const { contents } = selectedLesson;

            //    console.log("selected lesson is " + JSON.stringify(selectedLesson));

            return contents.map((content, index) => {

                return (

                    <div key={index} style={{
                        background: '#e4ebf5',
                    }}>

                        {content.content_type === "poem" &&
                            <div className={styles.poem_container}>
                                <Poem
                                    poemID={content.poem.poem_id}
                                    poem={content.poem}
                                    paged={true}
                                    setPaged={setPaged}
                                    textSelectable={false}
                                    fullHeight={true}
                                />
                            </div>
                        }
                        {content.content_type === "text" &&
                            <div className={`${styles.lesson_text}`}>

                                <div className={`${styles.lesson_page_header}`}>
                                    {(context.lang === "fy" || context.lang === "en") &&
                                        <Balancer dangerouslySetInnerHTML={{ __html: content.title_fy }} />}
                                    {(context.lang === "nl") &&
                                        <Balancer dangerouslySetInnerHTML={{ __html: content.title_nl }} />}
                                </div>
                                <div className={`${styles.lesson_page_body}`}>
                                    {(context.lang === "fy" || context.lang === "en") &&
                                        <span dangerouslySetInnerHTML={{ __html: content.pre_text_fy }} />}
                                    {(context.lang === "nl") &&
                                        <span dangerouslySetInnerHTML={{ __html: content.pre_text_nl }} />}
                                </div>
                                <div className={`${styles.lesson_page_body}`}>
                                    {(context.lang === "fy" || context.lang === "en") &&
                                        <span dangerouslySetInnerHTML={{ __html: content.post_text_fy }} />}
                                    {(context.lang === "nl") &&
                                        <span dangerouslySetInnerHTML={{ __html: content.post_text_nl }} />}
                                </div>
                            </div>
                        }
                        {content.content_type === "audio" &&
                            <div className={`${styles.lesson_audio}`}>
                                <div>
                                    <h3>{content.title_fy}</h3>
                                    <p>{content.pre_text_fy}</p>
                                    <p>{content.post_text_fy}</p>
                                </div>
                            </div>
                        }
                        {(content.content_type === "video" && !content.video.filename.includes("https://")) &&
                            <div className={`${styles.lesson_video}`}>
                                <div>
                                    <h3>{content.title_fy}</h3>
                                    <p>{content.pre_text_fy}</p>
                                    <VideoPlayer width="500px"
                                        height="500px"
                                        //  ref={videoRef}
                                        controls="controls"
                                        filename={content.video.filename}
                                        src={`${baseUrl}/files/video?file=${content.video.filename}`}
                                        type="video/mp4"
                                        navigatedSlide={navigatedSlide}
                                        currentSlide={context.currentSlide}
                                        cues={content.video.cues}
                                    />
                                    <p>{content.post_text_fy}</p>
                                </div>
                            </div>
                        }
                        {(content.content_type === "video" && content.video.filename.includes("https://")) &&
                            <div className={`${styles.lesson_video}`}>
                                <div>
                                    <h3>{content.title_fy}</h3>
                                    <p>{content.pre_text_fy}</p>
                                    <YouTubePlayer width="500px"
                                        height="500px"
                                        //ref={videoRef}
                                        controls="controls"
                                        filename={content.video.filename}
                                        src={`${baseUrl}/files/video?file=${content.video.filename}`}
                                        type="video/mp4"
                                        navigatedSlide={navigatedSlide}
                                        currentSlide={context.currentSlide}
                                        cues={content.video.cues}
                                    />
                                    <p>{content.post_text_fy}</p>
                                </div>
                            </div>
                        }
                        {content.content_type === "image" &&
                            <div className={`${styles.lesson_image}`}>
                                <div>
                                    <h3>{content.title_fy}</h3>
                                    <p>{content.pre_text_fy}</p>
                                    <p>{content.post_text_fy}</p>
                                </div>
                            </div>
                        }
                        {content.content_type === "quiz" &&
                            <div className={`${styles.lesson_quiz}`}>
                                <div>
                                    <h3>{content.title_fy}</h3>
                                    <p>{content.pre_text_fy}</p>
                                    <p>{content.post_text_fy}</p>
                                </div>
                                <Quiz
                                    currentActivity={content.quiz}
                                    shuffle={false}
                                    showDefaultResult={false}
                                    onComplete={false}
                                    customResultPage={false}
                                    showInstantFeedback={true}
                                    continueTillCorrect={true}
                                    revealAnswerOnSubmit={true}
                                    allowNavigation={true}
                                    onQuestionSubmit={onQuestionSubmit}
                                    disableSynopsis={true}
                                />
                            </div>
                        }
                        {content.content_type === "document" &&
                            <div className={`${styles.lesson_document}`}>
                                <div>
                                    <h3>{content.title_fy}</h3>
                                    <p>{content.pre_text_fy}</p>
                                    <p>{content.post_text_fy}</p>
                                </div>
                            </div>
                        }

                    </div>

                );
            });
        }
    }, [selectedLesson]);

    return (
        <>
            {content &&
                <div>

                    <Slide ref={slideRef} onChange={handleSlideChange} slidesToScroll={2} slidesToShow={2} indicators={true} autoplay={false} infinite={false} rerender={false} {...properties} >
                        {renderlessonPages()}
                    </Slide>
                </div>
            }
        </>
    );
};

export default LessonSlider;