import type {ErrorBag, ValidationError} from "~/types/ErrorBag";

export default function useCustomError(){
    const errorBag: ErrorBag = useState('error-bag', () => ({}))

    function transformValidationErrors(response: ValidationError){
        if(response.data.errors){
            for(let key in response.data.errors){
                errorBag.value[key] = response.data.errors[key][0]
            }
        }
    }

    function resetErrorBag(){
        errorBag.value = {}
    }

    return {
        errorBag,
        transformValidationErrors,
        resetErrorBag
    }
}