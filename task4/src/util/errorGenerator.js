export const errorGenerator = (message,statusCode) => {
    const err = new Error(message)
    err.statusCode = statusCode
    return err
}