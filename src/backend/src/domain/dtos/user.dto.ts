import BaseDto from "./base.dto";

interface UserDto extends BaseDto {
  id?: string;
  username: string;
  email: string;
}

export default UserDto;
