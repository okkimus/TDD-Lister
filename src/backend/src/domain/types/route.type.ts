import BaseDto from "../dtos/base.dto";

enum Method {
  GET,
  POST,
  PUT,
  DELETE,
}

type Route = {
  path: string;
  method: Method;
  request: BaseDto;
  response: BaseDto;
};

export default Route;

export { Method }