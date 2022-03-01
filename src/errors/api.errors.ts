export default class ApiError {
  protected statusCode: number;
  protected msg: any;

  constructor(statusCode: number, msg: any) {
    this.statusCode = statusCode;
    this.msg = msg;
  }

  static badRequest(msg:any){
    return 1
  }
}
