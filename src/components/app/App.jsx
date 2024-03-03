import { Formik, Form } from "formik";
import axios from "axios";
import "./App.scss";
import { _apiUrl } from "../../config";

function App() {

  return (
    <main className="app">
      <Formik
        initialValues={{
          file: ''
        }}
        onSubmit={(values) => {
          let formData = new FormData();
          for (let i = 0; i < values.file.length; i++) {
            formData.append(`file${i}`, values.file[i]);
          }

          console.log("To send:", formData);

          axios.post(_apiUrl, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }).then(res => {
            console.log(res);
          }).catch(error => {
            console.log(error)
          });
        }}
      >
        {({ setFieldValue }) => (
          <Form className="form">
            <input
              name="file"
              type="file"
              multiple
              onChange={(event) => {
                setFieldValue("file", event.currentTarget.files);
              }} />
            <button className="btn-submit" type="submit">Send</button>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default App;
