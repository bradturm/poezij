import React, { useEffect, useCallback, useRef } from 'react';
import { debounce } from "lodash";
import { config } from '../config';

import { accountService } from '../services/account-service';

import styles from "./pages/modals/PoemList.module.css";

function Scorm({

    lessonList,
    setLessonList,
    selectedLesson,
    setSelectedLesson,
    selectedLessonID,
    scormPlayerShown,
    setScormPlayerShown,
    closing,
    setClosing

}) {

    const iFrameRef = useRef(null);
    const user = accountService.userValue;
    const baseUrl = `${config.apiUrl}`;

    const debouncedCommit = React.useRef(
        debounce((cmi) => {
            console.log("debounced Commit: " + cmi);
            updateProgress(cmi);

        }, 300)
    ).current;
    /*
        const logCount = useCallback(() => {
            console.log(count);
          }, [count]);
    
        const sendMessage = (msg) => {
            if (!iFrameRef.current)
                return;
            iFrameRef.current.contentWindow.postMessage(msg, baseUrl)
        }
    */
    const sendMessage = useCallback((msg) => {
        if (!iFrameRef.current)
            return;
        iFrameRef.current.contentWindow.postMessage(msg, baseUrl)
    }, [baseUrl]);

    function updateProgress(cmiString) {

        let newLessonList = [...lessonList];
        let newLesson = newLessonList[selectedLessonID - 1];

        let cmi = JSON.parse(cmiString);

        newLesson.latest_lesson = 1;
        newLesson.core_lesson_location = cmi.core.lesson_location;
        newLesson.core_credit = cmi.core.credit;
        newLesson.core_lesson_status = cmi.core.lesson_status;
        newLesson.core_entry = cmi.core.entry;
        newLesson.core_score_raw = cmi.core.score?.raw;
        newLesson.core_score_max = cmi.core.score?.max;
        newLesson.core_score_min = cmi.core.score?.min;
        newLesson.core_total_time = cmi.core.total_time;
        newLesson.core_lesson_mode = cmi.core.lesson_mode;
        newLesson.core_exit = cmi.core.exit;
        newLesson.core_session_time = cmi.core.session_time;
        newLesson.suspend_data = cmi.suspend_data;
        newLesson.launch_data = cmi.launch_data;
        newLesson.comments = cmi.comments;
        newLesson.comments_from_lms = cmi.comments_from_lms;
        newLesson.objectives = JSON.stringify(cmi.objectives);
        newLesson.student_data_mastery_score = cmi.student_data?.mastery_score;
        newLesson.student_data_max_time_allowed = cmi.student_data?.max_time_allowed;
        newLesson.student_data_time_limit_action = cmi.student_data?.time_limit_action;
        newLesson.student_preference_audio = cmi.student_preference?.audio;
        newLesson.student_preference_language = cmi.student_preference?.language;
        newLesson.student_preference_speed = cmi.student_preference?.speed;
        newLesson.student_preference_text = cmi.student_preference?.text;
        newLesson.interactions = JSON.stringify(cmi.interactions);

        setSelectedLesson(newLesson);
        console.log("new Lesson is: " + JSON.stringify(newLesson));

        newLessonList[[selectedLessonID - 1]] = newLesson;

        // console.log(" ");
        //  console.log("New Lesson list before update state is: " + JSON.stringify(newLessonList));

        setLessonList(newLessonList);



        //  console.log(" ");
        //  console.log("New Lesson list is: " + JSON.stringify(lessonList));


        /*
                lessonService.updateProgress(selectedLessonID, user.id, lessonList[selectedLessonID - 1])
                    .then(() => {
                        alertService.success('Progress update successful', { keepAfterRouteChange: true });
                    })
                    .catch(error => {
                        alertService.error(error);
                    });
                    */
    }


    /*
        const debouncedCommit = React.useRef(
      //      debounce(async (criteria) => {
       //       setCharacters(await search(criteria));
       debounce(cmi) => {
    
       
            }, 300)
          ).current;
    */

    useEffect(() => {
        console.log("closing is " + closing);
        if (!closing) {
            return;
        }
        console.log("I need to do something here before ScormPlayer closes ")
        sendMessage("Closing");

    }, [closing, sendMessage]);

    useEffect(() => {
        if (!scormPlayerShown) {
            if (!iFrameRef.current)
                return;
        }
    }, [scormPlayerShown]);

    /*
        const sendMessage = useCallback((msg) => {
            if (!iFrameRef.current)
                return;
            iFrameRef.current.contentWindow.postMessage(msg, baseUrl)
        }, [baseUrl]);
    */
    const handleMessage = useCallback((e) => {

        if (e.origin !== baseUrl) return; // only accept messages from the server

        let cmi = "";
        let elem = "";
        let val = "";

        switch (e.data.split("|||")[0]) {
            case "ScormReady":
                console.log("Scorm frame says it is ready.");
                sendMessage("ScormInitialConfig|||" + JSON.stringify(selectedLesson));
                break;
            case "LMSInitialize":
                console.log("The Scorm 1.2 API has been initialised.");
                break;
            case "LMSFinish:":
                cmi = e.data.split("|||")[1];
                console.log("The LMS reported it had finished.");
                debouncedCommit(cmi);
                setClosing(false);         // cleanup
                setScormPlayerShown(false);  // hide the player 
                break;
            case "LMSGetValue:":
                elem = e.data.split("|||")[1];
                console.log("The LMS reported it had got value of element: " + elem);
                break;
            case "LMSSetValue:":
                elem = e.data.split("|||")[1];
                val = e.data.split("|||")[2];
                console.log("The LMS reported it had set element " + elem + " to " + val);
                break;
            case "LMSCommit:":
                cmi = e.data.split("|||")[1];
                debouncedCommit(cmi);
                //   console.log("Received a commit from the lesson Frame: " + cmi);
                break;
            case "LMSGetLastError":
                console.log("The Scorm 1.2 API reported it had got the last error.");
                break;
            case "LMSGetErrorString:":
                val = e.data.split("|||")[1];
                console.log("The LMS reported it had got the error string: " + val);
                break;
            case "LMSGetDiagnostic:":
                val = e.data.split("|||")[1];
                console.log("The LMS reported it had got diagnostic: " + val);
                break;
            case "SequenceNext":
                console.log("The Scorm 1.2 API reported the next sequence.");
                break;
            case "SequencePrevious":
                console.log("The Scorm 1.2 API reported the previous sequence.");
                break;
            case "SequenceChoice":
                console.log("The Scorm 1.2 API reported a sequence choice.");
                break;
            case "SequenceExit":
                console.log("The Scorm 1.2 API reported a sequence exit.");
                break;
            case "SequenceExitAll":
                console.log("The Scorm 1.2 API reported a sequence exit all.");
                break;
            case "SequenceAbandon":
                console.log("The Scorm 1.2 API reported a sequence abandon.");
                break;
            case "SequenceAbandonAll":
                console.log("The Scorm 1.2 API reported a sequence abandon all.");
                break;
            default:
                return
        }

    }, [baseUrl, debouncedCommit, sendMessage, setClosing, setScormPlayerShown, user]);

    useEffect(() => {

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage, false);
        };
    }, [handleMessage]);



    return (

        <div className={`${styles.scormWrapper}`}>
            <iframe
                title="SCORM Iframe"
                ref={iFrameRef}
                src={"http://localhost:4000/lessons/lessons/lesson" + selectedLessonID + "/entry.html"}
                style={{ width: '100%', height: '100%', border: '0' }}
                sandbox="allow-downloads allow-scripts allow-same-origin allow-forms allow-popups"
            />
        </div>
    )
}

export default Scorm;