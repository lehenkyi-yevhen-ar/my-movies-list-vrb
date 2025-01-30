import {Form, Field, Formik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchBar = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();


    const handleSubmit = (values) => {
        const newQuery = values.query.trim();
        if (!newQuery) {
            setSearchParams({})
        } else {
            navigate(`/main/movies?query=${newQuery}`);
        }
        values.query = '';    }
    return (
      <div className="border-2 rounded-md px-6 py-2 w-full max-h-max">
            <Formik initialValues={{query: searchParams.get('query')||''}} onSubmit={handleSubmit}>
          <Form className="flex flex-row items-center justify-between">
            <div className="flex gap-2">
              <Field
                className="w-50 p-1.5 rounded-md border-1 active:bg-black-100 focus:bg-black-100"
                name="query"
              />
              <button className="cursor-pointer" type="submit">
                Search
              </button>
            </div>
          </Form>
          </Formik>
    </div>
  )
}

export default SearchBar