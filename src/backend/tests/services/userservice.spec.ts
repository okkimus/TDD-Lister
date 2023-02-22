import UserService from "../../src/services/user.service";
import UserDto from "../../src/domain/dtos/user.dto";
import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { UserDao } from "../../src/daos/userDao";

describe("user service", () => {
  let sut: UserService;
  let testUser: UserDto;
  let userDaoMock: UserDao;

  describe("create", () => {
    beforeEach(() => {
      testUser = {
        username: "Tester",
        email: "test@example.com",
      };
      userDaoMock = new UserDao();
      userDaoMock.save = jest.fn(
        (user: UserDto) =>
          new Promise<UserDto>((resolve) => {
            resolve({
              id: "1",
              username: "Tester",
              email: "test@example.com",
            } satisfies UserDto);
          })
      );
      sut = new UserService(userDaoMock);
    });

    test("should throw if user is missing username", async () => {
      testUser.username = "";
      try {
        await sut.create(testUser);
        expect(true).toBeFalsy();
      } catch (e) {
        expect(e.message).toBe("User is missing username.");
      }
    });

    test("should throw if user is missing email", async () => {
      testUser.email = "";
      try {
        await sut.create(testUser);
        expect(true).toBeFalsy();
      } catch (e) {
        expect(e.message).toBe("User is missing email address.");
      }
    });

    test("should return the user with id", async () => {
      const result = await sut.create(testUser);
      expect(result.username).toBe("Tester");
      expect(result.email).toBe("test@example.com");
      expect(result.id).toBeDefined();
      expect(result.id).not.toStrictEqual("");
    });

    test("should call the userDao for persistence", async () => {
      const result = await sut.create(testUser);
      expect(userDaoMock.save).toBeCalled();
    });
  });
});
