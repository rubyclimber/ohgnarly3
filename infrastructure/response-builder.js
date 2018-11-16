const successMessage = 'Success!';
const validationMessage = 'Request failed validation. See validationErrors for more details.';

module.exports.buildSuccessResponse = (content) => {
    return {
        content: content,
        success: true,
        validationErrors: [],
        message: successMessage
    }
};

module.exports.buildValidationResponse = (validationErrors) => {
    return {
        content: null,
        success: false,
        validationErrors: validationErrors,
        message: validationMessage
    }
};

module.exports.buildExceptionResponse = (exception) => {
    return {
        content: null,
        success: false,
        validationErrors: [],
        exception: exception
    }
};