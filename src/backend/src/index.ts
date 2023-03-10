import { createServer } from "./server";
import dotenv from "dotenv";
import UserService from "./services/user.service";
import { UserDao } from "./daos/userDao";
import { RouteServices } from "./routes";

dotenv.config();
const port = process.env.PORT;

const usedServices = {
  userService: new UserService(new UserDao()),
} satisfies RouteServices;

const server = createServer(usedServices);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
