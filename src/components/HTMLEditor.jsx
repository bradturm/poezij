import React, { useState, useEffect } from "react";
// make sure folder with custom editor is in a folder called folder alongside src
// and node_modules and run 'npm add file:./ckeditor5'.
// https://ckeditor.com/docs/ckeditor5/latest/installation/frameworks/react.html
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from "@ckeditor/ckeditor5-react";

import { config } from '../config';

import styles from "../css/PoemList.module.css"

const url = `${config.apiUrl}/upload/image`;

export default function HTMLEditor({

    handleChange,
    initialContent,
    title

}) {

    const [editor, setEditor] = useState(null);

    const saveData = (data) => { }

    useEffect(() => {
        if (editor) {
            editor.setData(initialContent ? initialContent : "");
        }
    }, [initialContent])

    return (
        <div className={styles.html_editor_container} >
            {title && <h4 className={styles['editor-title']}>{title}</h4>}
            <CKEditor
                config={
                    {
                        simpleUpload: {
                            uploadUrl: url,
                            headers: {
                            }
                        },
                        removePlugins: ["MediaEmbedToolbar"],
                        style: {
                            definitions: [
                                {
                                    name: 'Article category',
                                    element: 'h3',
                                    classes: ['category']
                                },
                                {
                                    name: 'Info box',
                                    element: 'p',
                                    classes: ['info-box']
                                }, {
                                    name: 'Marker',
                                    element: 'span',
                                    classes: ['marker']
                                },
                                {
                                    name: 'Spoiler',
                                    element: 'span',
                                    classes: ['spoiler']
                                },
                            ]
                        },
                        autosave: {
                            waitingTime: 5000, // in ms
                            save(editor) {
                                saveData(editor.getData());
                            }
                        },
                        /*    toolbar: {
                                items: [
                                    'undo', 'redo',
                                    '|', 'heading', 'style',
                                    '|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
                                    '|', 'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
                                    '|', 'link', 'uploadImage', 'blockQuote', 'codeBlock',
                                    '|', 'alignment',
                                    '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent'
                                ],
                                shouldNotGroupWhenFull: true
                            }
    */
                    }
                }
                editor={Editor}
                onReady={(editor) => {
                    setEditor(editor);
                    initialContent && editor.setData(initialContent);
                }
                }
                onBlur={(event, editor) => { }}
                onFocus={(event, editor) => { }}
                onChange={(event, editor) => { handleChange(editor.getData()); }}
            />
        </div>
    );
}
