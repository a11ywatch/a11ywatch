interface ResponseParamsModel {
  msgType?: number;
  statusCode?: number;
  success?: boolean;
  [extra: string]: any;
}

interface ResponseModel {
  message: number;
  code: number;
  success: boolean;
  [extra: string]: any;
}

enum ApiResponse {
  Success,
  NotFound,
}

export { ApiResponse, ResponseParamsModel, ResponseModel };
