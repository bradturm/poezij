import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AppContext } from "./context/AppContext";

import Nav from "./components/navigation/Nav";
import { Alert } from "./components/common/Alert";
import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";
import Poems from "./components/poems/Poems";
import Learn from "./components/learn/Learn";
import LearnSlide from "./components/learn/LearnSlide";
import EditPoems from "./components/edit-poems/EditPoems";
import EditLessons from "./components/edit-lessons/EditLessons";
import Account from "./components/profile/Account";
import Settings from "./components/settings/Settings";
import Profile from "./components/profile/Profile";
import Admin from "./components/admin/Admin";
import Overview from "./components/admin/Overview";
import Users from "./components/admin/Users";
import Details from "./components/profile/Details";
import Update from "./components/profile/Update";
import ForgotPassword from "./components/landing/account/ForgotPassword";
import Login from "./components/landing/account/Login";
import Register from "./components/landing/account/Register";
import ResetPassword from "./components/landing/account/ResetPassword";
import VerifyEmail from "./components/landing/account/VerifyEmail";
import List from "./components/admin/List";
import AddEdit from "./components/admin/AddEdit";

import { poemService } from './services/poem-service';
import { lessonService } from './services/lesson-service';
import { accountService } from './services/account-service';
import { alertService } from './services/alert-service';

import RequireAuth from "./components/common/authentication/RequireAuth";

function App() {

  const context = useContext(AppContext);

  const [termsPopupShown, setTermsPopupShown] = useState(false);

  const [textSelectable, setTextSelectable] = useState(false);
  const [paged, setPaged] = useState(false);

  // temporary to get search and contents import working
  const [lesson, setLesson] = useState(1);

  const user = accountService.userValue;

  useEffect(() => {

    if (context.selectedLessonID && context.lessonList) {

      lessonService.getById(context.selectedLessonID)
        .then((lesson) => {

          //       console.log("lesson is " + JSON.stringify(lesson));

          context.setSelectedLesson(lesson);
          /*
                    let quiz = {};
                    let questionsArr = [];
          
                    if (context.lang === "nl") {
                      quiz.activityTitle = lesson.quizzes[0].title_nl;
                      quiz.activityIntro = lesson.quizzes[0].intro_nl;
                    } else {
                      quiz.activityTitle = lesson.quizzes[0].title_fy;
                      quiz.activityIntro = lesson.quizzes[0].intro_fy;
                    }
          
                    for (let i = 0; i < lesson.quizzes[0].questions.length; i++) {
          
                      let q = lesson.quizzes[0].questions[i];
                      let newQ = {};
          
                      let corrAnsArr = q.correct_answer.split(',');
                      newQ.correctAnswer = corrAnsArr.map(Number);
          
                      newQ.questionPic = q.question_image;
                      newQ.questionType = q.question_type;
                      newQ.selectionType = q.selection_type;
                      newQ.points = q.points;
                      newQ.material = q.material;
                      newQ.material_type = q.material_type;
          
                      if (context.lang === "nl") {
          
                        newQ.question = q.question_nl;
                        newQ.correctMessage = q.correct_message_nl;
                        newQ.incorrectMessage = q.incorrect_message_nl;
                        newQ.explanation = q.explanation_nl;
                        newQ.post_text = q.post_text_nl;
          
                        let answers = [];
                        answers.push(q.answer1_nl);
                        answers.push(q.answer2_nl);
                        if (q.answer3_fy !== "")
                          answers.push(q.answer3_nl);
                        if (q.answer4_fy)
                          answers.push(q.answer4_nl);
                        if (q.answer5_fy)
                          answers.push(q.answer5_nl);
          
                        newQ.answers = answers;
          
                        questionsArr.push(newQ);
                      } else {
          
                        newQ.question = q.question_fy;
                        newQ.correctMessage = q.correct_message_fy;
                        newQ.incorrectMessage = q.incorrect_message_fy;
                        newQ.explanation = q.explanation_fy;
                        newQ.post_text = q.post_text_fy;
          
                        let answers = [];
                        answers.push(q.answer1_fy);
                        answers.push(q.answer2_fy);
                        if (q.answer3_fy !== "")
                          answers.push(q.answer3_fy);
                        if (q.answer4_fy)
                          answers.push(q.answer4_fy);
                        if (q.answer5_fy)
                          answers.push(q.answer5_fy);
          
                        newQ.answers = answers;
          
                        questionsArr.push(newQ);
          
                      }
                    }
          
                    quiz.questions = questionsArr;
          
                    context.setCurrentActivity(quiz);
           */
        }

        )

    }

    /* lessonService.updateProgress(user.id, selectedLesson[0])
         .then((progress) => {
         }
      */

  }, [context.selectedLessonID, context.lessonList, context.lang]);

  return (

    <div className="App">
      <Router>
        <Nav
          lang={context.lang}
          setLang={context.setLang}
        />
        <Alert />
        <Routes>
          <Route path='/' element={<Landing
            termsPopupShown={termsPopupShown}
            setTermsPopupShown={setTermsPopupShown}
          />} >
            <Route path='account' element={<Account />} >
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register
                termsPopupShown={termsPopupShown}
                setTermsPopupShown={setTermsPopupShown}
              />} />
              <Route path='verify-email' element={<VerifyEmail />} />
              <Route path='forgot-password' element={<ForgotPassword />} />
              <Route path='reset-password' element={<ResetPassword />} />
            </Route>
          </Route>
          <Route element={<RequireAuth allowedRoles={['User', 'Admin']} />}>
            <Route path='home' element={<Home />} >
              <Route path='profile' element={<Profile />}>
                <Route path='details' element={<Details />} />
                <Route path=':update' element={<Update />} />
              </Route>
            </Route>
            <Route path='/poems' element={<Poems
              textSelectable={textSelectable}
              setTextSelectable={setTextSelectable}
              paged={paged}
              setPaged={setPaged}
            />} ></Route>
            <Route path='/learn' element={<Learn
              textSelectable={textSelectable}
            />} ></Route>
            <Route path='/slidelearn' element={<LearnSlide
              selectedPoemID={context.selectedPoemID}
              selectedPoem={context.selectedPoem}
              textSelectable={textSelectable}
              poet={context.poet}

              lesson={lesson}
              setLesson={setLesson}
            />} ></Route>

            <Route path='settings' element={<Settings
              textSelectable={textSelectable}
              setTextSelectable={setTextSelectable}
              paged={paged}
              setPaged={setPaged}
            />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={['Admin']} />}>
            <Route path='/editpoems' element={<EditPoems />} />
            <Route path='admin' element={<Admin />}>
              <Route path='' element={<Overview />} />
              <Route path='users' element={<Users />}>
                <Route path='' element={<List />} />
                <Route path='add' element={<AddEdit />} />
                <Route path='edit/:id' element={<AddEdit />} />
              </Route>
            </Route>

            <Route path='/editlessons' element={<EditLessons />} />
          </Route>

        </Routes>
      </Router>
    </div>

  );
}

export default App;
