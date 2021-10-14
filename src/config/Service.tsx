import axios from "axios";

const config = axios.create({
    baseURL: 'https://www.jsonbulut.com/json/'
})

const ref= '51152bdc1f6fcae3e24bf21c819b02f6'

export const formInfo = () => {
    const params = {
        ref:ref,
        formId: 35
    }

    return config.get('forms.php',{params:params})
}