export class Response<T> {
    content: T;
    success: boolean;
    message?: string;
    exception?: Error | string;
}

export class ResponseBuilder {
    static successMessage: string = 'Success!';
    static validationMessage: string = 'Request failed validation. See content for more details.';
    static errorMessage: string = 'Error processing request. See content for more details.';

    static buildSuccessResponse: <T>(content: T) => Response<T> = (content) => {
        return {
            content: content,
            success: true,
            message: ResponseBuilder.successMessage
        }
    }

    static buildValidationResponse: (validationErrors: string[]) => Response<string[]> = (validationErrors) => {
        return {
            content: validationErrors,
            success: false,
            message: ResponseBuilder.validationMessage
        }
    }

    static buildExceptionResponse: (exception: Error | string) => Response<Error | string> = (exception) => {
        return {
            content: exception,
            success: false,
            message: ResponseBuilder.errorMessage
        }
    }
}