import {ResponseBuilder, Response} from '../../services/response';

describe('ResponseBuilder.buildSuccessResponse', () => {
    test('it should return Response object with content', () => {
        const expected: Response<string> = {
            content: 'my-response',
            exception: undefined,
            message: 'Success!',
            success: true
        };

        const response = ResponseBuilder.buildSuccessResponse('my-response');

        expect(response).toEqual(expected)
    });
});

describe('ResponseBuilder.buildValidationResponse', () => {
    test('it should return Response object with validation errors', () => {
        const expected: Response<string[]> = {
            content: ['field-name is required'],
            message: 'Request failed validation. See content for more details.',
            success: false,
        };

        const response = ResponseBuilder.buildValidationResponse(['field-name is required'])

        expect(response).toEqual(expected);
    });
});

describe('ResponseBuilder.buildErrorResponse', () => {
    test('it should return Response object with error', () => {
        const expected: Response<Error> = {
            content: new Error('this is an error'),
            message: 'Error processing request. See content for more details.',
            success: false
        };

        const response = ResponseBuilder.buildExceptionResponse(new Error('this is an error'));

        expect(response).toEqual(expected);
    });
});