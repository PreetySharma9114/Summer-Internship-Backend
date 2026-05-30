import { Response } from 'express';

export class ResponseUtil {

  static success(
    res: Response,
    data: unknown,
    message = 'Success',
    statusCode = 200,
  ): Response {

    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(
    res: Response,
    message = 'Error',
    statusCode = 500,
  ): Response {

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
}