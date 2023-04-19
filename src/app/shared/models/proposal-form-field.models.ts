
export interface FormFieldOptions {
    label: string
    value: string
}
export interface FormFieldValidation {
    validator: string,
    value: boolean | null | string | number
}
export interface FormField {
    name: string
    label: string
    type: string
    placeholder: string
    default_value: string | null
    validations: FormFieldValidation[]
    options?: FormFieldOptions[]
}
export interface FormFieldAPIResponse {
    message: string
    field_list: FormField[]
}
