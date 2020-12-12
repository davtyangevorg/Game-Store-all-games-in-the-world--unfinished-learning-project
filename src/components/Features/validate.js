export const required=value=>value ? undefined : 'Required'
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
export const password=value=>value.length<9 ? 'Must be 9+ characters or less' : undefined