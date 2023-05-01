import React, { useState } from "react";
import { nanoid } from "nanoid";
import LineEditor from "./LineEditor";
import LineTypeEditor from "./LineTypeEditor";
import styles from "../../css/EditPoem.module.css";

//import data from "../../data/mock-data.json";

function EditPoem(props) {

  // const [lines, setLines] = useState(data);

  const [html, setHtml] = useState("");
  const [lineType, setLineType] = useState("");
  const [editedCell, setEditedCell] = useState(null);
  const [addFormData, setAddFormData] = useState({
    line_num: null,
    note_word_num: null,
    note_fry: "",
    note_nl: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [lineTypeIsOpen, setLineTypeIsOpen] = useState(false);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleFryCellClick = (i) => {
    const newEditedCell = {
      index: i, type: "fry", note: false
    }
    setEditedCell(newEditedCell);
    const newLines = [...props.selectedPoem.lines];
    setHtml(newLines[i].line_fry);
    if (!isOpen) setIsOpen(true);
  };

  const handleNlCellClick = (i) => {
    const newEditedCell = {
      index: i, type: "nl", note: false
    }
    setEditedCell(newEditedCell);
    const newLines = [...props.selectedPoem.lines];
    setHtml(newLines[i].line_nl);
    if (!isOpen) setIsOpen(true);
  };

  const handleTypeCellClick = (i) => {
    const newEditedCell = {
      index: i, type: "type", note: false
    }
    setEditedCell(newEditedCell);

    const newLines = [...props.selectedPoem.lines];
    setLineType(newLines[i].line_type);

    if (!lineTypeIsOpen) setLineTypeIsOpen(true);
  };

  const handleFryNoteCellClick = (i) => {

    const newEditedCell = {
      index: i, type: "fry", note: true
    }
    setEditedCell(newEditedCell);

    const newLines = [...props.selectedPoem.lines];
    setHtml(newLines[i].note_fry);

    if (!isOpen) setIsOpen(true);
  };

  const handleNlNoteCellClick = (i) => {
    const newEditedCell = {
      index: i, type: "nl", note: true
    }
    setEditedCell(newEditedCell);
    const newLines = [...props.selectedPoem.lines];
    setHtml(newLines[i].note_nl);
    if (!isOpen) setIsOpen(true);
  };

  const handleWordNoteCellClick = (i) => {
    const newEditedCell = {
      index: i, type: "word", note: true
    }
    setEditedCell(newEditedCell);
    const newLines = [...props.selectedPoem.lines];
    setHtml(newLines[i].note_word_num.toString());
    if (!isOpen) setIsOpen(true);
  }

  const handleHtmlChange = (html) => {

    setHtml(html);

    if (editedCell !== null) {
      const newLines = [...props.selectedPoem.lines];
      if (editedCell.type === "fry") {
        if (!editedCell.note) {
          newLines[editedCell.index].line_fry = html;
        }
        else {
          newLines[editedCell.index].note_fry = html;
        }
      }
      if (editedCell.type === "nl") {
        if (!editedCell.note) {
          newLines[editedCell.index].line_nl = html;
        }
        else {
          newLines[editedCell.index].note_nl = html;
        }
      }

      if (editedCell.type === "word") {
        if (editedCell.note) {
          if ((!isNaN(html) && !isNaN(parseFloat(html))) || (!html)) {
            newLines[editedCell.index].note_word_num = html
          }
        }
      }
    }
  }

  const handleLineTypeChange = (type) => {

    if (editedCell !== null) {
      setLineType(type);
      const newLines = [...props.selectedPoem.lines];
      newLines[editedCell.index].line_type = type;
    }
  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newNote = {
      id: nanoid(),
      line_num: addFormData.line_num,
      note_word_num: addFormData.note_word_num,
      note_fry: addFormData.note_fry,
      note_nl: addFormData.note_nl
    }

    // create copy of lines data and add note to appropriate line

    const newLines = [...props.selectedPoem.lines];

    let lineIndex = newNote.line_num - 1; // zero-index array

    newLines[lineIndex].note_fry = newNote.note_fry;
    newLines[lineIndex].note_nl = newNote.note_nl;
    newLines[lineIndex].note_word_num = newNote.note_word_num;

  }


  return (

    <div className={`${styles.page_container}`}>
      <table className={`${styles.lines_table}`}>
        <thead>
          <tr>
            <th className={`${styles.edit_table_header}`}>Line</th>
            <th className={`${styles.edit_table_header}`}>Fry</th>
            <th className={`${styles.edit_table_header}`}>Nl</th>
            <th className={`${styles.edit_table_header}`}>Type</th>
          </tr>
        </thead>
        <tbody>
          {props.selectedPoem &&
            props.selectedPoem.lines.map((line, i) => (
              <tr key={i}>
                <td className={`${styles.edit_table_row}`}>{line.line_num}</td>
                <td className={`${styles.edit_table_row}`} onClick={() => handleFryCellClick(i)}><div dangerouslySetInnerHTML={{ __html: line.line_fry }} /></td>
                <td className={`${styles.edit_table_row}`} onClick={() => handleNlCellClick(i)}><div dangerouslySetInnerHTML={{ __html: line.line_nl }} /></td>
                <td className={`${styles.edit_table_row}`} onClick={() => handleTypeCellClick(i)}>{line.line_type}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <table className={`${styles.notes_table}`}>
        <thead>
          <tr>
            <th className={`${styles.edit_table_header}`}>Line</th>
            <th className={`${styles.edit_table_header}`}>Word</th>
            <th className={`${styles.edit_table_header}`}>Fry</th>
            <th className={`${styles.edit_table_header}`}>Nl</th>
          </tr>
        </thead>
        <tbody>
          {props.selectedPoem &&
            props.selectedPoem.lines.map((line, i) => (
              <tr key={i}>
                <td className={`${styles.edit_table_row}`}>{line.line_num}</td>
                <td className={`${styles.edit_table_row}`} onClick={() => handleWordNoteCellClick(i)}>{line.note_word_num}</td>
                <td className={`${styles.edit_table_row}`} onClick={() => handleFryNoteCellClick(i)}><div dangerouslySetInnerHTML={{ __html: line.note_fry }} /></td>
                <td className={`${styles.edit_table_row}`} onClick={() => handleNlNoteCellClick(i)}><div dangerouslySetInnerHTML={{ __html: line.note_nl }} /></td>
              </tr>
            ))}
        </tbody>
      </table>

      {/*  <button onClick={() => setIsOpen(true)}> 
        Open Editor
      </button> */}

      {isOpen && <LineEditor setIsOpen={setIsOpen} html={html} handleHtmlChange={handleHtmlChange} />}

      {lineTypeIsOpen && <LineTypeEditor
        setLineTypeIsOpen={setLineTypeIsOpen}
        lineTypes={props.lineTypes}
        lineType={lineType}
        handleLineTypeChange={handleLineTypeChange}
      />}

      <h2>Add a note</h2>
      <form className={`${styles.add_note_form}`} onSubmit={handleAddFormSubmit}>
        <input type="number"
          className={`${styles.add_note_line_num}`}
          name="line_num"
          required="required"
          placeholder="Enter line number..."
          onChange={handleAddFormChange}
        />
        <input type="number"
          className={`${styles.add_note_word_num}`}
          name="note_word_num"
          required="required"
          placeholder="Enter word position..."
          onChange={handleAddFormChange}
        />
        <input type="text"
          className={`${styles.add_note_text_fry}`}
          name="note_fry"
          required="required"
          placeholder="Enter Friesian text..."
          onChange={handleAddFormChange}
        />
        <input type="text"
          className={`${styles.add_note_text_nl}`}
          name="note_nl"
          required="required"
          placeholder="Enter Dutch text..."
          onChange={handleAddFormChange}
        />
        <button className={`${styles.add_note_button}`} type="submit">Add</button>
      </form>
    </div>
  );
}

export default EditPoem;
