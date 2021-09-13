import todoApi from "../task";
import packageJson from "../../package.json";

app.use(API_V1, todoApi);

const userRouter = express.Router();

userRouter.route("/todo").get(ctrl.getAll).post(ctrl.create);

userRouter.route("/todo/:id").delete(ctrl.remove).put(ctrl.update);

export default userRouter;
