const successMessage = 'Success!';
const validationMessage = 'Request failed validation. See validationErrors for more details.';

export const buildSuccessResponse = (content) => {
    return {
        content: content,
        success: true,
        validationErrors: [],
        message: successMessage
    }
};

export const buildValidationResponse = (validationErrors) => {
    return {
        content: null,
        success: false,
        validationErrors: validationErrors,
        message: validationMessage
    }
};

export const buildExceptionResponse = (exception) => {
    return {
        content: null,
        success: false,
        validationErrors: [],
        exception: exception
    }
};